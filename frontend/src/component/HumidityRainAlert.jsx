import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function HumidityRainAlert() {
  const [humidity, setHumidity] = useState(null);
  const [prevTemp, setPrevTemp] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('http://43.201.168.127:8000/get-data');
        const json = await res.json();
        const data = json.data || [];

        if (data.length >= 2) {
          const latest = data[data.length - 1];
          const previous = data[data.length - 2];
          setHumidity(latest.humidity);
          setCurrentTemp(latest.temperature);
          setPrevTemp(previous.temperature);
        }
      } catch (err) {
        console.error('❌ 습도 데이터 요청 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  const fallingTemp = prevTemp !== null && currentTemp !== null && currentTemp < prevTemp;
  const shouldAlert = humidity !== null && humidity >= 85 && fallingTemp;

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 4,
        bgcolor: shouldAlert ? '#fff3f3' : '#f1f8e9',
        border: shouldAlert ? '2px solid #ef5350' : '1px solid #c8e6c9',
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" color={shouldAlert ? 'error.main' : 'success.main'} mb={2}>
          {shouldAlert ? '⚠️ 강우 예보! 대비 필요' : '🟢현재 상태: 안정적'}
        </Typography>

        {loading ? (
          <Box mt={3} textAlign="center">
            <CircularProgress size={28} />
            <Typography variant="body1" mt={2}>데이터 불러오는 중...</Typography>
          </Box>
        ) : humidity === null ? (
          <Typography variant="body1" color="error" mt={3}>
            ❌ 데이터를 불러오지 못했습니다.
          </Typography>
        ) : (
          <Box>
            <Box display="flex" alignItems="center" gap={2} mt={1}>
              <Typography variant="body1" fontWeight="bold">
                현재 습도: <span style={{ color: '#1976d2' }}>{humidity}%</span>
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                기온 변화:{" "}
                <span style={{ color: fallingTemp ? '#d32f2f' : '#388e3c' }}>
                  {fallingTemp ? '하락 중 ⬇️' : '변동 없음 ↔️'}
                </span>
              </Typography>
            </Box>

            {shouldAlert ? (
              <Box mt={3} p={2} bgcolor="#ffcdd2" borderRadius={2}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <WarningAmberIcon color="error" />
                  <Typography variant="h6" color="error" fontWeight="bold">
                    1시간 이내 비 가능성 높음!
                  </Typography>
                </Box>
                <Typography variant="body1" mb={1}>
                  🌧️ 고습도({humidity}%) + 기온 하강 → 곧 비가 내릴 수 있습니다.
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  ⛓️ *부유 그물망을 1단 낮추고 장비를 정비하세요. 수면 위 어류 탈출 및 부상 방지에 효과적입니다.*
                </Typography>
              </Box>
            ) : (
              <Box mt={3} p={2} bgcolor="#dcedc8" borderRadius={2}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="h6" color="success.main" fontWeight="bold">
                    지금은 안정적인 상태입니다.
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  💡 습도 85% 이상 & 기온이 하락할 경우 → 강우 가능성 있음. 대비가 필요합니다.
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default HumidityRainAlert;
