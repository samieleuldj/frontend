/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Tell browsers not to upgrade to HTTP/3 (QUIC) when Cloudflare passes this through.
          { key: 'Alt-Svc', value: 'clear' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
