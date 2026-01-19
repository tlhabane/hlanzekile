import { ImpactStory } from '@/types.ts';
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);

export const NoDumpingSignKliprivier: ImpactStory = {
    id: 's6',
    areas: ['Soweto'],
    category: 'Community',
    slug: 'no-dumping-sign-kliprivier',
    title: 'Taking a Stand Against Illegal Dumping: “No Dumping” Sign Installed',
    date: 'August 2024',
    tags: ['Taking a Stand', 'Environmental Awareness'],
    excerpt: 'Positioned along the river, the sign serves as a visible reminder that illegal dumping harms water systems.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "Hlanzekile River and Ocean Cleaning strengthened its commitment to protecting the Kliprivier through the installation of a “No Dumping” sign, reinforcing a clear message of environmental responsibility within the local community.",
        "Positioned along the river, the sign serves as a visible reminder that illegal dumping harms water systems, ecosystems, and community health. It also represents an important step in encouraging accountability and long-term behavioural change in areas affected by persistent pollution.",
        "By introducing clear environmental signage at key river sites, Hlanzekile aims to support ongoing clean-up efforts and help prevent waste from re-entering the river system. This initiative forms part of Hlanzekile’s broader strategy to combine action, awareness, and community-driven solutions to protect South Africa’s waterways.",
        "Through practical interventions like this, Hlanzekile continues to work towards cleaner rivers, healthier communities, and a more sustainable future."
    ]
}