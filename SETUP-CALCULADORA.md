# Cómo activar el envío de la calculadora comercial

La calculadora (`galador.es/calculadora-comercial`) manda dos correos con **Resend**:
el informe a la persona que la rellena y una copia con sus datos a `paula@galador.es`.
Hasta que hagas estos pasos, la página funciona pero **el informe no se envía**: la
persona ve un mensaje pidiéndole que te escriba, y su lead queda en **Vercel → Logs**
(busca `[CALCULADORA]`).

## 1. Cuenta en Resend
Entra en <https://resend.com> y crea la cuenta con `paula@galador.es`. Es gratis hasta
3.000 correos al mes y no pide tarjeta.

## 2. Verificar galador.es
1. En Resend: **Domains → Add Domain** → `galador.es`.
2. Resend enseña 3 o 4 registros DNS (TXT, MX, CNAME). No cierres la pantalla.
3. En <https://vercel.com> → proyecto **academia-ventas** → **Domains** → `galador.es`
   → **DNS Records**, copia cada registro con el mismo Type, Name y Value.
   > ⚠️ No toques el `MX` de `@` que apunta a `smtp.google.com`: es el que te deja recibir
   > correo en Gmail. El `MX` de Resend lleva otro nombre (`send`), así que conviven.
   > Si Resend te pidiera cambiar el de `@`, para y pregunta.
4. Vuelve a Resend y pulsa **Verify**. Tarda entre 5 minutos y unas horas.

## 3. Clave de API
En Resend: **API Keys → Create API Key**, nombre `web-galador`, permiso **Sending access**.
Copia la clave (empieza por `re_`): solo se ve una vez.

## 4. Meter la clave en Vercel
Vercel → **academia-ventas** → **Settings → Environment Variables**:

| Nombre | Valor | Entornos |
|---|---|---|
| `RESEND_API_KEY` | la clave `re_…` | Production y Preview |
| `CALCULADORA_FROM_EMAIL` (opcional) | `Paula Gallego · Galador <paula@galador.es>` | Production y Preview |

Después, **Deployments → ⋯ → Redeploy** en el último despliegue para que coja la clave.

## 5. Probar
Rellena la calculadora con tu propio correo. Te deben llegar dos correos: el informe y
el aviso del lead. Si no llega nada, mira **Vercel → Logs** y busca `[CALCULADORA]`.
