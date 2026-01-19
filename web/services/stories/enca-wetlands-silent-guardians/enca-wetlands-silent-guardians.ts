import type { ImpactStory } from '@/types';
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);

export const EncaWetlandsSilentGuardians: ImpactStory = {
    id: 's2',
    areas: ['Bryanston'],
    category: 'News',
    slug: 'enca-wetlands-silent-guardians',
    title: 'Hlanzekile on eNCA - Wetlands as South Africa’s Silent Guardians',
    date: 'May 2024',
    tags: ['Hlanzekile in the News', 'Hlanzekile on eNCA'],
    excerpt: 'Hlanzekile River and Ocean Cleaning shared its mission on eNCA, highlighting how environmental care can help avert Day Zero.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "Hlanzekile River and Ocean Cleaning had the opportunity to share its mission and insights on eNCA, highlighting how environmental care can play a critical role in helping South Africa avert Day Zero.",
        "The discussion formed part of a broader thought leadership contribution by Floyd Nyai, Founder and Director of Hlanzekile, which unpacked the often-overlooked role of wetlands in South Africa’s water security. Wetlands act as natural water filters, flood buffers, and carbon sinks, supporting major river systems such as the Vaal and Limpopo while sustaining biodiversity and livelihoods for surrounding communities.",
        "Despite their importance, more than half of South Africa’s wetlands have been lost due to pollution, urban expansion, and weak environmental enforcement. This degradation directly threatens rivers like the Braamfontein Spruit, where Hlanzekile operates and where declining water quality reflects the broader national water crisis.",
        "Hlanzekile continues to advocate for stronger wetland protection, responsible development, and active public participation in environmental care. Through clean-up initiatives, restoration efforts, and environmental education, we are working to safeguard water sources and strengthen community resilience.",
        "By amplifying these conversations through national platforms and on-the-ground action, Hlanzekile remains committed to protecting South Africa’s waterways and securing a sustainable, water-resilient future for people and the planet."
    ]
};