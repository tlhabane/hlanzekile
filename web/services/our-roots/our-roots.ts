import { ProcessStep } from '@/types';
import VisionBeyondCleanUp from './our-roots-01.jpg';
import PreservingTheEnvironment from './our-roots-02.jpg';
import EmpoweringCommunities from './our-roots-03.jpg';
import CollectiveImpact from './our-roots-04.jpg';

export const OurRoots: ProcessStep[] = [
    {
        id: 'vision',
        title: 'A Vision Beyond Clean-up',
        description:
            'At Hlanzekile, our vision extends beyond clean-up efforts. We strive for a South Africa where rivers stand as pristine symbols of environmental integrity. Our mission encompasses preservation, restoration, and the creation of sustainable ecosystems. We understand that the health of our rivers is intertwined with the health of our communities.',
        image: VisionBeyondCleanUp,
    },
    {
        id: 'preserve',
        title: 'Preserving the Environment',
        description:
            'Our commitment goes deeper. We actively promote sustainable practices and eco-friendly solutions, aiming not just to address immediate issues but to foster a lasting culture of environmental responsibility. Through education and awareness initiatives, we aim to inspire lasting change, creating a ripple effect that touches lives far beyond the riverbanks.',
        image: PreservingTheEnvironment,
    },
    {
        id: 'empower',
        title: 'Empowering Communities',
        description:
            'Creating Jobs & Upcycling. A core aspect of our mission is community empowerment. We are not just cleaning rivers; we are creating opportunities. Through our upcycling initiatives, we aim to provide job opportunities for the people of Soweto, as we have a workshop dedicated to upcycling plastic waste to pens located in Orlando West.',
        image: EmpoweringCommunities,
    },
    {
        id: 'collective',
        title: 'Collective Impact',
        description:
            "Hlanzekile is more than an organisation; it's a collective commitment to making a positive impact. By engaging with us, you join a movement to preserve our environment, uplift communities, and forge a path toward a more sustainable future.",
        image: CollectiveImpact,
    },
];