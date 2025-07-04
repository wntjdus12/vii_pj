import React from 'react';
import './Main.css'; // 필요하면 여기서 추가 스타일도 가능
import Grid from '@mui/material/Grid';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Stack,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TemperatureChart from './TemperatureChart';
import CurrentWeatherBox from './CurrentWeatherBox';
import SafetyGuideTable from './SafetyGuideTable';
import ForecastWarning from './ForecastWarning';
import HumidityRainAlert from './HumidityRainAlert';
import Mong from './Mong';





function Main(props) {
  return (
    <Box sx={{ bgcolor: '#f5f8ff', minHeight: '100vh', p: 3, position: 'relative' }}>
      {/* 상단 배경 헤더 */}
<Box
  sx={{
    height: 160,
    backgroundImage: 'url("/assets/oll.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 4,
    mb: 6,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // 약간 흐리게
      zIndex: 1,
      pointerEvents: 'none',
    },
  }}
/>

      {/* 프로필 박스 */}
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          top: -70,
          mx: 4,
          p: 3,
          borderRadius: 4,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#fff',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Avatar sx={{ width: 70, height: 70, bgcolor: 'primary.light' }}>어</Avatar>
        <Box>
          <Typography variant="h5" fontWeight="700" color="primary.dark">
            어업종사자!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            fish@naver.com
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} ml="auto">
          {['OVERVIEW', 'TEAMS', 'PROJECTS'].map((label) => (
            <Button
              key={label}
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: '600',
                '&:hover': {
                  bgcolor: 'primary.light',
                  borderColor: 'primary.dark',
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Paper>

      {/* 실시간 기온 및 습도 컴포넌트 */}
      <Box sx={{ mb:2, textAlign: 'center' }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: '#2e7d32', // 짙은 녹색
                fontFamily: 'Noto Sans KR, sans-serif',
                borderBottom: '3px solid #a5d6a7',
                display: 'inline-block',
                paddingBottom: '8px'
              }}
            >
              🌡️ 실시간 온습도 측정
            </Typography>
          </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '40px'}}>
              <CurrentWeatherBox />
          <Grid>
            <Grid item xs={6} md={12}>
              <SafetyGuideTable />
            </Grid>
            <Grid item xs={6} md={6}>
              <ForecastWarning />
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={6} md={6}>
          <Mong />
        </Grid>

      {/* 온도 차트 컴포넌트 */}
      
        
      
    </Box>
  );
}

export default Main;
