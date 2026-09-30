// ── VISTA 1: SSR con Streaming SSR ──
// Shell principal con <Suspense> para streaming asíncrono
import { Suspense } from "react";
import Link from "next/link";
import { obtenerPeliculas, obtenerTendencias } from "@/services/peliculaService";
import type { Pelicula } from "@/models";

// Componente async que se streameará con Suspense
async function TendenciasStream() {
  const tendencias = await obtenerTendencias();

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">
        🔥 Tendencias
        <span className="ml-2 text-sm font-normal text-cine-muted">
          (Streaming SSR — cargado asíncronamente)
        </span>
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tendencias.map((p) => (
          <PeliculaCard key={p.id} pelicula={p} />
        ))}
      </div>
    </section>
  );
}

function PeliculaCard({ pelicula }: { pelicula: Pelicula }) {
  return (
    <Link href={`/peliculas/${pelicula.id}`}>
      <article className="group relative overflow-hidden rounded-xl border border-cine-border bg-cine-card transition-all duration-300 hover:scale-[1.03] hover:border-cine-accent/50 hover:shadow-lg hover:shadow-cine-accent/10">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={pelicula.portada}
            alt={pelicula.titulo}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cine-dark via-transparent to-transparent" />
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-cine-dark/70 px-2.5 py-1 text-xs font-semibold text-cine-gold backdrop-blur-sm">
            ⭐ {pelicula.calificacion}
          </span>
        </div>
        <div className="p-4">
          <h3 className="mb-1 text-base font-semibold leading-tight group-hover:text-cine-accent-light">
            {pelicula.titulo}
          </h3>
          <p className="text-xs text-cine-muted">
            {pelicula.anio} · {pelicula.duracion}
          </p>
          <span className="mt-2 inline-block rounded-full bg-cine-accent/10 px-2.5 py-0.5 text-xs font-medium text-cine-accent-light">
            {pelicula.categoria}
          </span>
        </div>
      </article>
    </Link>
  );
}

function TendenciasSkeleton() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">🔥 Tendencias</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-cine-border bg-cine-card"
          >
            <div className="aspect-[2/3] rounded-t-xl bg-cine-border" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 rounded bg-cine-border" />
              <div className="h-3 w-1/2 rounded bg-cine-border" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  // Esto se renderiza inmediatamente en SSR (no bloqueado)
  const peliculas = await obtenerPeliculas();

  return (
    <>
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-2xl border border-cine-border bg-gradient-to-br from-cine-accent/20 via-cine-card to-cine-darker p-8 md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cine-accent/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-cine-gold/10 blur-3xl" />
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Tu cine, <span className="text-cine-accent">donde quieras</span>
          </h1>
          <p className="mb-6 max-w-xl text-lg text-cine-muted">
            Explora miles de películas en alta definición. Streaming sin límites
            con la mejor calidad cinematográfica.
          </p>
          <Link
            href="/reproductor"
            className="inline-flex items-center gap-2 rounded-full bg-cine-accent px-6 py-3 font-semibold text-white transition-all hover:bg-cine-accent-light hover:shadow-lg hover:shadow-cine-accent/25"
          >
            ▶ Comenzar a ver
          </Link>
        </div>
      </section>

      {/* Catálogo (renderizado inmediato SSR) */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">🎬 Catálogo Completo</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {peliculas.map((p) => (
            <PeliculaCard key={p.id} pelicula={p} />
          ))}
        </div>
      </section>

      {/* Tendencias con Streaming SSR via Suspense */}
      <Suspense fallback={<TendenciasSkeleton />}>
        <TendenciasStream />
      </Suspense>
    </>
  );
}
