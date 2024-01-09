import type { Metadata } from "next";
import { Figtree, Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/supabase-provider";
import UserProvider from "@/providers/user-provider";
import ModalProvider from "@/providers/modal-provider";
import ToasterProvider from "@/providers/toaster-provider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/player";
import { getActiveProductsWithPrices } from "@/actions/getActiveProductsWithPrices";

const font = Poppins({ subsets: ["latin"], weight: ["100", "300", "600"] });

export const metadata: Metadata = {
  title: "Ghost theme",
  description: "La plataforma numero uno de musica estilo beats",
};

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userSongs = await getSongsByUserId()
  const products = await getActiveProductsWithPrices()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
          <Sidebar songs={userSongs}>{children}</Sidebar>
          <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
