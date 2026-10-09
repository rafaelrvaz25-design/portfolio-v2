import './globals.css'
import '@fontsource-variable/inter'
import Header from '../components/Header';

export const metadata = {
  title: 'Rafael Vaz · UX/UI Designer',
  description: 'Portfolio de Rafael Vaz, UX/UI Designer especializado em Design Systems.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}>
        <Header />
        {children}
      </body>
    </html>
  )
}
