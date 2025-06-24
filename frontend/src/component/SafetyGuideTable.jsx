import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box
} from '@mui/material';

function SafetyGuideTable() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('http://43.201.168.127:8000/get-data');
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const latest = data.data[data.data.length - 1]; // 가장 최근 값
          setTemperature(latest.temperature);
        }
      } catch (error) {
        console.error('🚨 온도 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchTemperature();
    const interval = setInterval(fetchTemperature, 10000); // 10초마다 갱신
    return () => clearInterval(interval);
  }, []);

  const rows = [
    { temp: '≥ 30°C', risk: '위험', guide: '오전 작업, 물 섭취, 교대 권장' },
    { temp: '15–25°C', risk: '적정', guide: '작업 적기' },
    { temp: '≤ 5°C', risk: '주의', guide: '방한복 착용, 결빙 확인' },
  ];

  const getAlertMessage = () => {
    if (temperature === null) return '🌡️ 기온 데이터를 불러오는 중...';
    if (temperature >= 30) return '⚠️ 위험: 오전 작업, 물 섭취, 교대 권장';
    if (temperature <= 5) return '❄️ 주의: 방한복 착용, 결빙 확인';
    if (temperature >= 15 && temperature <= 25) return '✅ 적정: 작업하기 좋은 기온입니다';
    return 'ℹ️ 참고: 일반적인 작업 가능';
  };

  return (
    <Card sx={{ mb: 4, bgcolor: '#fff3e0', borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="orange">
          🛠️ 현장 작업 안전 가이드
        </Typography>

        <Box mt={2} mb={2}>
          <Typography variant="body1" fontWeight="bold">
            {getAlertMessage()}
          </Typography>
        </Box>

        {temperature !== null && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            현재 기온: {temperature}°C
          </Typography>
        )}

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>기온</TableCell>
              <TableCell>작업 위험도</TableCell>
              <TableCell>권장 조치</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.temp}</TableCell>
                <TableCell>{row.risk}</TableCell>
                <TableCell>{row.guide}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SafetyGuideTable;
