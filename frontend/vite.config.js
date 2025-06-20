import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 외부 접속 허용
    port: 5173, // 명시적으로 포트 설정 (선택)
    proxy: {
      '/uploadFile': {
        target: 'http://43.201.168.127:5000', // ← 당신의 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
