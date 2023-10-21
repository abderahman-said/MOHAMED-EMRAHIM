/** @type {import('next').NextConfig} */
// const path = require('path');
// const withPurgeCSSModules = require('next-purge-css-modules');

// const isProd = process.env.NODE_ENV === "production";

// const withPlugins = require("next-compose-plugins");
// const optimizedImages = require("next-optimized-images");

// const whitelister = require("purgecss-whitelister");

// const withCss = require("@zeit/next-css");
// const withPurgeCss = require("next-purgecss");

// module.exports = withCss(
//   withCss(
//     withPurgeCss({
//       generateBuildId: async () => {
//         // You can, for example, get the latest git commit hash here
//         return "my-build-id3";
//       },
//       distDir: ".next",
//       purgeCssPaths: [
//         "./pages/**/*.{js,jsx,ts,tsx}",
//         "./components/**/*.{js,jsx,ts,tsx}",
//         "./node_modules/react-bootstrap/**/*.js",
//         "./node_modules/bootstrap/dist/**/*.js",
//         "./node_modules/bootstrap/dist/css/bootstrap.css",
//       ],
//       whitelist: whitelister("bootstrap/dist/css/bootstrap.css"),
//     })
//   )
// );

const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
          {
            key: "x-another-custom-header",
            value: "my other custom header value",
          },
        ],
      },
    ];
  },
  compress: false,
  // fontLoaders: [
  //   { loader: '@next/font/google', options: { subsets: ['latin'] } },
  // ],
  
  // purgeCssPaths: [
  //   "node_modules/react-bootstrap/**/*.js",
  //   "node_modules/bootstrap/dist/**/*.js",
  // ],
  // plugins: [
  //   new PurgecssPlugin({
  //     keyframes: false,
  //     paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, {
  //       nodir: true,
  //     }),
  //     whitelist: whitelister("bootstrap/dist/css/bootstrap.css"),
  //   }),
  // ],

  // optimizedImages: {
  //   imagesFolder: "chunks/images",
  // },
  // assetPrefix: isProd ? "https://mib-github.vercel.app/" : undefined,

  reactStrictMode: false,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    deviceSizes: [
      256,
      320,
      492,
      512,
      640,
      768,
      896,
      1024,
      1152,
      1280,
      1408,
      1536,
      1664,
      1792,
      1920,
      2048,
      2176,
      2304,
      2432,
      2560,
      2688,
      2944,
    ],
    imageSizes: [32, 64, 96, 112, 128, 144, 160, 176, 192, 240],
    formats: ["image/webp"],
    domains: [
      "souq.deltawy.com",
      "apps.mohamed-ibrahiem.com",
      "192.168.0.201",
      "deltawy.com",
    ],
  },
  i18n: {
    locales: ["ar"],
    defaultLocale: "ar",
  },
  // purgeCSSModules: {
  //   content: path.join(__dirname, 'pages/**/*.{js,jsx,ts,tsx}'),
  //   enableDevPurge: true,
  //   safelist: ['body', 'html'],
  // }
};





// module.exports = withPurgeCSSModules(nextConfig);
module.exports = nextConfig;


// const nextConfig = { ... };

// module.exports = withPurgeCSSModules(nextConfig);
