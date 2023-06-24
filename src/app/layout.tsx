import '../../styles/globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: ['400', '700'] })

export const metadata = {
  title: 'Ignite Shop',
  description: 'Buy Something',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
