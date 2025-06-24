import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

// 어종별 기온 기준 정의
const temperatureThresholds = {
  광어: { safe: 26, caution: 30 },
  우럭: { safe: 27, caution: 30 },
  전복: { safe: 28, caution: 32 }
};

// 위험도 및 조치 판별 함수
const determineRiskLevel = (species, temp) => {
  const { safe, caution } = temperatureThresholds[species];
  if (temp <= safe) {
    return { level: '🟢 안정', action: '영향 적음' };
  } else if (temp <= caution) {
    return {
      level: '🟡 주의',
      action:
        species === '광어'
          ? '스트레스 주의, 사료량 조절 권장'
          : species === '우럭'
          ? '활동성 증가로 스트레스 우려, 사료량 조절'
          : '산소 농도 관찰 필요'
    };
  } else {
    return {
      level: '🔴 위험',
      action:
        species === '광어'
          ? '물속 산소포화도 낮아짐 → 산소주입기 가동 권장'
          : species === '우럭'
          ? '수온 상승 → 면역력 저하 주의'
          : '수온 급상승 → 냉각 유지 권장'
    };
  }
};

const speciesList = ['광어', '우럭', '전복'];

function Fishrisk() {
  const [currentTemp, setCurrentTemp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const res = await axios.get('http://43.201.168.127:8000/get-data');
        const allData = res.data?.data;

        console.log('📦 전체 응답 데이터:', allData);

        if (Array.isArray(allData) && allData.length > 0) {
          const latest = allData[allData.length - 1];
          if (typeof latest.temperature === 'number') {
            setCurrentTemp(latest.temperature);
          } else {
            console.error('🚫 latest.temperature 가 숫자가 아닙니다:', latest);
          }
        } else {
          console.warn('⚠️ 데이터가 아직 없음 또는 비어 있음');
        }
      } catch (error) {
        console.error('❌ API 호출 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemperature();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography>기온 데이터를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  if (currentTemp === null) {
    return (
      <Typography textAlign="center" color="error" mt={4}>
        ❗ 데이터가 아직 수집되지 않았습니다. 센서 상태를 확인해주세요.
      </Typography>
    );
  }

  const speciesData = speciesList.map((species) => {
    const { level, action } = determineRiskLevel(species, currentTemp);
    return {
      name: species,
      risk: level,
      temperature: `${currentTemp.toFixed(1)}°C`,
      action
    };
  });

  return (
    <Card sx={{ borderRadius: 4, bgcolor: '#e0f2f1', p: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
          🌡️ 어장 환경 위험도 분석
        </Typography>

        <Box mb={2}>
          <Typography variant="body2">
            • 고온 지속 시 어종별 스트레스 증가 → 조치 권고
          </Typography>
          <Typography variant="body2" color="error">
            ⚠️ 현재 기온 {currentTemp.toFixed(1)}°C
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>어종</strong></TableCell>
                <TableCell><strong>현재 위험도</strong></TableCell>
                <TableCell><strong>현재 기온</strong></TableCell>
                <TableCell><strong>조치</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {speciesData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.risk}</TableCell>
                  <TableCell>{row.temperature}</TableCell>
                  <TableCell>{row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default Fishrisk;
