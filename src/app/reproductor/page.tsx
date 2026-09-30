// ── VISTA 3: CSR (Client-Side Rendering) ──
// Reproductor interactivo 100% en el cliente
"use client";

import { useRef, useEffect } from "react";
import { useReproductor } from "@/controllers/useReproductor";

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function ReproductorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    estado,
    toggleReproduccion,
    cambiarVolumen,
    toggleSilencio,
    actualizarProgreso,
    cambiarVelocidad,
    togglePantallaCompleta,
    buscarTiempo,
  } = useReproductor();

  // Sincronizar video con estado
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (estado.reproduciendo) v.play().catch(() => {});
    else v.pause();
  }, [estado.reproduciendo]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = estado.silenciado ? 0 : estado.volumen / 100;
  }, [estado.volumen, estado.silenciado]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = estado.velocidad;
  }, [estado.velocidad]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v) actualizarProgreso(v.currentTime, v.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prog = Number(e.target.value);
    buscarTiempo(prog);
    const v = videoRef.current;
    if (v && v.duration) v.currentTime = (prog / 100) * v.duration;
  };

  const handleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!document.fullscreenElement) v.requestFullscreen();
    else document.exitFullscreen();
    togglePantallaCompleta();
  };

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <h1 className="mb-6 text-3xl font-extrabold">
        🎬 Reproductor{" "}
        <span className="text-sm font-normal text-cine-muted">
          (CSR — Client-Side Rendering)
        </span>
      </h1>

      {/* Video Container */}
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-cine-border bg-black shadow-2xl shadow-cine-accent/10">
        <video
          ref={videoRef}
          className="aspect-video w-full"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          onTimeUpdate={handleTimeUpdate}
          poster="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=675&fit=crop"
        />

        {/* Controles */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
          {/* Barra de progreso */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={estado.progreso}
            onChange={handleSeek}
            className="mb-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-cine-border accent-cine-accent [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cine-accent"
          />

          <div className="flex items-center justify-between">
            {/* Lado izquierdo */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleReproduccion}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cine-accent text-lg text-white transition-transform hover:scale-110"
                id="btn-play"
              >
                {estado.reproduciendo ? "⏸" : "▶"}
              </button>

              <button
                onClick={toggleSilencio}
                className="text-lg transition-colors hover:text-cine-accent"
                id="btn-mute"
              >
                {estado.silenciado || estado.volumen === 0 ? "🔇" : estado.volumen < 50 ? "🔉" : "🔊"}
              </button>

              <input
                type="range"
                min={0}
                max={100}
                value={estado.silenciado ? 0 : estado.volumen}
                onChange={(e) => cambiarVolumen(Number(e.target.value))}
                className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-cine-border accent-cine-accent"
                id="slider-volumen"
              />

              <span className="text-xs text-cine-muted">
                {formatTime(estado.tiempoActual)} / {formatTime(estado.duracionTotal)}
              </span>
            </div>

            {/* Lado derecho */}
            <div className="flex items-center gap-3">
              <select
                value={estado.velocidad}
                onChange={(e) => cambiarVelocidad(Number(e.target.value))}
                className="rounded-lg border border-cine-border bg-cine-card px-2 py-1 text-xs text-cine-text"
                id="select-velocidad"
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((v) => (
                  <option key={v} value={v}>
                    {v}x
                  </option>
                ))}
              </select>

              <button
                onClick={handleFullscreen}
                className="text-lg transition-colors hover:text-cine-accent"
                id="btn-fullscreen"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de estado */}
      <div className="mx-auto mt-8 max-w-4xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Estado", value: estado.reproduciendo ? "▶ Reproduciendo" : "⏸ Pausado", color: estado.reproduciendo ? "text-green-400" : "text-yellow-400" },
          { label: "Volumen", value: estado.silenciado ? "Silenciado" : `${estado.volumen}%`, color: "text-cine-accent-light" },
          { label: "Velocidad", value: `${estado.velocidad}x`, color: "text-cine-gold" },
          { label: "Progreso", value: `${estado.progreso.toFixed(1)}%`, color: "text-cyan-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-cine-border bg-cine-card p-4 text-center"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-cine-muted">
              {item.label}
            </p>
            <p className={`mt-1 text-lg font-bold ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
