import './globals.css'
import { ThemeProvider } from '../contexts/theme/ThemeProvider';
import dynamic from 'next/dynamic';

const AnimatedLayout = dynamic(() => import('@/components/elements/AnimatedLayout'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider>
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}