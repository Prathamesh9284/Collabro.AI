// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode:false,
//     experimental: {
//         missingSuspenseWithCSRBailout: false,
//       },
//     // images:{
//     //     domains:['img.freepik.com']
//     // }


//     images: {
//         remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: 'knowindia.india.gov.in',
//           },
//           {
//             protocol: 'https',
//             hostname: 'ugceresources.in',
//           },
//           {
//             protocol: 'https',
//             hostname: 'nyaysathi.vercel.app',
//           },
//           {
//             protocol: 'https',
//             hostname: 'wordwallapp.azureedge.net',
//           },
//           {
//             protocol: 'https',
//             hostname: 'firebasestorage.googleapis.com',
//           },
//           {
//             protocol: 'https',
//             hostname: 'img.clerk.com',
//           },
//           {
//             protocol: 'https',
//             hostname: 'res.cloudinary.com',
//           },
//           {
//             protocol: 'https',
//             hostname: 'img.freepik.com'
//           },
//           {
//             protocol: 'https',
//             hostname: 'www.google.com'
//           },
//           {
//             protocol: 'https',
//             hostname: 'play-lh.googleusercontent.com'
//           },
//           {
//             protocol: 'https',
//             hostname: 'upload.wikimedia.org'
//           },
//           {
//             protocol: 'https',
//             hostname: 'techcrunch.com'
//           }
//         ],
//       },
    
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React's strict mode (consider enabling for development to catch potential issues)
  reactStrictMode: false,

  // Experimental features configuration
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  // Optimized images configuration
  images: {
    remotePatterns: [
      // Allowed image domains and their configurations
      { protocol: 'https', hostname: 'knowindia.india.gov.in' },
      { protocol: 'https', hostname: 'ugceresources.in' },
      { protocol: 'https', hostname: 'nyaysathi.vercel.app' },
      { protocol: 'https', hostname: 'wordwallapp.azureedge.net' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'https', hostname: 'play-lh.googleusercontent.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'techcrunch.com' },
    ],
  },

  // Webpack customization (e.g., handling of node:async_hooks)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false, // Prevent async_hooks usage on client-side
      };
    }
    return config;
  },
};

export default nextConfig;
