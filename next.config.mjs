/** @type {import('next').NextConfig} */
const nextConfig = {
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
