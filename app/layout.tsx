import { Inter } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/providers/modalProvider';

import './globals.css';
import { ToasterProvider } from '@/providers/toasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin dashboard',
  description: 'dashboard for products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
