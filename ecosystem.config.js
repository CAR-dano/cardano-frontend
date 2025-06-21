module.exports = {
  apps: [{
    name: "cardano-frontend",
    script: "node_modules/next/dist/bin/next",
    args: "start -p 3000",  // Port for Next.js
    interpreter: "node",
    exec_mode: "fork",       // Use fork mode for dev servers
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "2G",
    env: {
      NODE_ENV: "production",
      NEXT_PUBLIC_API_URL: "http://localhost:3010/api/v1"  // Backend API URL
    }
  }]
};