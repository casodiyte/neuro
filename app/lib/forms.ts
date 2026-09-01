// Envío de formularios vía Netlify Forms.
//
// Netlify es el destino de deploy del sitio (ver netlify.toml). El endpoint
// `/__forms.html` sólo lo intercepta el runtime de Netlify: en cualquier otro
// host ese POST no registra nada. Por eso NO basta con `response.ok` — un
// asset estático servido tal cual también responde 200 y produciría un
// "enviado" falso mientras el lead se pierde.
//
// Netlify responde a un envío procesado con 200/redirect y `content-type`
// HTML. Verificamos además que la respuesta no sea el propio `__forms.html`
// devuelto sin procesar, que es lo que ocurre en un host no-Netlify.

export const CONTACT_EMAIL = "neurosonologialatam@gmail.com";

const FORMS_ENDPOINT = "/__forms.html";

export class FormDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormDeliveryError";
  }
}

export async function submitNetlifyForm(formName: string, fields: Record<string, string>) {
  const payload = new URLSearchParams();
  payload.set("form-name", formName);
  payload.set("bot-field", "");
  for (const [key, value] of Object.entries(fields)) payload.set(key, value);

  let response: Response;
  try {
    response = await fetch(FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });
  } catch {
    throw new FormDeliveryError(`No hubo red al enviar "${formName}".`);
  }

  if (!response.ok) {
    throw new FormDeliveryError(`Netlify Forms respondió ${response.status} para "${formName}".`);
  }

  // El marcador sólo sobrevive si el POST NO fue interceptado por Netlify,
  // es decir, si nos devolvieron el archivo estático sin procesar.
  const body = await response.text();
  if (body.includes('data-netlify="true"')) {
    throw new FormDeliveryError(
      `El POST de "${formName}" no fue procesado por Netlify Forms: el host devolvió __forms.html sin procesar.`,
    );
  }
}
