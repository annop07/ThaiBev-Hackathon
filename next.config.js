/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://10.170.100.75:8000/:path*',
            },
        ]
    },
}

module.exports = nextConfig