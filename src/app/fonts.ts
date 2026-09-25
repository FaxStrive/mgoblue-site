// fonts.ts - MGoBlue / Pure Home 365
// Bricolage Grotesque for display headings, Plus Jakarta Sans for body
// Per non-negotiable design rules: Bricolage Grotesque (font-heading) + Plus Jakarta Sans (font-body)

import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-loaded",
  display: "swap",
});
