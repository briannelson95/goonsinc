import Navbar from '@/components/Navbar'
import Session from '@/components/Session'
import { siteSettings } from '@/lib/queries'
import { client } from '@/lib/sanity.client'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const data = await client.fetch(siteSettings)

  return (
    <html lang="en">
      <Session>
        <body className={`${inter.className} bg-gray-200`}>
          <Navbar navigation={data.navigation} />
          <div>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
            />
          </div>
          <div className='max-w-4xl mx-auto py-6'>
            {children}
          </div>
        </body>
      </Session>
    </html>
  )
}
