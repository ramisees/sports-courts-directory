import type { Metadata } from 'next'
import './globals.css'
import Navigation from '../../components/ui/Navigation'

export const metadata: Metadata = {
  title: 'Sair Courts - Ad Soarts Findersion',
  description: 'Find the finest courts near you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
