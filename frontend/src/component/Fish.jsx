import React from 'react';
import { Typography, Box } from '@mui/material';
import Fishrisk from './Fishrisk';

function Fish(props) {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
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
        🐟 어장 환경 분석 
      </Typography>

      <Box mt={4} mx={8}>
        <Fishrisk />
      </Box>
    </Box>
  );
}

export default Fish;
