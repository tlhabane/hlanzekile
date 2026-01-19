import type { ProcessStep } from '../types';
import CollectingAndWeighing from '../assets/our-process/collecting-and-weighing.webp';
import SortingTheWaste from '../assets/our-process/sorting-the-waste.webp';
import BrandAuditing from '../assets/our-process/brand-auditing.webp';
import DirectingToResellers from '../assets/our-process/directing-to-resellers.webp';

export const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 'collect',
        title: 'Collecting & Weighing',
        description:
            'Our dedicated team conducts regular clean-up campaigns. After each clean, they meticulously collect and weigh the plastic waste retrieved to determine the scale of the issue.',
        image: CollectingAndWeighing,
    },
    {
        id: 'sort',
        title: 'Sorting The Waste',
        description:
            'Collected waste is sorted to categorise different types of plastic materials. This sorting process is essential for efficient recycling and helps identify pollution trends.',
        image: SortingTheWaste,
    },
    {
        id: 'audit',
        title: 'Brand Auditing',
        description:
            'We identify sources of plastic pollution by tracking brands on items. This allows us to engage companies to promote responsible packaging.',
        image: BrandAuditing,
    },
    {
        id: 'resell',
        title: 'Directing to Resellers',
        description:
            'We ensure plastic waste is allocated to correct recycling facilities to prevent landfill use, promoting the circular economy.',
        image: DirectingToResellers,
    },
];