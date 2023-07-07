import Session from '@/components/Session'
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Session>
        <body>{children}</body>
      </Session>
    </html>
  )
}
