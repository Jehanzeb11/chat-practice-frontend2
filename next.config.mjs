/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com','www.famebusinesssolutions.com','img.freepik.com']
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
      env: {
        API_URL: process.env.NEXT_PUBLIC_BASE_URL,
      },
};

export default nextConfig;
