import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SueloClaro",
    short_name: "SueloClaro",
    description:
      "Fichas de robots aspiradores Roborock, Dreame y Xiaomi de gama media.",
    start_url: "/",
    display: "browser",
    background_color: "#fafaf9",
    theme_color: "#0f766e",
    lang: "es-ES",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
