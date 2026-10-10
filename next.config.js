/** @type {import('next').NextConfig} */
// Em GitHub Pages o site vive em /portfolio-v2/. Localmente, BASE_PATH fica vazio.
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
