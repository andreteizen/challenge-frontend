import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { CompanyProvider } from '@/contexts/company-context';

export const metadata: Metadata = {
  title: 'Front-end Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CompanyProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </CompanyProvider>
    </html>
  );
}
