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

function Main(props) {
  return (
    <Box sx={{ bgcolor: '#f5f8ff', minHeight: '100vh', p: 3, position: 'relative' }}>
      {/* 상단 배경 헤더 */}
<Box
  sx={{
    height: 160,
    background: 'linear-gradient(90deg, rgb(86, 158, 245), #93c5fd)',
    borderRadius: 4,
    mb: 6,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-40%',
      left: '-40%',
      width: '200%',
      height: '200%',
      background:
        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 60%),' +
        'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 50%),' +
        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07), transparent 70%)',
      zIndex: 1,
      pointerEvents: 'none',
      transform: 'rotate(-15deg)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '180%',
      height: '180%',
      background:
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 70%),' +
        'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06), transparent 60%)',
      zIndex: 2,
      pointerEvents: 'none',
      transform: 'rotate(10deg)',
    },
  }}
/>

      {/* 프로필 박스 */}
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          top: -100,
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
            어업종사자
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

      {/* 센서 박스 영역 */}
      <Grid container spacing={3} px={4} mt={-6}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: '#e6f0ff',
              color: 'primary.dark',
              fontWeight: '700',
              fontSize: '1.1rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(86, 158, 245, 0.3)',
            }}
          >
            온도 센서
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: '#e6f7ff',
              color: 'primary.main',
              fontWeight: '600',
              fontSize: '1rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(54, 162, 235, 0.3)',
            }}
          >
            조도 센서
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button (오른쪽 아래 고정) */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 40, right: 40, boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}
      >
        <AddIcon />
      </Fab>

      {/* 오늘의 수온 박스 */}
      <Box px={14} mt={3} mr={14}  maxWidth={900} >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#ffffff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="h6" fontWeight="700" mb={1} color="primary.dark">
            온도 센서
          </Typography>
          <Typography variant="body1" color="text.secondary">
            오늘의 수온
          </Typography>
        </Paper>
      </Box>

      {/* 온도 차트 컴포넌트 */}
      
        <TemperatureChart />
      
    </Box>
  );
}

export default Main;
