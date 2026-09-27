// fonts.ts - MGoBlue / Pure Home 365 (Asheville)
// DM Serif Display for display headings (high-contrast editorial serif), Plus Jakarta Sans for body
// Critique round 4: switched from geometric sans to serif display face for premium brand feel

import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";

export const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-loaded",
  display: "swap",
});
