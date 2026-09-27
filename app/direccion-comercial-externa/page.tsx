import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";
import { enlacesMenos } from "../components/enlacesCluster";

// Página del término con el que se posiciona Galador. Quien busca «director
// comercial externo» o «dirección comercial externa» ya sabe que le falta
// alguien que dirija la venta: aquí se le explica qué es y cuándo compensa.
export const metadata: Metadata = {
  title: "Dirección comercial externa: qué es y cuándo la necesitas",
  description:
    "Qué hace una dirección comercial externa en un negocio pequeño: encontrar dónde se escapan las ventas, ajustar oferta y precio, ordenar el proceso y entrenar a quien vende. Con casos reales.",
  alternates: { canonical: "/direccion-comercial-externa" },
};

export default function Page() {
  return (
    <SeoLanding
      ruta="/direccion-comercial-externa"
      kicker="Dirección comercial externa"
      h1="Alguien que dirija tus ventas, sin tener que contratar a un director comercial."
      intro="Una dirección comercial externa es una persona de fuera que hace el trabajo de un director comercial en tu negocio: mira los números, decide qué hay que cambiar para vender mejor y entrena a quien vende. Tiene sentido cuando ya vendes, pero las ventas dependen demasiado de ti, del día o de la suerte, y todavía no puedes pagar a alguien a tiempo completo."
      destacados={[
        "Empieza por los números y las llamadas reales, no por una opinión.",
        "Toca lo que de verdad frena la venta: oferta, precio, proceso o la llamada en sí.",
        "Entrena a quien vende hasta que lo hace igual de bien sin ayuda.",
        "Cuesta una fracción de lo que cuesta un director comercial en plantilla.",
      ]}
      bloques={[
        {
          h2: "Qué hace una dirección comercial externa",
          lista: [
            "Encontrar dónde se escapan las ventas: en qué paso exacto del embudo se pierde cada oportunidad y por qué.",
            "Revisar la oferta y el precio: si el cliente entiende lo que compra y por qué vale lo que cuesta.",
            "Decidir cómo diferenciarte para no competir solo por precio.",
            "Escribir cómo se vende en tu negocio: a quién se atiende, qué se pregunta, cómo se sigue a quien no decide en el momento.",
            "Entrenar a quien vende, tú o tu equipo, revisando sus llamadas reales cada semana.",
            "Dejar un sistema para formar a cada persona nueva que entre en el equipo.",
          ],
        },
        {
          h2: "Cuándo la necesitas",
          parrafos: [
            "Casi nunca se busca porque sí. Se busca cuando aparece alguna de estas situaciones:",
          ],
          lista: [
            "Vendes tú, has llegado a un techo y no sabes qué cambiar para pasar de ahí.",
            "Unos meses cierras y otros no, y nadie sabe explicar por qué.",
            "Te comparan con otros y acabas bajando el precio.",
            "Has contratado a alguien para vender y no cierra lo que cerrabas tú.",
            "El equipo crece y cada persona vende a su manera.",
          ],
        },
        {
          h2: "En qué se diferencia de un curso de ventas o de una agencia",
          parrafos: [
            "Un curso de ventas te da técnicas y se acaba. Una dirección comercial se queda: mira tus números, toma decisiones contigo y comprueba en las llamadas de la semana siguiente si el cambio ha funcionado.",
            "Una agencia de marketing trabaja para que entren más leads. Una dirección comercial trabaja para que los que ya entran se conviertan en clientes. Si tu problema es que no entra nadie, lo que necesitas es marketing, y te lo diremos en el diagnóstico.",
          ],
        },
        {
          h2: "Cómo empieza",
          parrafos: [
            "Con un diagnóstico: los números, el embudo, la oferta y unas cuantas llamadas grabadas. En dos semanas se sabe dónde se escapan las ventas. Después se decide y se construye lo que falta, y se entrena sobre llamadas reales hasta que funciona. En unos tres meses queda en marcha. Hay negocios que después prefieren seguir con alguien que dirija la parte comercial cada mes, y otros que siguen solos con el sistema.",
          ],
        },
      ]}
      caso={{
        etiqueta: "Caso real · ISYFU, formación",
        titulo: "De 60.000 € a unos 250.000 € al año, sin techo comercial.",
        cifras: [
          { valor: "60.000 €", texto: "Facturación anual al empezar" },
          { valor: "250.000 €", texto: "Facturación anual hoy" },
          { valor: "x4", texto: "En dos años" },
          { valor: "2 años", texto: "Dirigiendo la parte comercial" },
        ],
        parrafos: [
          "ISYFU es una empresa de formación. Sabía atender bien a sus clientes, pero no dirigir la parte comercial, y competía por precio como el resto de su sector.",
          "En dos años se trabajó la oferta, el precio, cómo diferenciarse más allá del precio y un sistema para formar tanto al equipo interno como a quien entra nuevo. La facturación pasó de unos 60.000 € a unos 250.000 € al año.",
          "«Nos ha permitido quitarle el techo que teníamos, que era de dirección comercial», resume su CEO, Samuel Acera.",
        ],
        enlace: { href: "/casos/isyfu", texto: "Leer el caso completo de ISYFU" },
      }}
      faq={[
        {
          p: "¿Cuánto cuesta una dirección comercial externa?",
          r: "Depende del tamaño del equipo y de lo que haya que construir, y por eso se cierra una cifra en el diagnóstico. Como referencia, es mucho menos de lo que cuesta un director comercial en plantilla, porque pagas por el trabajo que hace falta y no por una jornada completa.",
        },
        {
          p: "¿Sirve si no tengo equipo comercial y vendo yo?",
          r: "Sí. Es el caso de muchos negocios pequeños: la fundadora o el fundador vende y ha tocado techo. Se trabaja sobre tus propias llamadas, y cuando contrates, esa persona tendrá un sistema con el que empezar.",
        },
        {
          p: "¿Os encargáis de conseguir clientes?",
          r: "No. No hacemos marketing ni llamamos a tus leads. Trabajamos desde que existe una oportunidad hasta que se convierte en cliente, y todo lo que influye en eso: oferta, precio, proceso y la llamada.",
        },
        {
          p: "¿En qué se diferencia de un director comercial fraccional?",
          r: "Es lo mismo con otro nombre: alguien que dirige tus ventas unas horas o días al mes en vez de a tiempo completo. Lo que cambia de una persona a otra es cómo trabaja. Aquí todo parte de tus números y de tus llamadas reales.",
        },
      ]}
      relacionados={enlacesMenos("/direccion-comercial-externa")}
      cierre="¿Quieres saber dónde se te están escapando las ventas?"
    />
  );
}
