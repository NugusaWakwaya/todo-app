import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "Simple Todo App with Next.js + Prisma + Neon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
