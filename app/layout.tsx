import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/context/CartContext';
import { AuthProvider } from '@/lib/context/AuthContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'De Gloria en Gloria - Librería Cristiana Digital',
  description: 'Descubre libros, devocionales y enseñanzas profundas que fortalecerán tu caminar espiritual y te equiparán para servir con excelencia.',
  keywords: ['libros cristianos', 'devocionales', 'enseñanza bíblica', 'recursos espirituales', 'ministerio'],
  authors: [{ name: 'De Gloria en Gloria' }],
  openGraph: {
    title: 'De Gloria en Gloria - Librería Cristiana Digital',
    description: 'Recursos que edifican tu fe y ministerio',
    url: 'https://deglorialibros.com',
    siteName: 'De Gloria en Gloria',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

