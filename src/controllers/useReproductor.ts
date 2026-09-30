// ── Capa de Controladores / Adaptadores ──
// Hook para el reproductor de video (CSR)
"use client";

import { useState, useCallback } from "react";
import { EstadoReproductor } from "@/models";

const estadoInicial: EstadoReproductor = {
  reproduciendo: false,
  progreso: 0,
  volumen: 75,
  silenciado: false,
  duracionTotal: 0,
  tiempoActual: 0,
  velocidad: 1,
  pantallaCompleta: false,
};

export function useReproductor() {
  const [estado, setEstado] = useState<EstadoReproductor>(estadoInicial);

  const toggleReproduccion = useCallback(
    () => setEstado((s) => ({ ...s, reproduciendo: !s.reproduciendo })),
    []
  );

  const cambiarVolumen = useCallback(
    (v: number) => setEstado((s) => ({ ...s, volumen: v, silenciado: v === 0 })),
    []
  );

  const toggleSilencio = useCallback(
    () => setEstado((s) => ({ ...s, silenciado: !s.silenciado })),
    []
  );

  const actualizarProgreso = useCallback(
    (tiempoActual: number, duracionTotal: number) =>
      setEstado((s) => ({
        ...s,
        tiempoActual,
        duracionTotal,
        progreso: duracionTotal > 0 ? (tiempoActual / duracionTotal) * 100 : 0,
      })),
    []
  );

  const cambiarVelocidad = useCallback(
    (velocidad: number) => setEstado((s) => ({ ...s, velocidad })),
    []
  );

  const togglePantallaCompleta = useCallback(
    () => setEstado((s) => ({ ...s, pantallaCompleta: !s.pantallaCompleta })),
    []
  );

  const buscarTiempo = useCallback(
    (progreso: number) =>
      setEstado((s) => ({
        ...s,
        progreso,
        tiempoActual: (progreso / 100) * s.duracionTotal,
      })),
    []
  );

  return {
    estado,
    toggleReproduccion,
    cambiarVolumen,
    toggleSilencio,
    actualizarProgreso,
    cambiarVelocidad,
    togglePantallaCompleta,
    buscarTiempo,
  };
}
