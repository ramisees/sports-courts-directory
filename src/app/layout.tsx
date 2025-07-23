import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sports Courts Directory',
  description: 'Find sports courts near you!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl">🏀 Sports Courts Directory</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
