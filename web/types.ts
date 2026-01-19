export interface CleanupEvent {
    id: number;
    date: string;
    location: string;
    wasteCollected?: number; // in kgs
    volunteersCount?: number;
    status: 'Completed' | 'Upcoming';
    imageUrl?: string;
    details?: {
        stewards: string[];
        donatedTools: string[];
        donatedMaterials: string[];
        totalFunding: number;
    };
}

export interface MonthlyWasteData {
    year: number;
    data: { month: string; kgs: number }[];
}

export interface AreaImpactData {
    totalCleanups: number;
    periodMonths: number;
    totalWasteKgs: number;
    stewards: number;
    history: MonthlyWasteData[];
    description?: string;
    categories: WasteCategoryData[];
}

export interface AreaData {
    id: string;
    name: string;
    fullName: string;
    description: string;
    contentSections: string[];
    totalWaste: number;
    coordinates: { lat: number; lng: number };
    impact: AreaImpactData;
    gallery: string[];
}

export interface WasteCategoryData {
    category: string;
    kgs: number;
    isStriped: boolean;
}

export enum UserRole {
    USER = 'USER', // Combined Donor & Volunteer
    ADMIN = 'ADMIN'
}

export interface Transaction {
    id: string;
    userId: string;
    userName: string;
    date: string;
    amount: number;
    type: 'Once-off' | 'Monthly' | 'Grid Sponsorship';
    status: 'Successful' | 'Pending';
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    joinDate: string;
    totalDonated: number;
    cleanupAttendance: number;
}

export interface DonationTier {
    id: string;
    name: string;
    amount: number;
    description: string;
}

export interface GridItem {
    id: string;
    areaId: string;
    number: number;
    status: 'available' | 'reserved' | 'sponsored';
    lat: number;
    lng: number;
}

export interface CartItem {
    id: string; // Unique entry ID
    areaId: string;
    areaName: string;
    plan: 'monthly' | 'annual';
    price: number;
    quantity: number;
    gridId?: string;
    gridNumber?: number;
}

export interface MediaAsset {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
}

export interface ImpactStory {
    id: string;
    slug: string;
    areas: string[];
    category: string;
    title: string;
    date: string;
    tags?: string[];
    content: string[]; // paragraphs
    mainMedia: MediaAsset;
    gallery: MediaAsset[];
    excerpt: string;
}

export interface ProcessStep {
    id: string;
    title: string;
    description: string;
    image: string;
}