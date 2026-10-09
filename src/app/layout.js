import '@fontsource-variable/inter'
import './globals.css'
import Header from '../components/Header';
import SmoothScroll from '../components/SmoothScroll';

export const metadata = {
  title: 'Rafael Vaz · UX/UI Designer',
  description: 'Portfolio de Rafael Vaz, UX/UI Designer especializado em Design Systems.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  )
}
