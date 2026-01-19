import { CleanupEvent, AreaData, MonthlyWasteData, WasteCategoryData, User, UserRole, Transaction, GridItem, MediaAsset } from '../types';
import { Media as SOWETO_GALLERY } from './stories/no-dumping-sign-kliprivier/media';
import { Media as BRYANSTON_GALLERY } from './stories/mandela-day-clean-ups/media';
import { Media as MELVILLE_GALLERY } from './stories/melville-koppies-nature-reserve-cleanup/media';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getGalleryImages = (assets: MediaAsset[]) => {
    const images = assets.filter((img) => img.type === 'image');
    return images.map((img) => img.url);
}
const sowetoImages = getGalleryImages(SOWETO_GALLERY);
const bryanstonImages = getGalleryImages(BRYANSTON_GALLERY);
const melvilleImages = getGalleryImages(MELVILLE_GALLERY);

const generateYearData = (year: number, values: number[]): MonthlyWasteData => ({
    year,
    data: MONTHS.map((month, i) => ({ month, kgs: values[i] || 0 }))
});

// Bryanston Data from PDF
const BRYANSTON_HISTORY: MonthlyWasteData[] = [
    generateYearData(2023, [0, 0, 0, 0, 0, 0, 0, 0, 354, 1064, 647, 108]),
    generateYearData(2024, [278, 915, 363, 508, 512, 701, 607, 582, 643, 1396, 372, 141]),
    generateYearData(2025, [271, 455, 471, 687, 603, 92, 312, 708, 519, 379, 299, 140])
];

// Soweto Data (Approximate + PDF points)
const SOWETO_HISTORY: MonthlyWasteData[] = [
    generateYearData(2023, [0, 0, 0, 0, 0, 0, 0, 0, 150, 420, 310, 80]),
    generateYearData(2024, [110, 320, 205, 290, 340, 450, 131, 380, 410, 850, 210, 190]),
    generateYearData(2025, [200, 310, 50, 440, 1196, 210, 237, 450, 380, 210, 723, 310])
];

