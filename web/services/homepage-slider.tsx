import React from 'react';
import { AGGREGATE_IMPACT } from './mockData.ts';
import Slider01 from '../assets/slider/slider-01.webp';
import Slider02 from '../assets/slider/slider-02.webp';
import Slider03 from '../assets/slider/slider-03.webp';
import Slider04 from '../assets/slider/slider-04.webp';

export const SLIDES = [
    {
        id: 'slider01',
        image: Slider01,
        title: (
            <>
                Reviving Rivers.
                <br />
                <span className="text-brand-yellow">Restoring Life.</span>
            </>
        ),
        description:
            'We are on a mission to clean up our water bodies and revive them as vibrant, thriving ecosystems.',
    },
    {
        id: 'slider02',
        image: Slider02,
        title: (
            <>
                {(+AGGREGATE_IMPACT.totalWasteKgs.toFixed(0)).toLocaleString()}+ Kgs of Waste
                <br />
                <span className="text-brand-yellow">Removed.</span>
            </>
        ),
        description:
            'Making a tangible difference in the Braamfontein Spruit and Kliprivier ecosystems, one cleanup at a time.',
    },
    {
        id: 'slider03',
        image: Slider03,
        title: (
            <>
                Transforming Waste
                <br />
                <span className="text-brand-yellow">Into Opportunity.</span>
            </>
        ),
        description:
            'Our upcycling initiative in Soweto turns plastic waste into everyday products, creating sustainable employment for local youth.',
    },
    {
        id: 'slider04',
        image: Slider04,
        title: (
            <>
                A Cleaner Future
                <br />
                <span className="text-brand-yellow">For South Africa.</span>
            </>
        ),
        description:
            'Join us in our journey to restore the natural purity of our wetlands and protect our water resources for generations to come.',
    },
];