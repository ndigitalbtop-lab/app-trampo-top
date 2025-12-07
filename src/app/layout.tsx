import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BUILDR - Conecte-se ao profissional certo",
  description: "Encontre profissionais qualificados da construção civil em segundos. Sem burocracia. Apenas resultados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
