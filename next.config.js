/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
        "dev.qstack.com.ng", // port 1000
        "testing.qstack.com.ng", // port 3000
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

module.exports = nextConfig;
