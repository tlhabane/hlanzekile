import type { ImpactStory } from '@/types';
import { Media } from './media';

const MAIN_MEDIA = Media[0];
const GALLERY_MEDIA = Media.slice(1, Media.length);

export const StationeryCompetition2024: ImpactStory = {
    id: 's4',
    areas: ['Soweto'],
    category: 'Youth',
    slug: 'stationery-competition-2024',
    title: 'Hlanzekile Stationery Competition (2024–2025)',
    date: 'December 2024/5',
    tags: ['Transforming Waste', 'Youth Impact'],
    excerpt: 'A youth-focused clean-up initiative in Mzimhlophe, Soweto, encouraging children to take an active role in protecting their environment.',
    mainMedia: MAIN_MEDIA,
    gallery: GALLERY_MEDIA,
    content: [
        "During the December holiday periods of 2024 and 2025, Hlanzekile River and Ocean Cleaning ran a youth-focused clean-up initiative in Mzimhlophe, Soweto, encouraging children to take an active role in protecting their environment.",
        "Participants were challenged to collect plastic waste from their surroundings, reinforcing positive environmental behaviour while helping to reduce pollution in their community. As part of the initiative, outstanding contributions were recognised with stationery vouchers, supporting both environmental action and educational development.",
        "Top participants across the initiative were awarded: \n- 1st Place: R1,500 \n- 2nd Place: R1,000 \n- 3rd Place: R500",
        "This initiative highlighted the power of engaging young people in environmental stewardship and demonstrated how early involvement can foster long-term responsibility for rivers and public spaces.",
        "By running this programme across consecutive years, Hlanzekile continues to invest in youth-led action as a key pillar of sustainable environmental change, nurturing the next generation of environmental champions while creating cleaner, healthier communities."
    ]
};