import "./globals.css"
import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${jetbrainsMono.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
