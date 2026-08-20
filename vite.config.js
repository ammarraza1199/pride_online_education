import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://prideonlineeducation.com',
      dynamicRoutes: [
        '/about-us',
        '/contact-us',
        '/it-courses',
        '/ug-course',
        '/pg-course',
        '/bca-admission',
        '/bcom-admission',
        '/ba-admission',
        '/online-degree',
        '/iti-copa',
        '/computer-courses',
        '/online-exam-center'
      ]
    })
  ],
})
