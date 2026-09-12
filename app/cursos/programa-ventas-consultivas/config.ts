export const PROGRAM_CONFIG = {
  name: "Método Consultivo",
  tagline: "Deja de perseguir clientes. Haz que te elijan.",
  price: 997,
  currency: "€",

  bookingLink: "#reservar",
  bookingCta: "Reservar sesión con Paula",
  bookingSubtext: "Sesión 1:1 gratuita · 30 min · Sin compromiso",

  offer: {
    enabled: true,
    name: "Oferta de lanzamiento",
    discountPrice: 497,
    deadline: "2026-07-31T23:59:59",
  },

  banner: {
    enabled: true,
    text: "Oferta de lanzamiento: 497€ en lugar de 997€",
    ctaText: "Reserva tu sesión",
    style: "urgency" as "urgency" | "promo" | "info",
  },

  scarcity: {
    enabled: true,
    spotsLeft: 7,
    totalSpots: 30,
  },

  guarantee: {
    days: 14,
    text: "Si completas los 3 primeros módulos y no ves valor, te devuelvo el dinero.",
  },

  paymentOptions: {
    single: true,
    installments: {
      enabled: true,
      count: 3,
      amount: 179,
    },
  },
};
