import type { Metadata } from "next";
import SeoLanding from "../components/SeoLanding";

// La consulta menos disputada de las tres y la mejor diferenciada del resto
// del sitio. El sufijo « | Galador» lo añade el template del layout.
export const metadata: Metadata = {
  title: "Entrenamiento comercial para equipos de ventas",
  description:
    "Entrenamiento comercial sobre llamadas reales grabadas y anotadas: indagación, objeciones, estructura y cierre, para que el criterio sea de todo el equipo.",
  alternates: { canonical: "/entrenamiento-comercial" },
};

export default function Page() {
  return (
    <SeoLanding
      kicker="Entrenamiento comercial"
      h1="Entrenamiento comercial sobre las llamadas reales de tu equipo."
      intro="Tu equipo ya sabe vender: el problema es que cada uno vende distinto y solo tú sabes por qué unas llamadas salen bien. El entrenamiento comercial trabaja sobre sus conversaciones grabadas, una a una y anotadas contra un banco de criterios, hasta que ese criterio deja de ser tuyo y pasa a ser del equipo."
      destacados={[
        "Se entrena con vuestras llamadas reales, no con juegos de rol inventados.",
        "Cada llamada vuelve anotada por escrito: qué se hizo bien, qué señal se pasó por alto y qué corregir.",
        "Cada sesión sale con una cosa concreta que cambiar en la siguiente conversación.",
        "Funciona igual si el equipo son tres comerciales o si de momento vendes tú.",
      ]}
      bloques={[
        {
          h2: "Por qué darles un guion no cambia nada",
          parrafos: [
            "Casi todos los equipos que entrenamos ya tenían un documento con lo que había que decir. Y seguían cerrando distinto entre ellos. La razón es que un guion resuelve qué decir, pero no cuándo callarse, qué repreguntar cuando la respuesta es vaga o cómo reaccionar cuando el cliente dice algo que no estaba previsto.",
            "Eso no se aprende leyendo. Se aprende escuchando la llamada que uno mismo hizo ayer y viendo, con alguien al lado, el momento exacto en el que la conversación se torció.",
          ],
        },
        {
          h2: "Cómo funciona la revisión de llamadas",
          parrafos: [
            "Es el núcleo del entrenamiento y lo que lo separa de una formación: aquí no se opina sobre cómo vendéis, se revisa lo que pasó.",
          ],
          lista: [
            "Mandáis las llamadas grabadas, sin seleccionar solo las que salieron bien.",
            "Vuelven anotadas contra un banco de criterios propio, fase por fase: apertura, encuadre, indagación, presentación, objeciones y cierre.",
            "Cada anotación dice qué pasó, en qué momento exacto y qué habría cambiado el desenlace.",
            "En la sesión se trabajan las dos o tres que más enseñan, y se sale con un compromiso concreto.",
            "La grabación de la semana siguiente es la que dice si ha funcionado: no hace falta esperar al final del trimestre.",
          ],
        },
        {
          h2: "Qué se entrena",
          lista: [
            "Indagación: preguntar hasta entender el problema real del cliente, en lugar de quedarse en la primera respuesta y empezar a presentar.",
            "Objeciones: qué hacer con «me lo pienso», «es caro» o «tengo que consultarlo», sin presionar y sin ponerse a la defensiva.",
            "Estructura de la llamada: un orden que da control de la conversación sin que suene recitado.",
            "Comunicación del precio: cuándo se dice, cómo se dice y qué tiene que haber pasado antes para que no sea el único criterio.",
            "Seguimiento: qué mandar después y con qué motivo, para que la segunda conversación no empiece de cero.",
          ],
        },
        {
          h2: "Cuándo hace falta",
          parrafos: [
            "Cuando estás incorporando comerciales y el nivel baja con cada persona nueva. Cuando llevas tú todas las oportunidades importantes porque no te fías de cómo se van a llevar. O cuando entran buenas oportunidades, se atienden, y aun así no se cierran.",
            "Las sesiones son periódicas y el trabajo entre ellas es el que ya se hace: sus propias llamadas. Nadie deja de vender durante el entrenamiento.",
            "Si lo que falta es el proceso —no hay etapas, ni criterios, ni seguimiento definido—, entrenar antes de construirlo es ponerle horas de práctica a algo que todavía no existe. En ese caso se empieza por el sistema.",
          ],
        },
      ]}
      faq={[
        {
          p: "Mi equipo tiene experiencia, ¿le va a servir?",
          r: "Suele servirle más que a uno novato. Un comercial con experiencia ya tiene criterio propio; lo que normalmente falta es que ese criterio sea el mismo en todo el equipo y que se pueda explicar. Se entrena sobre lo que ya hacen bien, no se les enseña a vender desde cero.",
        },
        {
          p: "¿No van a acabar sonando todos igual?",
          r: "No, porque no se entrenan palabras sino decisiones: qué preguntar, cuándo avanzar, qué hacer ante una duda. Cada uno lo dice a su manera. Lo que se iguala es el criterio, no el tono.",
        },
        {
          p: "¿Se puede entrenar sin construir antes el sistema?",
          r: "Se puede, y a veces tiene sentido cuando el proceso ya está razonablemente definido. Si no lo está, el entrenamiento se queda en mejorar conversaciones sueltas: se nota, pero no se sostiene. Se dice antes de empezar, no a mitad.",
        },
        {
          p: "¿Y si todavía no grabamos las llamadas?",
          r: "Se empieza por ahí, y es lo primero que se monta. Sin grabaciones el entrenamiento vuelve a ser opinión sobre lo que cada uno recuerda de su propia llamada, que casi nunca coincide con lo que pasó. Avisar al cliente de que se graba no espanta a nadie: forma parte de la conversación normal.",
        },
        {
          p: "¿Al equipo no le incomoda que le revisen las llamadas?",
          r: "Las primeras semanas, a veces. Se pasa en cuanto ven que las anotaciones señalan momentos concretos y no personas, y que la primera que se revisa a fondo es una que salió bien. Si se usa como herramienta de control en vez de como entrenamiento, no funciona: eso conviene tenerlo claro antes de empezar.",
        },
      ]}
      cierre="¿Escuchamos juntos un par de llamadas de tu equipo?"
    />
  );
}
