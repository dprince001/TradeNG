/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "dev.qstack.com.ng", // port 1000
    "testing.qstack.com.ng", // port 3000
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

module.exports = nextConfig;
