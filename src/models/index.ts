// ── Capa de Modelos / Entidades ──

export interface Pelicula {
  id: number;
  titulo: string;
  sinopsis: string;
  portada: string;
  anio: number;
  duracion: string;
  calificacion: number;
  categoria: Categoria;
  director: string;
  elenco: string[];
  trailer: string;
}

export type Categoria =
  | "Acción"
  | "Comedia"
  | "Drama"
  | "Ciencia Ficción"
  | "Terror"
  | "Romance"
  | "Animación"
  | "Suspenso";

export interface EstadoReproductor {
  reproduciendo: boolean;
  progreso: number;
  volumen: number;
  silenciado: boolean;
  duracionTotal: number;
  tiempoActual: number;
  velocidad: number;
  pantallaCompleta: boolean;
}
