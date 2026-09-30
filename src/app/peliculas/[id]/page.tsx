// ── VISTA 2: ISR (Incremental Static Regeneration) ──
// Revalidación estática cada 60 segundos
import Link from "next/link";
import { obtenerPeliculaPorId, obtenerPeliculas } from "@/services/peliculaService";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR: revalida cada 60s

export async function generateStaticParams() {
  const peliculas = await obtenerPeliculas();
  return peliculas.map((p) => ({ id: String(p.id) }));
}

export default async function PeliculaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pelicula = await obtenerPeliculaPorId(Number(id));

  if (!pelicula) notFound();

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-cine-muted">
        <Link href="/" className="hover:text-cine-accent">
          Inicio
        </Link>
        <span className="mx-2">›</span>
        <span className="text-cine-text">{pelicula.titulo}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Póster */}
        <div className="relative overflow-hidden rounded-2xl border border-cine-border shadow-2xl shadow-cine-accent/5">
          <img
            src={pelicula.portada}
            alt={pelicula.titulo}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cine-dark/60 to-transparent" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-cine-accent/10 px-3 py-1 text-sm font-medium text-cine-accent-light">
            {pelicula.categoria}
          </span>

          <h1 className="mb-3 text-4xl font-extrabold leading-tight">
            {pelicula.titulo}
          </h1>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-cine-muted">
            <span className="flex items-center gap-1 text-cine-gold font-semibold">
              ⭐ {pelicula.calificacion}
            </span>
            <span>{pelicula.anio}</span>
            <span>{pelicula.duracion}</span>
            <span>Dir. {pelicula.director}</span>
          </div>

          <p className="mb-6 text-base leading-relaxed text-cine-muted">
            {pelicula.sinopsis}
          </p>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-cine-muted">
              Elenco
            </h3>
            <div className="flex flex-wrap gap-2">
              {pelicula.elenco.map((actor) => (
                <span
                  key={actor}
                  className="rounded-full border border-cine-border bg-cine-card px-3 py-1 text-sm"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/reproductor?id=${pelicula.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-cine-accent px-6 py-3 font-semibold text-white transition-all hover:bg-cine-accent-light hover:shadow-lg hover:shadow-cine-accent/25"
            >
              ▶ Reproducir
            </Link>
            <button className="rounded-full border border-cine-border bg-cine-card px-6 py-3 text-sm font-medium transition-all hover:border-cine-accent/50 hover:bg-cine-border">
              + Mi Lista
            </button>
          </div>

          {/* Badge ISR */}
          <p className="mt-8 rounded-lg border border-cine-border bg-cine-card/50 p-3 text-xs text-cine-muted">
            ⚡ <strong>ISR</strong> — Esta página se regenera estáticamente cada 60 segundos
            mediante <code className="text-cine-accent-light">revalidate = 60</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
