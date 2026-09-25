// systemImages.ts - maps service names to stock images
export type SystemImage = { src: string; alt: string };
const map: Record<string, SystemImage> = {
  "Water Filters": { src: "/images/services/water-filters-hero.jpg", alt: "Water filter system" },
  "Water Filtration": { src: "/images/services/water-filtration-hero.jpg", alt: "Water filtration system" },
  "Water Softeners": { src: "/images/services/water-softeners-hero.jpg", alt: "Water softener system" },
  "Well Water": { src: "/images/services/well-water-hero.jpg", alt: "Well water system" },
};
export function systemImage(name: string): SystemImage | undefined {
  return map[name];
}
