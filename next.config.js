/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_SECRET_KEY: process.env.API_SECRET_KEY,
    }
}

module.exports = nextConfig
