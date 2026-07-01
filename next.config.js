/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "dev.qstack.com.ng", // port 1000
    "testing.qstack.com.ng", // port 3000
  ],
};

module.exports = nextConfig;
