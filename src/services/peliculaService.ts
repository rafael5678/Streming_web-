// ── Capa de Servicios ──
import { Pelicula } from "@/models";

const peliculasDB: Pelicula[] = [
  {
    id: 1,
    titulo: "Horizonte Estelar",
    sinopsis:
      "En un futuro donde la humanidad ha colonizado las estrellas, una piloto descubre una señal que podría cambiar el destino de la civilización.",
    portada: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&h=900&fit=crop",
    anio: 2024,
    duracion: "2h 18min",
    calificacion: 8.7,
    categoria: "Ciencia Ficción",
    director: "Ana Vega",
    elenco: ["Laura Díaz", "Carlos Ruiz", "Marta Sánchez"],
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    titulo: "Sombras del Pasado",
    sinopsis:
      "Un detective retirado es arrastrado a un último caso que lo obliga a enfrentar los fantasmas de su juventud.",
    portada: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=900&fit=crop",
    anio: 2023,
    duracion: "1h 54min",
    calificacion: 7.9,
    categoria: "Suspenso",
    director: "Jorge Méndez",
    elenco: ["Roberto Gómez", "Isabel Torres", "Fernando López"],
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    titulo: "El Último Vals",
    sinopsis:
      "Dos almas solitarias se encuentran en Viena y descubren que el amor puede florecer en los lugares más inesperados.",
    portada: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=900&fit=crop",
    anio: 2024,
    duracion: "1h 42min",
    calificacion: 8.2,
    categoria: "Romance",
    director: "Sofía Blanco",
    elenco: ["Andrea Molina", "Diego Herrera", "Valentina Ríos"],
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    titulo: "Furia Silenciosa",
    sinopsis:
      "Un ex-soldado debe proteger a una familia inocente cuando un cartel narcotraficante toma control de su pueblo.",
    portada: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&h=900&fit=crop",
    anio: 2024,
    duracion: "2h 05min",
    calificacion: 8.5,
    categoria: "Acción",
    director: "Miguel Ángel Castro",
    elenco: ["Andrés Palacios", "Daniela Vega", "Raúl Briones"],
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    titulo: "Risas en el Caos",
    sinopsis:
      "Tres amigos de la infancia se reúnen para una boda que se convierte en la aventura más absurda de sus vidas.",
    portada: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop",
    anio: 2023,
    duracion: "1h 38min",
    calificacion: 7.3,
    categoria: "Comedia",
    director: "Patricia Reyes",
    elenco: ["Luis García", "Carmen Maura", "Pedro Infante Jr."],
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    titulo: "La Casa del Eco",
    sinopsis:
      "Una familia se muda a una mansión victoriana donde los ecos del pasado cobran vida al caer la noche.",
    portada: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=900&fit=crop",
    anio: 2024,
    duracion: "1h 51min",
    calificacion: 7.8,
    categoria: "Terror",
    director: "Guillermo Navarro",
    elenco: ["Ana de la Reguera", "Tenoch Huerta", "Eiza González"],
    trailer: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

/** Simula latencia de red */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function obtenerPeliculas(): Promise<Pelicula[]> {
  await delay(800);
  return peliculasDB;
}

export async function obtenerPeliculaPorId(
  id: number
): Promise<Pelicula | undefined> {
  await delay(400);
  return peliculasDB.find((p) => p.id === id);
}

export async function obtenerTendencias(): Promise<Pelicula[]> {
  await delay(1500); // Simula carga pesada para demostrar Streaming SSR
  return peliculasDB.filter((p) => p.calificacion >= 8.0);
}

export async function obtenerPorCategoria(
  cat: string
): Promise<Pelicula[]> {
  await delay(600);
  return peliculasDB.filter((p) => p.categoria === cat);
}
