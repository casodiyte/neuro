import Image from "next/image";
import { Icon } from "./Icon";

// <ImageSlot /> — hueco de imagen especificado. Christian coloca la imagen final (real/licenciada).
// Sin `src` renderiza un placeholder neutro y limpio con la especificación visible.
// Con `src` renderiza next/image optimizado (WebP/AVIF automático, loading lazy).
export type ImageSlotProps = {
  src?: string;
  alt: string;
  /** Tema clínico de la imagen a colocar, ej: "Trazado DTC espectral" */
  theme: string;
  /** Relación de aspecto CSS, ej: "16 / 9", "4 / 3", "1 / 1" */
  aspect?: string;
  /** Tamaño recomendado para exportar, ej: "1200×675 px" */
  size?: string;
  sizes?: string;
  /** true = la imagen actual es un render AI reemplazable */
  replaceable?: boolean;
  priority?: boolean;
  className?: string;
};

export function ImageSlot({
  src,
  alt,
  theme,
  aspect = "4 / 3",
  size,
  sizes = "(max-width: 760px) 100vw, 40vw",
  replaceable,
  priority,
  className,
}: ImageSlotProps) {
  return (
    <figure
      className={`image-slot ${src ? "has-image" : "is-empty"} ${className ?? ""}`.trim()}
      style={{ aspectRatio: aspect }}
      data-theme-hint={theme}
      data-recommended-size={size}
      data-replaceable={replaceable ? "true" : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={82}
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      ) : (
        <div className="image-slot-placeholder" role="img" aria-label={`Espacio para imagen: ${theme}`}>
          <Icon name="image" size={26} />
          <span className="image-slot-theme">{theme}</span>
          {size && <span className="image-slot-spec">{aspect} · {size}</span>}
        </div>
      )}
    </figure>
  );
}
