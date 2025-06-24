import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Box, Button, Typography, Card, CardContent, CircularProgress
} from '@mui/material';

const ForecastWarning = () => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch('http://43.201.168.127:8000/forecast');
        const json = await res.json();

        const structured = json.forecast || [];
        setForecastData(structured);
        if (structured.length > 0) {
          setSelectedDate(structured[0].date);
        }
      } catch (err) {
        console.error('예측 데이터 요청 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const selectedDayData = forecastData.find(d => d.date === selectedDate)?.hourly || [];

  return (
    <Card sx={{ p: 2, borderRadius: 4, bgcolor: '#fff0f3' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📊 날짜별 예측 기온/습도
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={3}>
            <CircularProgress />
            <Typography>예측 데이터를 불러오는 중입니다...</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                mb: 3,
              }}
            >
              {forecastData.map((day) => {
                const isSelected = selectedDate === day.date;
                return (
                  <Button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    variant="contained"
                    sx={{
                      bgcolor: isSelected ? '#ff758f' : '#ffb3c1',
                      color: 'white',
                      fontWeight: isSelected ? 'bold' : 'normal',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      boxShadow: isSelected ? 3 : 1,
                      border: 'none',
                      minWidth: '110px',
                      '&:hover': {
                        bgcolor: isSelected ? '#ff5c7a' : '#ffaec3',
                      },
                      '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {day.date}
                  </Button>
                );
              })}
            </Box>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedDayData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperature" name="기온(°C)" fill="#ff8fa3" />
                <Bar dataKey="humidity" name="습도(%)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ForecastWarning;
