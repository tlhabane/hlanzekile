import type { ImpactStory } from '@/types';
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);

export const ArdGermanRadioTelevision: ImpactStory = {
    id: 's3',
    areas: ['Soweto'],
    category: 'News',
    slug: 'ard-german-radio-television',
    title: 'Hlanzekile Featured on ARD German Radio and Television',
    date: 'June 2024',
    tags: ['Hlanzekile in the News', 'International Media Spotlight'],
    excerpt: 'Hlanzekile River and Ocean Cleaning was featured on ARD German Radio and Television for the second consecutive year.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "Hlanzekile River and Ocean Cleaning was featured on ARD German Radio and Television for the second consecutive year, reflecting growing international interest in our work and its impact. The interview explored Hlanzekile’s mission, the progress achieved to date, and our long-term vision for protecting South Africa’s waterways.",
        "This continued engagement with a leading international broadcaster highlights the global relevance of local environmental action and underscores the importance of community-driven solutions to water pollution and river degradation.",
        "As Hlanzekile’s work gains recognition beyond South Africa’s borders, we remain committed to scaling our impact, strengthening partnerships, and contributing to global conversations around sustainability, climate resilience, and water security."
    ]
}