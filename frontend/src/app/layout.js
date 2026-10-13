import "./globals.css";
import AuthProvider from "@/app/(provider)/AuthProvider";
import Header from "@/app/_features/Header";

export const metadata = { title: "АмитанГэр", description: "Гэрээ хайсан амьтад" };

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>
        <AuthProvider>
          <Header />
          <main className="mx-auto max-w-6xl p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
