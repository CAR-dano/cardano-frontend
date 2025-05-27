module.exports = {
  apps: [
    {
      name: "frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4001",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_PDF_URL: process.env.NEXT_PUBLIC_PDF_URL,
      },
    },
  ],
};
