# Vídeos de YouTube → artículos en la web

> **Lee esto primero.** El código ya está, pero no hace nada hasta que le des
> tres permisos: leer los subtítulos de tu canal (Google), escribir con tu
> suscripción de Claude y abrir PRs en el repositorio (GitHub). Son unos 30 minutos, una
> sola vez.

## Cómo funciona

Cada mañana a las 8:00 (7:00 en invierno) un robot de GitHub mira tu canal:

1. Si hay un vídeo nuevo público de más de 3 minutos (los Shorts no), descarga
   sus subtítulos. Si YouTube todavía no los ha generado, lo reintenta al día
   siguiente.
2. Claude escribe el artículo a partir de lo que dices en el vídeo, con tu voz
   y tus reencuadres (`scripts/videos/guia-editorial.md`), pensado para una
   búsqueda concreta en Google y con 3–6 enlaces a tus otros artículos y a las
   páginas de servicio.
3. Abre un **PR** en GitHub: te llega un correo, Vercel prepara una vista
   previa y tú decides:
   - **Merge** → publicado en `/videos/{slug}`, en la home, en `/videos` y en el sitemap.
   - **Close** → descartado; no se vuelve a proponer.

Los enlaces entre artículos van por dos vías:
- **Dentro del texto:** los pone Claude al escribir, y solo a páginas que
  existen. Si se inventa una ruta, el robot la quita y te lo dice en el PR.
- **«Sigue leyendo» al final:** se calcula solo por tema y etiquetas. Cuando
  publicas un artículo nuevo, los antiguos del mismo tema empiezan a enlazarlo
  sin tocarlos.

**Coste:** nada aparte de lo que ya pagas. Claude escribe con tu suscripción
(cuenta dentro de tu uso normal, como si le pidieras un artículo en el chat), y
la API de YouTube y GitHub son gratis. Si Google Cloud te ofrece «prueba
gratuita» o te pide tarjeta, no hace falta: ciérralo.

---

## Paso 1 · Google: permiso para leer tus subtítulos (≈15 min)

1. Entra en <https://console.cloud.google.com> con **la cuenta de Google que es
   dueña del canal** y crea un proyecto (arriba, selector de proyectos →
   *Proyecto nuevo* → nombre `galador-web`).
2. Menú → *APIs y servicios* → *Biblioteca* → busca **YouTube Data API v3** →
   *Habilitar*.
3. Menú → *APIs y servicios* → *Pantalla de consentimiento de OAuth*
   (a veces se llama *Google Auth Platform*):
   - Tipo de usuario: **Externo**. Nombre de la app: `Galador web`. Tu correo
     en los campos de contacto.
   - Al terminar, en *Público* pulsa **Publicar aplicación** para pasarla a
     *En producción*. **Este paso es importante:** si la dejas en *Prueba*, el
     permiso caduca a los 7 días y el robot deja de funcionar. No hace falta
     que Google la verifique, porque solo la vas a usar tú.
4. Menú → *APIs y servicios* → *Credenciales* → *Crear credenciales* →
   *ID de cliente de OAuth* → tipo **App de escritorio** → *Crear*. Copia el
   **ID de cliente** y el **Secreto de cliente**.
5. Abre la app **Terminal** del Mac (⌘ + espacio, escribe «Terminal», Enter),
   pega esto y pulsa Enter:

   ```
   cd ~/academia-ventas && node scripts/videos/autorizar-youtube.mjs
   ```

   Te pedirá el ID y el secreto de cliente: pégalos. Se abre Google. Entra con
   la cuenta del canal (si tienes varios canales, elige el de ventas). Saldrá el
   aviso *«Google no ha verificado esta aplicación»*: es tu propia app, así que
   pulsa *Configuración avanzada* → *Ir a Galador web* → *Continuar*. La
   terminal te imprime un texto largo: es el **YOUTUBE_REFRESH_TOKEN**.
   Hazlo en la app Terminal y no en el chat de Claude Code, para que tus claves
   no queden en la conversación.

## Paso 2 · Claude: permiso para usar tu suscripción (≈2 min)

En la app **Terminal**, pega esto y pulsa Enter:

```
claude setup-token
```

Se abre el navegador: acepta con tu cuenta de Claude. La terminal imprime un
texto largo: es el **CLAUDE_CODE_OAUTH_TOKEN**. Dura **un año**: GitHub te
avisará por correo cuando el robot empiece a fallar, y basta con repetir este
paso y sustituir el secreto.

## Paso 3 · GitHub: guardar las claves y dar permiso (≈5 min)

En <https://github.com/paulagala/academia-ventas>:

1. *Settings* → *Secrets and variables* → *Actions* → *New repository secret*.
   Crea estos cuatro, con el nombre exacto:

   | Nombre | Valor |
   |---|---|
   | `GOOGLE_CLIENT_ID` | el ID de cliente del paso 1 |
   | `GOOGLE_CLIENT_SECRET` | el secreto de cliente del paso 1 |
   | `YOUTUBE_REFRESH_TOKEN` | lo que imprimió la terminal en el paso 1 |
   | `CLAUDE_CODE_OAUTH_TOKEN` | lo que imprimió la terminal en el paso 2 |

2. *Settings* → *Actions* → *General* → abajo del todo, marca **Allow GitHub
   Actions to create and approve pull requests** → *Save*. Sin esto el robot
   escribe el artículo pero no puede abrir el PR.

## Paso 4 · Probarlo con el vídeo de objeciones

El botón para lanzar el robot a mano solo aparece cuando el robot ya está en
`main` (la versión publicada). Así que primero hay que aprobar el PR que añade
el robot. Después, el vídeo que ya está en la web, que todavía no tiene
artículo, es la prueba perfecta:

1. Pestaña *Actions* → *Vídeos de YouTube → artículos* → *Run workflow*.
2. En el campo del id pon `1Mb5B6FHrW4` → *Run workflow*.
3. En 2–3 minutos tendrás un PR «Artículo regenerado: Objeciones de ventas…».
   Léelo en la vista previa de Vercel antes de aprobarlo.

A partir de ahí no tienes que hacer nada: sube tus vídeos como siempre y
revisa los PRs que te lleguen.

---

## Preguntas

**¿Y los vídeos antiguos del canal?** El robot solo coge vídeos publicados
desde el 13/09/2026 para no llenarte de PRs. Para uno anterior, usa *Run
workflow* con su id, como en el paso 4.

**Quiero cambiar cómo escribe.** Todo el criterio está en
`scripts/videos/guia-editorial.md`, en castellano. Edítalo o pídeselo a
Claude Code; afecta a los artículos que se escriban a partir de entonces.

**Quiero regenerar un artículo ya publicado.** *Run workflow* con su id. La
URL se mantiene.

**Un PR tiene conflictos.** No debería: cada vez que apruebas uno, el robot
pone al día los demás. Si pasa, ciérralo y vuelve a lanzarlo con *Run
workflow* y el id.

**Un día no llega el artículo de un vídeo.** Si ese día habías agotado el uso
de tu suscripción, el robot no puede escribir. No pasa nada: lo reintenta solo
a la mañana siguiente.

**El robot ha fallado.** En *Actions* verás la ejecución en rojo, y GitHub te
avisa por correo. Si el error dice `invalid_grant`, el permiso de Google ha
caducado (casi siempre porque la app se quedó en modo *Prueba*): repite el
paso 1.3 (publicar) y el 1.5.

**Pausa larga.** GitHub desactiva las tareas programadas de un repositorio que
lleva 60 días sin cambios, y te avisa por correo antes. Para reactivarla:
pestaña *Actions* → *Enable workflow*.
