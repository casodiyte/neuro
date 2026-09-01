# Neurosonología CDMX 2026

Sitio del **Programa Integral de Mentoría y Certificación en Neurosonología y
Hemodinamia Cerebral por Doppler Transcraneal (DTC)**, dirigido por la Dra. Silvia
Viviana Cocorullo. Cohorte de 8 médicos · CDMX · 21—25 de octubre de 2026.

Producción: <https://neurohce.netlify.app>

## Stack

- **Next.js 16** (App Router, React 19) con **vinext** como runtime de desarrollo
- **Tailwind CSS 4** + una hoja de diseño propia en `app/globals.css`
- **three.js** para el campo de partículas de fondo (`NeuralCanvas`)
- **Netlify** como destino de deploy (`netlify.toml`, `@netlify/plugin-nextjs`)

Requiere Node.js `>=22.13.0`.

## Comandos

```bash
npm install
npm run dev      # desarrollo local (vinext) en :3000
npm run build    # verifica el build de vinext
npm test         # build + tests de HTML renderizado
npm run lint     # ESLint (incluye jsx-a11y)
```

`npm run build:netlify` es el comando que corre Netlify (`next build`).

## Estructura

```
app/
  data/program.ts     Contenido canónico del programa (módulos, jornadas,
                      certificación, directora). Única fuente de verdad.
  components/         Componentes de UI y de movimiento
  lib/                Helpers compartidos (envío de formularios, URL del sitio)
  <ruta>/page.tsx     Una carpeta por ruta pública
  sitemap.ts          Genera /sitemap.xml a partir de journeyNav
  robots.ts           Genera /robots.txt
  not-found.tsx       Página 404
assets/neurosono-src/ PNG maestros de las ilustraciones (NO se publican)
public/images/        WebP servidos al navegador
scripts/              Preparación de imágenes
tests/                Tests de humo sobre el HTML renderizado
```

### Contenido

Todo el texto del programa vive en [`app/data/program.ts`](app/data/program.ts).
Para actualizar fechas, módulos, precios o credenciales se edita ese archivo y
las páginas se actualizan solas.

### Imágenes

Los PNG maestros están en `assets/neurosono-src/` y **no se sirven**: pesan ~15 MB
y sólo existen para regenerar los WebP. Para reprocesarlos:

```bash
python scripts/prepare_neurosono_assets.py
```

El script lee cada PNG maestro, lo recorta al tamaño objetivo y emite el `.webp`
correspondiente en `public/images/neurosono/`. `next/image` se encarga de la
negociación de formato y de los tamaños responsivos.

## Formularios

Los dos formularios (solicitud de inscripción y aviso de curso próximo) usan
**Netlify Forms**. Los campos se declaran en [`public/__forms.html`](public/__forms.html)
y el envío pasa por [`app/lib/forms.ts`](app/lib/forms.ts).

> **Importante:** `/__forms.html` sólo lo intercepta el runtime de Netlify. En
> cualquier otro host el POST no registra nada, por eso `submitNetlifyForm`
> verifica que la respuesta haya sido procesada de verdad en lugar de confiar en
> `response.ok`. Si se migra el sitio fuera de Netlify hay que reemplazar ese
> helper por un endpoint propio.

## Variables de entorno

| Variable | Uso | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónica para `metadataBase`, `sitemap.xml` y `robots.txt` | `https://neurohce.netlify.app` |

## Movimiento y selectores

`app/components/MotionOrchestrator.tsx` aplica el reveal-on-scroll y el hover 3D
por **selector CSS**, no por prop. Sus tres listas (`CARD_SELECTOR`,
`REVEAL_SELECTOR`, `TEXT_SELECTOR`) tienen que seguir al markup real: si se
renombra una clase en un componente y no se actualiza esa lista, la sección
pierde la animación **en silencio**, sin error ni aviso. `tests/rendered-html.test.mjs`
comprueba que no reaparezcan selectores muertos conocidos.

## Accesibilidad y movimiento

El sitio respeta `prefers-reduced-motion` en tres capas: el shader del canvas
(`uMotion: 0`), el orquestador de scroll (`MotionOrchestrator`) y las
transiciones CSS. El menú y el modal comparten `useDialog`, que aporta focus
trap, cierre con `Escape`, bloqueo de scroll y restauración de foco.
