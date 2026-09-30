import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineStream — Tu plataforma de streaming",
  description:
    "Descubre, explora y disfruta las mejores películas en CineStream. Streaming de video con calidad cinematográfica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        {/* ── Navbar ── */}
        <nav className="sticky top-0 z-50 border-b border-cine-border bg-cine-darker/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-cine-accent">Cine</span>Stream
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium text-cine-muted">
              <Link
                href="/"
                className="transition-colors hover:text-cine-accent"
              >
                Inicio
              </Link>
              <Link
                href="/reproductor"
                className="transition-colors hover:text-cine-accent"
              >
                Reproductor
              </Link>
              <Link
                href="/terminos"
                className="transition-colors hover:text-cine-accent"
              >
                Términos
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Contenido ── */}
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>

        {/* ── Footer ── */}
        <footer className="border-t border-cine-border bg-cine-darker py-8 text-center text-sm text-cine-muted">
          <p>© 2024 CineStream. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
