import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import TemperatureChart from './TemperatureChart';

function CurrentWeatherBox() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false); // ✅ 팝업 1회용 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://43.201.168.127:8000/get-data');
        const data = await res.json();
        const latest = data.data?.[data.data.length - 1];

        if (latest) {
          setTemperature(latest.temperature);
          setHumidity(latest.humidity);

          // ✅ 최초 1회만 팝업 띄우기
          if (!hasShownPopup) {
            setOpenPopup(true);
            setHasShownPopup(true);
          }
        }
      } catch (error) {
        console.error('실시간 기온·습도 데이터를 불러오는 데 실패:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [hasShownPopup]);

  const recommendTime = temperature >= 30 ? '오전 6~9시' : '전 시간 가능';
  const warning =
    temperature >= 30
      ? '⚠️ 높은 기온 및 습도 지속 - 탈수 주의! 오전 시간대 작업 권장'
      : '✅ 작업하기 좋은 조건입니다.';

  return (
    <>
      {/* ✅ 한 번만 뜨는 팝업 알림 */}
      <Dialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: temperature >= 30 ? '#ffebee' : '#e8f5e9',
            borderRadius: 3,
            textAlign: 'center',
            p: 4
          }
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: temperature >= 30 ? 'error.main' : 'success.main'
          }}
        >
          {temperature >= 30 ? '⚠️ 고온 경고' : '지금은 쾌적한 작업 환경입니다 :)'}
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontSize: '1.3rem',
              fontWeight: 'medium',
              color: 'text.primary'
            }}
          >
            {warning}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color={temperature >= 30 ? 'error' : 'success'}
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
            onClick={() => setOpenPopup(false)}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ 실시간 온습도 카드 */}
      <Card sx={{ width: '60%', bgcolor: '#e3f2fd', borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" color="primary">
            🌡️ 실시간 기온 및 습도
          </Typography>

          <Box mt={1}>
            {temperature !== null && humidity !== null ? (
              <>
                <Typography variant="body1" fontWeight="bold" fontSize="1.2rem">
                  현재 기온: <strong>{temperature}°C</strong> / 습도: <strong>{humidity}%</strong>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: temperature >= 30 ? 'error.main' : 'success.main',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                >
                  {warning}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                  추천 작업 시간: <strong>{recommendTime}</strong>
                </Typography>
              </>
            ) : (
              <Typography variant="body2" sx={{ mt: 1 }}>
                데이터를 불러오는 중입니다...
              </Typography>
            )}
            <Box sx={{ pt: 4 }} >
              <TemperatureChart />
            </Box>
            
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default CurrentWeatherBox;
