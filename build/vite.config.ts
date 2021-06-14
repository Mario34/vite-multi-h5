import { defineConfig, loadEnv } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { getInput } from './entry'
import packages from '../package.json'

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))

  const plugins = [vue()]
  if (process.env.REPORT === 'on') {
    plugins.push(
      visualizer({
        open: true,
        filename: 'report.html',
        gzipSize: true,
      }),
    )
  }

  return {
    plugins,
    resolve: {
      alias: [
        {
          find: '/@',
          replacement: path.resolve(__dirname, '../src'),
        },
        {
          find: '/@r',
          replacement: path.resolve(__dirname, '../'),
        },
      ],
    },
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    build: {
      rollupOptions: {
        input: getInput({
          pattern: /.+\.html$/,
          dirname: path.resolve(__dirname, '../pages'),
          maxLevel: 5,
        }),
        output: {
          manualChunks: {
            ...Object.keys(packages.dependencies).reduce((pre, curr) => {
              pre[curr] = [curr]
              return pre
            }, {}),
          },
        },
      },
    },
  }
})
