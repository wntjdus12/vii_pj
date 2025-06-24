from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi_utils.tasks import repeat_every
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import statistics
import random
from fastapi import APIRouter
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
import re
from bson import json_util
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
import json

KST = ZoneInfo("Asia/Seoul")

# LangChain 관련 추가
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://admin:admin123@43.201.168.127:27017/?authSource=admin")
db = client["sensor_db"]
real_collection = db["Temperature_Humidity_Data"]
predict_collection = db["Predicted_Temperature_Humidity"]

hourly_data = []
KST = ZoneInfo("Asia/Seoul")

@app.get("/")
def root():
    return {"message": "Server running"}

def get_random_korean_avg_humidity():
    return round(random.uniform(59, 70), 1)

@app.post("/receive-data")
async def receive_data(request: Request):
    data = await request.json()
    temperature = float(data.get("temperature"))
    raw_humidity = float(data.get("humidity"))

    if 30 <= raw_humidity <= 100:
        humidity = raw_humidity
    else:
        humidity = get_random_korean_avg_humidity()

    print(f"✅ 온도: {temperature}, 습도(raw): {raw_humidity} → (used): {humidity}")

    hourly_data.append({
        "temperature": temperature,
        "humidity": humidity,
        "timestamp": datetime.now(KST)
    })

    return {"status": "success"}

@app.get("/get-data")
def get_data():
    return {"data": hourly_data[-20:]}

@app.on_event("startup")
@repeat_every(seconds=3600)
async def store_hourly_average():
    if not hourly_data:
        return

    avg_temp = statistics.mean([d["temperature"] for d in hourly_data])
    avg_humidity = statistics.mean([d["humidity"] for d in hourly_data])
    now = datetime.now(KST)

    document = {
        "average_temperature": avg_temp,
        "average_humidity": avg_humidity,
        "timestamp": now
    }

    await collection.insert_one(document)
    print(f"📝 MongoDB에 저장됨: {document}")
    
    hourly_data.clear()

# ✅ 예측 API
@app.get("/forecast")
def get_forecast():
    llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.3, max_tokens=1024)

    prompt = PromptTemplate(
        input_variables=["date", "observed_11", "peak_temp"],
        template="""
You are a professional weather forecaster.

Today is {date} in Seoul. By observation:
- At 11:00 → temperature was **{observed_11}°C**
- At 15:00 → peak temperature reached **{peak_temp}°C**, with humidity around 48%

Use these observed data points as anchors.

Hourly temperature/humidity pattern should follow:
- 🌅 06:00 → around **22°C**, humidity ~70%
- 🕚 11:00 → exactly **{observed_11}°C**
- 🌞 15:00 → peak at **{peak_temp}°C**
- 🌇 After 18:00 → gradual cooling

Constraints:
- Temperature: 20°C–36°C
- Humidity: 48%–75%

Return exactly 24 hourly entries like this:
{date} 00:00 → Temperature: XX.X°C, Humidity: YY%
...
{date} 23:00 → ...
"""
    )

    observed_11 = 29.5
    peak_temp = 34.7
    start_date = datetime.now(KST)

    all_days_structured = []

    for i in range(7):
        target_date = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        result = (prompt | llm).invoke({
            "date": target_date,
            "observed_11": observed_11,
            "peak_temp": peak_temp
        })

        hourly_entries = []
        for line in result.strip().split('\n'):
            match = re.match(rf"{target_date} (\d{{2}}:\d{{2}}) → Temperature: ([\d.]+)°C, Humidity: (\d+)%", line.strip())
            if match:
                time_str, temp, hum = match.groups()
                hourly_entries.append({
                    "time": time_str,
                    "temperature": float(temp),
                    "humidity": int(hum)
                })

        all_days_structured.append({
            "date": target_date,
            "hourly": hourly_entries
        })

    return {"forecast": all_days_structured}

def fix_timestamp(doc):
    if "timestamp" in doc and isinstance(doc["timestamp"], dict) and "$date" in doc["timestamp"]:
        doc["timestamp"] = doc["timestamp"]["$date"]
    return doc

@app.get("/mongo-data")
def get_comparison_data():
    real = list(real_collection.find().sort("timestamp", 1))
    predict = list(predict_collection.find().sort("timestamp", 1))

    real_json = json.loads(json_util.dumps(real))
    pred_json = json.loads(json_util.dumps(predict))

    # ✅ timestamp 파싱하기 쉽게 평탄화
    real_clean = [fix_timestamp(d) for d in real_json]
    pred_clean = [fix_timestamp(d) for d in pred_json]

    return {
        "real": real_clean,
        "predict": pred_clean
    }