import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: { default: 'AegisAI India — Realtime Safety Navigator', template: '%s | AegisAI India' },
  description: 'Empathetic AI-powered personal safety platform tailored for India. Real-time alerts, E2EE live GPS sharing, rapid SOS emergency dispatches and community safety features.',
  keywords: ['safety', 'India', 'AI', 'navigation', 'emergency', 'SOS', 'E2EE', 'community'],
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
