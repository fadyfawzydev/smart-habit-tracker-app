import { Inter } from 'next/font/google';
import { ThemeProvider } from './theme/ThemeProvider';
import Navigation from './components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Habit Tracker',
  description: 'Track your habits and build a better you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
