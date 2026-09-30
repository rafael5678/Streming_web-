// ── VISTA 4: SSG (Static Site Generation) ──
// Página estática precompilada en build time
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — CineStream",
  description: "Términos y condiciones de uso de la plataforma CineStream.",
};

// force-static garantiza SSG (generación estática en build)
export const dynamic = "force-static";

export default function TerminosPage() {
  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-extrabold">
          📜 Términos y Condiciones
        </h1>
        <p className="mb-8 text-sm text-cine-muted">
          SSG — Página precompilada estáticamente en build time ·{" "}
          <code className="text-cine-accent-light">dynamic = &quot;force-static&quot;</code>
        </p>

        <div className="space-y-8 text-cine-muted leading-relaxed">
          {secciones.map((sec, i) => (
            <section
              key={i}
              className="rounded-xl border border-cine-border bg-cine-card p-6"
            >
              <h2 className="mb-3 text-lg font-bold text-cine-text">
                {sec.titulo}
              </h2>
              <p>{sec.contenido}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-cine-muted">
          Última actualización: Septiembre 2024
        </p>
      </div>
    </div>
  );
}

const secciones = [
  {
    titulo: "1. Aceptación de los Términos",
    contenido:
      "Al acceder y utilizar CineStream, usted acepta estar vinculado por estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.",
  },
  {
    titulo: "2. Descripción del Servicio",
    contenido:
      "CineStream es una plataforma de streaming de video que permite a los usuarios acceder a un catálogo de películas y contenido audiovisual bajo demanda. El servicio está disponible a través de navegadores web compatibles.",
  },
  {
    titulo: "3. Cuentas de Usuario",
    contenido:
      "Para acceder a ciertas funciones del servicio, es posible que deba crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, y acepta la responsabilidad de todas las actividades que ocurran bajo su cuenta.",
  },
  {
    titulo: "4. Uso Aceptable",
    contenido:
      "El usuario se compromete a utilizar el servicio de manera legal y ética. Queda prohibida la reproducción, distribución o modificación no autorizada del contenido disponible en la plataforma.",
  },
  {
    titulo: "5. Propiedad Intelectual",
    contenido:
      "Todo el contenido disponible en CineStream, incluyendo pero no limitado a películas, imágenes, logotipos y diseños, está protegido por las leyes de propiedad intelectual y pertenece a sus respectivos titulares de derechos.",
  },
  {
    titulo: "6. Limitación de Responsabilidad",
    contenido:
      "CineStream no será responsable de daños indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso del servicio. El servicio se proporciona 'tal como está' sin garantías de ningún tipo.",
  },
  {
    titulo: "7. Modificaciones",
    contenido:
      "CineStream se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma. El uso continuado del servicio constituye la aceptación de los términos modificados.",
  },
];