// Melville Koppies Data from PDF
const MELVILLE_HISTORY: MonthlyWasteData[] = [
    generateYearData(2023, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    generateYearData(2024, [0, 0, 0, 0, 120, 80, 150, 210, 190, 340, 110, 95]),
    generateYearData(2025, [110, 145, 180, 210, 471, 136, 190, 210, 185, 120, 90, 85])
];

export const AGGREGATE_CATEGORIES: WasteCategoryData[] = [
    { category: 'Plastic Waste', kgs: 149.0, isStriped: false },
    { category: 'Plastic Bottles', kgs: 1381.84, isStriped: true },
    { category: 'Glass Bottles', kgs: 153.84, isStriped: false },
    { category: 'Metal/Aluminium', kgs: 136.9, isStriped: true },
    { category: 'Paper/Cardboard', kgs: 111.32, isStriped: false },
    { category: 'Textile/Fabric', kgs: 2729.68, isStriped: true },
    { category: 'Electronics', kgs: 116.54, isStriped: false },
    /*{ category: "Other", kgs: 12122.10, isStriped: true }*/
];

const TOTAL_WASTE = 16901.22;
const RATIO_BRAAMFONTEIN = 0.4282;
const RATIO_KLIPRIVIER = 0.5718;

const distributeCategories = (ratio: number): WasteCategoryData[] =>
    AGGREGATE_CATEGORIES.map((cat) => ({
        ...cat,
        kgs: Number((cat.kgs * ratio).toFixed(2)),
    }));

export const MOCK_CLEANUPS: CleanupEvent[] = [
    {
        id: 1,
        date: '2023-09-30',
        location: 'Bryanston (Braamfontein Spruit)',
        wasteCollected: 354,
        volunteersCount: 7,
        status: 'Completed',
        imageUrl: 'https://placehold.co/800x600/webp',
        details: {
            stewards: ['Floyd Nyai', 'Sarah Jenkins', 'Mike Ross'],
            donatedTools: ['5x Litter Pickers', '2x Nets'],
            donatedMaterials: ['100x Trash Bags', 'Gloves'],
            totalFunding: 1200,
        },
    },
    {
        id: 4,
        date: '2024-07-18',
        location: 'Soweto (Kliprivier)',
        wasteCollected: 131.8,
        volunteersCount: 25,
        status: 'Completed',
        imageUrl: 'https://placehold.co/800x600/webp',
        details: {
            stewards: ['Community Volunteer Team A', 'Floyd Nyai'],
            donatedTools: ['Canoe (Loaned)', '10x Pickers'],
            donatedMaterials: ['Hand Sanitizer', 'Reflective Vests'],
            totalFunding: 4500,
        },
    },
    { id: 10, date: '2025-06-15', location: 'Bryanston Spruit', status: 'Upcoming', volunteersCount: 12 },
    { id: 11, date: '2025-06-22', location: 'Soweto Kliprivier', status: 'Upcoming', volunteersCount: 8 },
];

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'Sarah Jenkins',
        email: 'sarah@example.com',
        role: UserRole.USER,
        joinDate: '2023-10-15',
        totalDonated: 2400,
        cleanupAttendance: 5,
    },
    {
        id: 'u2',
        name: 'Mike Ross',
        email: 'mike@law.com',
        role: UserRole.USER,
        joinDate: '2024-01-20',
        totalDonated: 500,
        cleanupAttendance: 12,
    },
    {
        id: 'u3',
        name: 'Floyd Nyai',
        email: 'floyd@hlanzekile.org',
        role: UserRole.ADMIN,
        joinDate: '2023-01-01',
        totalDonated: 0,
        cleanupAttendance: 45,
    },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 't1',
        userId: 'u1',
        userName: 'Sarah Jenkins',
        date: '2024-05-01',
        amount: 200,
        type: 'Monthly',
        status: 'Successful',
    },
    {
        id: 't2',
        userId: 'u1',
        userName: 'Sarah Jenkins',
        date: '2024-04-01',
        amount: 200,
        type: 'Monthly',
        status: 'Successful',
    },
    {
        id: 't3',
        userId: 'u2',
        userName: 'Mike Ross',
        date: '2024-05-15',
        amount: 500,
        type: 'Grid Sponsorship',
        status: 'Successful',
    },
];

export const MOCK_AREAS: AreaData[] = [
    {
        id: 'bryanston',
        name: 'Bryanston',
        fullName: 'Braamfontein Spruit',
        description:
            'The Braamfontein Spruit is the longest stream in Johannesburg. It is the heart of our northern river restoration project.',
        contentSections: [
            'Since September 28, 2023, our efforts at the Braamfontein Spruit River have resulted in the collection of over 7,200 kg of waste. We average approximately 300 kg per clean-up, primarily consisting of plastic and glass bottles retrieved from the water and riverbanks.',
            'To ensure a comprehensive clean, our team utilizes various specialized tools, including litter pickers, nets, and canoes for harder-to-reach areas. Our core team of seven hardworking members is eager to grow.',
        ],
        totalWaste: Number((TOTAL_WASTE * RATIO_BRAAMFONTEIN).toFixed(2)),
        coordinates: { lat: -26.045, lng: 28.02 },
        gallery: [ ...bryanstonImages ],
        impact: {
            totalCleanups: 54,
            periodMonths: 24,
            totalWasteKgs: Number((TOTAL_WASTE * RATIO_BRAAMFONTEIN).toFixed(2)),
            stewards: 85,
            categories: distributeCategories(RATIO_BRAAMFONTEIN),
            history: BRYANSTON_HISTORY
        },
    },
    {
        id: 'soweto',
        name: 'Soweto',
        fullName: 'Kliprivier',
        description:
            'The Kliprivier is vital for the Soweto ecosystem. Our cleanup efforts here focus on both restoration and local empowerment.',
        contentSections: [
            'Since launching monthly clean-ups in Soweto on July 18, 2024, we have successfully collected over 9,600 kg of waste. Our impact fluctuates with volunteer support, with collections ranging from 20 to 80 bags per session.',
            'Furthering our mission of sustainability, we established an upcycling workshop in the heart of Soweto, facilitated by a workshop space donation. Our team currently transforms plastic waste into recycled pens.',
        ],
        totalWaste: Number((TOTAL_WASTE * RATIO_KLIPRIVIER).toFixed(2)),
        coordinates: { lat: -26.25, lng: 27.85 },
        gallery: [ ...sowetoImages ],
        impact: {
            totalCleanups: 38,
            periodMonths: 18,
            totalWasteKgs: Number((TOTAL_WASTE * RATIO_KLIPRIVIER).toFixed(2)),
            stewards: 55,
            categories: distributeCategories(RATIO_KLIPRIVIER),
            history: SOWETO_HISTORY
        },
    },
    {
        id: 'melville',
        name: 'Melville',
        fullName: 'Melville Koppies',
        description: 'A protected heritage site of significant ecological value where we partner with scientific institutions.',
        contentSections: [
            "Our work at Melville Koppies expanded in 2024, focusing on protecting urban heritage and sensitive ecosystems.",
            "In partnership with the Wits Aquatic Laboratory, our clean-ups have prevented significant degradation of this important natural area through research-informed action."
        ],
        totalWaste: 2150,
        coordinates: { lat: -26.17, lng: 27.99 },
        gallery: [ ...melvilleImages ],
        impact: {
            totalCleanups: 12,
            periodMonths: 12,
            totalWasteKgs: 2150,
            stewards: 30,
            categories: [],
            history: MELVILLE_HISTORY
        }
    },
];

