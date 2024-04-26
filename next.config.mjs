/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com']
  },
    redirects: () => {
        return [
          {
            source: "/",
            destination: "/chat/chatpage",
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
