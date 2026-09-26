"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Calendario de reservas de Cal.com incrustado en la página.
//
// Las preguntas de cualificación (qué vende, precio, quién vende, síntomas,
// por qué ahora…) viven en la propia cita de Cal.com, no aquí: se editan en
// cal.com → Event Types → Diagnóstico comercial → Advanced. Las respuestas
// llegan dentro de la cita de Google Calendar.

export const CAL_LINK = "paula-gallego-lazaro-hhzchd/diagnostico-comercial";
const NAMESPACE = "diagnostico";

export default function CalReserva() {
  useEffect(() => {
    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      cal("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": "#791E2A" },
          dark: { "cal-brand": "#D98C97" },
        },
      });
    });
  }, []);

  return (
    <div>
      <div className="min-h-[560px]">
        <Cal
          namespace={NAMESPACE}
          calLink={CAL_LINK}
          config={{ layout: "month_view", theme: "light" }}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        />
      </div>
      {/* Por si un bloqueador de anuncios o una red corporativa impiden que
          cargue el calendario incrustado. */}
      <p className="text-sm text-[#5A4F48] text-center mt-4">
        ¿No ves el calendario?{" "}
        <a
          href={`https://cal.com/${CAL_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#791E2A] font-semibold underline underline-offset-2"
        >
          Reserva aquí
        </a>
        .
      </p>
    </div>
  );
}
