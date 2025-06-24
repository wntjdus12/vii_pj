import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Box } from "@mui/material";

const testData = [
  { time: "2025-06-24T10:00", real_temp: 21, pred_temp: 22 },
  { time: "2025-06-24T11:00", real_temp: 22, pred_temp: 23 },
  { time: "2025-06-24T12:00", real_temp: 24, pred_temp: 24 }
];

const Mong = () => {
  return (
    <Box sx={{ p: 4 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={testData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Legend />
          <Line dataKey="real_temp" name="실제 기온" stroke="#1f77b4" />
          <Line dataKey="pred_temp" name="예측 기온" stroke="#ff7f0e" strokeDasharray="5 3" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Mong;
