import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToastProvider from '@/providers/ToastProvider';
import Player from '@/components/player/Player';

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify App',
  description: 'Spotify Music App',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <UserProvider>
          <ModalProvider />
          <Sidebar>
            {children}
          </Sidebar>
          <Player />
        </UserProvider>
      </body>
    </html>
  )
}
