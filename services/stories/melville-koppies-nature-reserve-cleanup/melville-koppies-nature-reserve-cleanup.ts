import type { ImpactStory } from '@/types';
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);

export const MelvilleKoppiesNatureReserveCleanup: ImpactStory = {
    id: 's9',
    areas: ['Melville'],
    slug: 'melville-koppies-nature-reserve-cleanup',
    category: 'Community',
    title: 'Protecting Urban Heritage - Melville Koppies Nature Reserve Clean-Up',
    date: 'October 2024',
    tags: ['Heritage Protection', 'Collaborative Action'],
    excerpt: 'Expanding environmental work into the Melville Koppies Nature Reserve, a site of significant ecological and cultural value.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "Hlanzekile River and Ocean Cleaning expanded its environmental work into the Melville Koppies Nature Reserve, a protected heritage site of significant ecological and cultural value.",
        "In partnership with the Wits Aquatic Laboratory, the clean-up resulted in the removal of 471 kilograms of waste, preventing further degradation of this important natural area. Beyond the immediate environmental impact, the initiative represented a meaningful collaboration grounded in shared responsibility for conservation and research-informed action.",
        "This engagement reinforced the value of partnerships in protecting sensitive ecosystems and demonstrated how collective effort can drive lasting environmental outcomes. By combining community action with scientific insight, Hlanzekile continues to strengthen its approach to restoring and safeguarding South Africa’s natural spaces.",
        "As an African proverb reminds us: “If you want to go fast, go alone. If you want to go far, go together.”",
        "Hlanzekile remains committed to working alongside partners who share a vision for protecting, restoring, and uplifting the environments that sustain us."
    ]
}