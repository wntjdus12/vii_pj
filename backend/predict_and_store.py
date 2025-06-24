import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
import json
from datetime import datetime, timedelta

# ✅ 1. 환경변수 불러오기
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# ✅ 2. MongoDB 연결
client = MongoClient("mongodb://admin:admin123@43.201.168.127:27017/?authSource=admin")
db = client["sensor_db"]
real_collection = db["Temperature_Humidity_Data"]
pred_collection = db["Predicted_Temperature_Humidity"]

# ✅ 3. 최근 5일치 실측 데이터 가져오기
end = datetime.now()
start = end - timedelta(days=5)
real_data = list(real_collection.find({"timestamp": {"$gte": start.isoformat(), "$lte": end.isoformat()}}).sort("timestamp", 1))

# ✅ 4. 최근 데이터 포맷팅 (LLM 입력용)
history = "\n".join([
    f"{d['timestamp'][:16]} → {d['average_temperature']}°C, {d['average_humidity']}%"
    for d in real_data
])

# ✅ 5. 프롬프트 템플릿
prompt_template = PromptTemplate.from_template("""
당신은 기상예보 전문가입니다.

최근 5일간의 서울 기온 및 습도 데이터는 다음과 같습니다:
{history}

이 데이터를 참고하여 앞으로 1시간 간격으로 7일간의 평균 기온(°C)과 습도(%)를 예측하세요.

결과는 JSON 배열로 다음과 같은 형태로 반환해주세요:
[
  {{ "timestamp": "2025-06-25T00:00:00", "average_temperature": 24.2, "average_humidity": 62.3 }},
  ...
]
""")

prompt = prompt_template.format(history=history)

# ✅ 6. LLM 실행
llm = ChatOpenAI(temperature=0.4, model="gpt-3.5-turbo", api_key=openai_api_key)
response = llm.invoke(prompt)

# ✅ 7. 응답 파싱 & MongoDB 저장
try:
    predictions = json.loads(response.content)
    for item in predictions:
        item["timestamp"] = datetime.fromisoformat(item["timestamp"])
    pred_collection.delete_many({})  # 기존 예측 제거 (선택)
    pred_collection.insert_many(predictions)
    print(f"✅ {len(predictions)}개 예측 데이터를 저장했습니다.")
except Exception as e:
    print("❌ 예측 결과 파싱 오류:", e)
    print("응답 내용:", response.content)
