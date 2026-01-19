import type { ImpactStory } from '@/types';
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);
export const AfricanReclaimersOrganisation: ImpactStory = {
    id: 's1',
    areas: ['Soweto'],
    category: 'Community',
    slug: 'african-reclaimers-organisation',
    title: 'African Reclaimers Organisation (ARO)',
    date: 'April 2024',
    tags: ['Community Engagement', 'Recycling Ecosystem'],
    excerpt: 'Engaging with the African Reclaimers Organisation (ARO), a collective representing thousands of informal waste reclaimers essential to South Africa’s recycling ecosystem.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "We had the opportunity to engage with the African Reclaimers Organisation (ARO), a collective representing thousands of informal waste reclaimers who are essential to South Africa’s recycling ecosystem. ARO members play a critical role in collecting, sorting, and redirecting recyclable materials away from landfills, contributing significantly to environmental sustainability.",
        "Through our engagement, we gained valuable insight into the reclaiming process and witnessed firsthand the impact of their work through a guided tour of their facilities. This experience deepened our understanding of how reclaimers support both waste reduction and income generation within their communities.",
        "We are inspired by ARO’s commitment to creating sustainable livelihoods while protecting the environment, and we look forward to exploring future synergies and collaborations that advance shared solutions for people and the planet."
    ]
}