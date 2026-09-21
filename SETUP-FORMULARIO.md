# Cómo activar el formulario de la web

> **Lee esto primero.** Hasta que termines estos pasos, el formulario de
> `galador.es` **no envía los leads a tu correo**. La persona que lo rellena ve
> un mensaje de error pidiéndole que escriba a `paula@galador.es`, y el lead
> queda guardado en los registros de Vercel (al final de este documento te digo
> dónde mirar). Es aproximadamente media hora de trabajo, casi todo esperar.

Antes de esto, el formulario directamente **tiraba los datos**: enseñaba
"Solicitud recibida" y no los mandaba a ninguna parte. Eso ya está arreglado en
el código; solo falta conectar el servicio que envía el correo.

---

## Qué vamos a montar

Cuando alguien rellena el formulario, la web se lo manda a un servicio llamado
**Resend**, que se encarga de entregarte el correo. Es gratis hasta 3.000
correos al mes — vas muy sobrada.

El correo te llega con todos los datos de la candidatura y, si le das a
**Responder**, contestas directamente a la persona.

---

## Paso 1 · Crear la cuenta en Resend

1. Entra en <https://resend.com> y crea una cuenta (puedes usar tu Google de
   `paula@galador.es`).
2. No hace falta poner tarjeta.

---

## Paso 2 · Verificar el dominio galador.es

Esto le dice a Google y al resto de correos que los emails enviados desde
`galador.es` son legítimos. Sin esto, tus correos acabarían en spam.

1. Dentro de Resend, ve a **Domains → Add Domain**.
2. Escribe `galador.es` y dale a añadir.
3. Resend te enseña una tabla con **tres o cuatro registros DNS** (serán de tipo
   `TXT`, `MX` y `CNAME`). **No cierres esa pantalla.**
4. En otra pestaña, abre <https://vercel.com> → proyecto **academia-ventas** →
   pestaña **Domains** → `galador.es` → **DNS Records** (el DNS del dominio lo
   gestiona Vercel, así que se añaden ahí).
5. Copia cada registro de Resend a Vercel, uno por uno: mismo **Type**, mismo
   **Name** y mismo **Value** que te muestra Resend.

   > ⚠️ **Ojo con el correo que ya tienes.** Ya tienes un registro `MX`
   > apuntando a `smtp.google.com` para recibir en Gmail. **No lo borres ni lo
   > sustituyas.** El `MX` que pide Resend usa un nombre distinto (algo como
   > `send` o `resend`), así que los dos conviven sin problema. Si Resend te
   > pidiera cambiar el `MX` de `@`, **para y pregunta antes de tocarlo**: te
   > quedarías sin recibir correo.

6. Vuelve a Resend y pulsa **Verify**. Puede tardar entre 5 minutos y unas
   horas. Cuando el dominio aparezca en verde (`Verified`), sigue.

---

## Paso 3 · Generar la clave de API

1. En Resend, ve a **API Keys → Create API Key**.
2. Nombre: `web-galador`. Permiso: **Sending access**.
3. Copia la clave que aparece (empieza por `re_`). **Solo se ve una vez**: si la
   pierdes, borra esa y crea otra.

---

## Paso 4 · Meter la clave en Vercel

1. Vercel → proyecto **academia-ventas** → **Settings** → **Environment
   Variables**.
2. Añade estas dos, marcando los tres entornos (Production, Preview,
   Development):

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | la clave que empieza por `re_` |
   | `LEAD_FROM_EMAIL` | `Candidaturas Galador <candidaturas@galador.es>` |

   `LEAD_FROM_EMAIL` es el remitente que verás en tu bandeja. Puede ser
   cualquier dirección **@galador.es**, exista o no como buzón — lo único que
   importa es que el dominio esté verificado en el paso 2. Si no la pones, se
   usa ese mismo valor por defecto.

3. **Importante:** las variables solo se aplican al volver a desplegar. Ve a la
   pestaña **Deployments**, abre el último y pulsa **Redeploy**.

---

## Paso 5 · Comprobar que funciona

1. Entra en <https://galador.es> y rellena el formulario entero con tus datos.
2. Deberías ver la pantalla de **"Candidatura recibida"**.
3. En 1-2 minutos te llega el correo a `paula@galador.es` con el asunto
   **"Nueva candidatura: …"**. Mira también en spam la primera vez.
4. Dale a **Responder** y comprueba que el destinatario es el email que pusiste
   en el formulario, no el tuyo.

---

## Si algo no sale

**Veo un error rojo al enviar el formulario**
Significa que el correo no ha salido — y eso es intencionado: el formulario
nunca dice "recibido" si no lo ha enviado de verdad. Causas habituales:

- No has hecho **Redeploy** después de añadir las variables (lo más común).
- El dominio todavía no está `Verified` en Resend.
- La clave está mal copiada (un espacio de más al principio o al final).

**No me llega el correo pero el formulario dice "recibida"**
Mira en spam. Si tampoco está, entra en Resend → **Logs**: ahí se ve cada correo
enviado y si fue rechazado.

**Quiero recuperar un lead que se perdió**
Todos los leads se escriben en los registros antes de intentar enviarlos.
Vercel → proyecto **academia-ventas** → **Logs**, y busca `[LEAD]`. Verás la
candidatura completa aunque el correo fallara. Ten en cuenta que Vercel solo
guarda los registros recientes, así que esto sirve para reaccionar en días, no
en meses.

---

## Detalles técnicos (por si algún día lo ve un técnico)

- El envío ocurre en `app/api/lead/route.ts`, con `fetch` contra la API REST de
  Resend. No hay ninguna dependencia nueva instalada.
- El endpoint valida en servidor (nombre y email obligatorios, formato de email,
  longitudes máximas), lleva un campo trampa oculto para bots y un límite de 5
  envíos cada 10 minutos por IP.
- Si falta `RESEND_API_KEY` o Resend responde mal, se registra el lead con
  `console.error` y se devuelve un error HTTP. **Nunca se responde éxito sin
  haber enviado el correo.**
- El formulario vive en `app/components/LeadForm.tsx` y va en dos pasos: el
  primero pide solo nombre, email, web y teléfono, de modo que quien abandone a
  mitad ya ha dejado por dónde localizarle.
