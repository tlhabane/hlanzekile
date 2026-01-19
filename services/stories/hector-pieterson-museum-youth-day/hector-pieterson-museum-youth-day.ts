import { ImpactStory } from "@/types.ts";
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);

export const HectorPietersonMuseumYouthDay: ImpactStory = {
    id: 's5',
    areas: ['Soweto'],
    category: 'Youth',
    slug: 'hector-pieterson-museum-youth-day',
    title: 'Empowering Young Changemakers at the Hector Pieterson Museum',
    date: 'June 2025',
    tags: ['Youth Day Impact', 'Community Support'],
    excerpt: 'Commemorating Youth Day at the Hector Pieterson Museum, a powerful symbol of youth-led change.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "Hlanzekile River and Ocean Cleaning commemorated Youth Day in both 2024 and 2025 at the Hector Pieterson Museum, a site of deep historical significance and a powerful symbol of youth-led change in South Africa.",
        "On Youth Day 2024, Hlanzekile supported the local community through a practical contribution, donating a leaf blower to assist with ongoing environmental maintenance efforts around the precinct.",
        "Building on this engagement, Youth Day 2025 saw the Hlanzekile team return to the museum to engage directly with the public. The team showcased its upcycling process, shared educational materials, introduced new merchandise, and connected with learners, families, and visitors—reinforcing the role of young people in driving environmental action.",
        "Through these consecutive Youth Day initiatives, Hlanzekile continues to honour the legacy of 16 June by empowering youth to take ownership of environmental stewardship and become leaders in building cleaner, more sustainable communities."
    ]
};