import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const LineChart = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://43.201.168.127:8000/get-data')
        .then((res) => {
          setSensorData(res.data.data);
        })
        .catch((err) => {
          console.error('데이터 가져오기 실패:', err);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (ts) => {
    const date = new Date(ts);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const labels = sensorData.map((d) => formatTimestamp(d.timestamp));

  const chartData = {
    labels,
    datasets: [
      {
        label: '🌡️ Temperature (°C)',
        data: sensorData.map((d) => d.temperature),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
      },
      {
        label: '💧 Humidity (%)',
        data: sensorData.map((d) => d.humidity),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          callback: function (val, index) {
            // 5개 중 1개만 라벨 출력
            return index % 5 === 0 ? this.getLabelForValue(val) : '';
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '90%', maxWidth: '700px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>📈 실시간 온습도 모니터링</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
