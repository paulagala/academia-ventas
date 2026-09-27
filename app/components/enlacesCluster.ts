// Enlaces internos entre las páginas del clúster. Cada página enseña los
// demás (nunca a sí misma): así Google y los asistentes de IA entienden que
// son partes de lo mismo, y quien lee siempre tiene a dónde seguir.
export const ENLACES_CLUSTER = [
  {
    href: "/direccion-comercial-externa",
    texto: "Dirección comercial externa",
    detalle: "Qué es, qué incluye y cuándo tiene sentido en un negocio pequeño.",
  },
  {
    href: "/sistema-de-ventas",
    texto: "Cómo construir un sistema de ventas",
    detalle: "Las piezas, cómo saber si te falta alguna y en qué orden se montan.",
  },
  {
    href: "/entrenamiento-comercial",
    texto: "Entrenamiento comercial",
    detalle: "Entrenar a quien vende sobre sus propias llamadas.",
  },
  {
    href: "/consultoria-comercial",
    texto: "Qué es una consultoría comercial",
    detalle: "Qué incluye, qué no y para qué negocios tiene sentido.",
  },
  {
    href: "/ventas-por-sector",
    texto: "Por sector",
    detalle: "Cómo se vende en formación y en externalización de RRHH.",
  },
  {
    href: "/casos",
    texto: "Casos de éxito",
    detalle: "De dónde partían, qué construimos y qué cambió en sus números.",
  },
  {
    href: "/videos",
    texto: "Vídeos",
    detalle: "Objeciones, llamadas y proceso de venta, explicados en abierto.",
  },
];

export function enlacesMenos(href: string) {
  return ENLACES_CLUSTER.filter((e) => e.href !== href);
}
