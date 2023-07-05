import { cn } from '@app/lib/utils';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Solara Admin App',
  description: 'Informações rápidas de clientes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, 'bg-neutral-100 text-neutral-950')}>
        {children}
      </body>
    </html>
  );
}
