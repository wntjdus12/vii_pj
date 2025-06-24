from pymongo import MongoClient
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import matplotlib as mpl


mpl.rcParams['font.family'] = 'NanumGothic'  # 설치된 경우 사용
mpl.rcParams['axes.unicode_minus'] = False  # 마이너스 깨짐 방지


client = MongoClient("mongodb://admin:admin123@43.201.168.127:27017/?authSource=admin")
db = client["sensor_db"]
collection = db["Temperature_Humidity_Data"]  # 정확한 컬렉션 이름

data = list(collection.find().sort("timestamp", 1))
df_real = pd.DataFrame(data)

if df_real.empty:
    print("❌ MongoDB에서 데이터를 가져왔지만, 문서가 없습니다.")
else:
    print(f"✅ {len(df_real)}개 문서를 불러왔습니다.")

    df_real["timestamp"] = pd.to_datetime(df_real["timestamp"])
    df_real.set_index("timestamp", inplace=True)


    plt.figure(figsize=(14, 5))

    # 온도
    plt.subplot(1, 2, 1)
    plt.plot(df_real.index, df_real["average_temperature"], marker='o', label="실제 기온")
    plt.title("실제 기온 시간 추이")
    plt.xlabel("시간")
    plt.ylabel("°C")
    plt.grid(True)
    plt.legend()

    # 습도
    plt.subplot(1, 2, 2)
    plt.plot(df_real.index, df_real["average_humidity"], marker='x', color='orange', label="실제 습도")
    plt.title("실제 습도 시간 추이")
    plt.xlabel("시간")
    plt.ylabel("%")
    plt.grid(True)
    plt.legend()

    plt.tight_layout()
    plt.show()
