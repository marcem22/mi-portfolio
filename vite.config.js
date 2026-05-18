import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      'three/build/three.module.js': path.resolve('node_modules/three/build/three.module.js'),
      'three': path.resolve('node_modules/three')
    },
    dedupe: ['three']
  }
})