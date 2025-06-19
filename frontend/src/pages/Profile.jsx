import React from 'react';
import Header from '../component/Header';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import fisher from "../assets/fisher.png";
import communityImg from '../assets/community.png';
import expertImg from '../assets/expert.png';
import studentImg from '../assets/student.png';
import { useNavigate } from 'react-router-dom';



const roles = [
  { label: '어업종사자', img:fisherImg , path:'./home' },
  { label: '학생', img: studentImg, path:'./home' },       
  { label: '지역 주민', img: communityImg, path:'./home'},
  { label: '연구원 / 전문가', img: expertImg, path:'./home' },
];

function profile(props) {
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
             <Box sx={{ backgroundColor: '#a0c4ff', minHeight: '100vh', textAlign: 'center', py: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="white" mb={1}>
                    환영합니다!
                </Typography>
                <Typography variant="body1" color="white" mb={4}>
                    당신의 직업은 무엇인가요? <br /> 맞춤형 정보를 제공해드릴게요!!
                </Typography>

      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 6,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary" mb={3}>
          원하는 직종을 선택해봐!
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {roles.map((role, index) => (
            <Grid item xs={6} key={index}>
              <Paper
                elevation={2}
                onClick={() => navigate(role.path)}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer' },
                }}
              >
                <img src={role.img} alt={role.label} width={160} height={160} />
                <Typography mt={1}>{role.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4, backgroundColor: '#4f83cc', borderRadius: 6 }}
        >
          입장
        </Button>
      </Box>
    </Box>
        </div>
    );
}

export default profile;