export const AGGREGATE_HISTORY: MonthlyWasteData[] = [2023, 2024, 2025].map(year => {
    const data = MONTHS.map((month, i) => {
        const kgs = MOCK_AREAS.reduce((sum, area) => {
            const yearData = area.impact.history.find(h => h.year === year);
            return sum + (yearData?.data[i].kgs || 0);
        }, 0);
        return { month, kgs: Number(kgs.toFixed(2)) };
    });
    return { year, data };
});

export const CHART_DATA = (AGGREGATE_HISTORY.find(h => h.year === 2025)?.data || []).map(d => ({
    name: d.month,
    kgs: d.kgs
}));

export const AGGREGATE_IMPACT = {
    totalCleanups: 153,
    periodMonths: 24,
    totalWasteKgs: MOCK_AREAS.reduce((s, a) => s + a.totalWaste, 0),
    stewards: 170,
    history: AGGREGATE_HISTORY
};

export const generateGrids = (areaId: string, centerLat: number, centerLng: number, count: number): GridItem[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${areaId}-grid-${i + 1}`,
        areaId,
        number: i + 1,
        status: Math.random() > 0.8 ? 'sponsored' : Math.random() > 0.9 ? 'reserved' : 'available',
        lat: centerLat + (Math.random() - 0.5) * 0.01,
        lng: centerLng + (Math.random() - 0.5) * 0.01,
    }));
};

export const MOCK_GRIDS: Record<string, GridItem[]> = {
    bryanston: generateGrids('bryanston', -26.045, 28.02, 50),
    soweto: generateGrids('soweto', -26.25, 27.85, 50),
};

/*export const AGGREGATE_IMPACT = {
    totalCleanups: 92,
    periodMonths: 24,
    totalWasteKgs: TOTAL_WASTE,
    stewards: 140,
    categories: AGGREGATE_CATEGORIES,
};

export const CHART_DATA = [
    { name: 'Sep 23', kgs: 354 },
    { name: 'Oct 23', kgs: 1065 },
    { name: 'Nov 23', kgs: 647 },
    { name: 'Jan 24', kgs: 278 },
    { name: 'Feb 24', kgs: 915 },
    { name: 'Apr 24', kgs: 509 },
    { name: 'Jun 24', kgs: 701 },
    { name: 'Aug 24', kgs: 583 },
    { name: 'Oct 24', kgs: 1396 },
    { name: 'Jan 25', kgs: 133 },
    { name: 'May 25', kgs: 2271 },
    { name: 'Nov 25', kgs: 1023 },
];*/
