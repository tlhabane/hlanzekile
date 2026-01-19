import { MediaAsset } from '@/types.ts';
import AboutUs from './header-about-us.webp';
import WhatWeDo from './header-what-we-do.webp';
import AboutUsDirector from './bg-letter-from-director-about-us.webp';
import LetterFromDirector from './letter-from-director.webp';
import Director from './letter-from-director-main.webp';
import OurImpact from './our-impact.webp';

export const Headers: Record<string, MediaAsset> = {
    aboutUs: {
        url: AboutUs,
        type: 'image'
    },
    aboutUsDirector: {
        url: AboutUsDirector,
        type: 'image'
    },
    whatWeDo: {
        url: WhatWeDo,
        type: 'image'
    },
    directorLetter: {
        url: LetterFromDirector,
        type: 'image'
    },
    directorMain: {
        url: Director,
        type: 'image'
    },
    ourImpact: {
        url: OurImpact,
        type: 'image'
    },
}