import { ImpactStory } from '@/types.ts';
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);

export const MandelaDayCleanUps: ImpactStory = {
    id: 's8',
    areas: ['Bryanston', 'Soweto'],
    category: 'Project Update',
    slug: 'mandela-day-clean-ups',
    title: 'Mandela Day Clean-Ups (2024–2025) - Community Action in Honour of Madiba',
    date: 'July 2024',
    tags: ['Mandela Day', 'River Care'],
    excerpt: 'Hlanzekile marked Mandela Day through hands-on environmental action, demonstrating the power of collective effort.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "Hlanzekile River and Ocean Cleaning marked Mandela Day 2024 and 2025 through hands-on environmental action, demonstrating the power of collective effort in creating healthier communities and waterways.",
        "On Mandela Day 2024, Hlanzekile teams and volunteers carried out clean-ups across Bryanston and Soweto, turning Madiba’s call to action into measurable impact. At the Braamfontein Spruit River in Bryanston, 17 volunteers removed 131.1 kilograms of waste, helping restore the health of this urban river system.",
        "The same year, Hlanzekile hosted its first Mandela Day clean-up at the Kliprivier in Soweto, where strong community participation resulted in the collection of 223 bags of waste. This milestone was made possible through collaboration with Soweto Rotary Community Corps (SRCC), Pikitup Waste Management, Klipwas, Plastics SA, Buhle Bemvelo, and Ward 39 leadership, highlighting the importance of cross-sector partnerships in driving environmental impact.",
        "Building on this momentum, Mandela Day 2025 saw Hlanzekile return to the Kliprivier in Soweto, where volunteers once again united to remove 190 bags of waste. This follow-up initiative reinforced Hlanzekile’s commitment to long-term river care and sustained community engagement.",
        "Through these consecutive Mandela Day initiatives, Hlanzekile continues to honour Nelson Mandela’s words: “It is in your hands to create a better world for all who live in it.” By mobilising communities year after year, Hlanzekile remains dedicated to protecting South Africa’s rivers and strengthening environmental stewardship at grassroots level."
    ]
};