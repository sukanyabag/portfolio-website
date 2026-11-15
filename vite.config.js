import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/**
 * Watches public/portfolio.json during `dev` and tells the browser to
 * re-fetch it when you save. No page reload, no rebuild.
 */
function portfolioLiveData() {
  return {
    name: 'portfolio-live-data',
    configureServer(server) {
      const file = path.resolve(server.config.publicDir, 'portfolio.json')
      server.watcher.add(file)
      server.watcher.on('change', (changed) => {
        if (path.resolve(changed) === file) {
          server.ws.send({ type: 'custom', event: 'portfolio:update' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), portfolioLiveData()],
})
