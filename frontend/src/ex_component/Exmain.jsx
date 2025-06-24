import React from 'react';
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

function Exmain(props) {
  return (
    <Box sx={{ bgcolor: '#f5f8ff', minHeight: '100vh', p: 3, position: 'relative' }}>
      {/* 상단 배경 헤더 */}
<Box
  sx={{
    height: 160,
    backgroundImage: 'url("/assets/goo.webp")',
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
        <Avatar sx={{ width: 70, height: 70, bgcolor: '#84a98c' }}>연</Avatar>
        <Box>
          <Typography variant="h5" fontWeight="700" color="#84a98c">
            연구원 / 전문가
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
                borderColor: '#84a98c',
                color: '#84a98c',
                fontWeight: '600',
                '&:hover': {
                  bgcolor: '#84a98c',
                  borderColor: '#84a98c',
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
        

      {/* 온도 차트 컴포넌트 */}
      
        
      
    </Box>
  );
}

export default Exmain;
