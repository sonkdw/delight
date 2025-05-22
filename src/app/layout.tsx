import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '2025 딜라이트 서울 (2025 delight Seoul) - 미디어 아트 전시',
  description:
    '빛으로 만나는 새로운 서울 이야기, 딜라이트 서울은 세계 주요 도시에서 주목을 받은 미디어 아트 몰입형 전시입니다.',
  keywords: [
    '미디어아트',
    '서울',
    '전시',
    '미술관',
    '몰입형',
    '체험형',
    '아트',
    '딜라이트',
    '2025',
  ],
  applicationName: '딜라이트 서울',
  metadataBase: new URL('https://delight-five.vercel.app'), // 실제 도메인으로 교체 필요
  openGraph: {
    type: 'website',
    siteName: '2025 딜라이트 서울',
    title: '2025 딜라이트 서울 (2025 delight Seoul)',
    description:
      '빛으로 만나는 새로운 서울 이야기, 딜라이트 서울은 세계 주요 도시에서 주목을 받은 미디어 아트 몰입형 전시입니다.',
    images: ['https://delight-five.vercel.app/images/og-image.jpeg'], // 실제 도메인으로 교체 필요
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: '2025 딜라이트 서울',
    description: '미디어아트, 서울, 전시, 미술관, 몰입형, 체험형, 아트, 딜라이트, 2025',
    images: ['https://delight-five.vercel.app/images/og-image.jpeg'], // 실제 도메인으로 교체 필요
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <script
          className="daum_roughmap_loader_script"
          src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
