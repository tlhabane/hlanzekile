import React, { useRef } from 'react';
import { ChevronDown, ArrowRight, GraduationCap, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProcessAccordion } from '../components/ProcessAccordion';
import { OurRoots as aboutSteps } from '@/services';
import { Headers } from '@/assets/headers';

const HeaderImage = Headers.aboutUs;
const DirectorBgImage = Headers.aboutUsDirector;

export const About: React.FC = () => {
    window.document.title = 'About Us :: Hlanzekile River & Ocean Cleaning';
    const nextSectionRef = useRef<HTMLElement>(null);

    const scrollToNextSection = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={HeaderImage.url}
                        alt="About Us | Hlanzekile River & Ocean Cleaning"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-green/70 mix-blend-multiply" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center h-full flex flex-col justify-center items-center pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">About Hlanzekile</h1>
                    <p className="text-blue-100 text-xl md:text-2xl max-w-6xl mx-auto leading-relaxed font-light mb-12 opacity-90">
                        Our journey is a testament to the transformative power of environmental stewardship and
                        community empowerment. Born from a deep concern for the well-being of the Braamfontein Spruit
                        River, we are on a mission to not only clean up our water bodies but to revive them as vibrant,
                        thriving ecosystems.
                    </p>

                    {/* Scroll Button */}
                    <div className="absolute bottom-8 w-full flex justify-center items-center">
                        <button
                            onClick={scrollToNextSection}
                            className="p-4 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm animate-bounce shadow-lg cursor-pointer group"
                            aria-label="Scroll Down"
                        >
                            <ChevronDown size={32} className="group-hover:text-brand-yellow transition-colors" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Our Roots Section (White Background) */}
            <section ref={nextSectionRef} className="py-24 lg:py-0 bg-white">
                <ProcessAccordion
                    steps={aboutSteps}
                    title="Our Roots"
                    subtitle="A response to crisis"
                    intro="Founded by individuals passionate about both the environment and community well-being, Hlanzekile emerged in response to the distressing condition of the Braamfontein Spruit River. Plastic and paper pollution have taken a toll, posing threats to the ecosystem, wildlife, and the health of local communities. Our journey began with a vision to confront these challenges head-on."
                />
            </section>

            {/* The Power of Partnership Section */}
            <section className="py-24 bg-slate-50 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">The Power of Partnership</h2>
                    <div className="w-20 h-1 bg-brand-green mx-auto mb-8"></div>

                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        At Hlanzekile, we firmly believe in the power of collective action, where individuals are united
                        by a shared purpose. By forming strategic alliances with local organizations, educational
                        institutions, and businesses, we aim to magnify our impact.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed mb-10">
                        Through these partnerships, our objectives expand to raise awareness, fundraise more
                        effectively, and even convert waste materials into products, which in turn create job
                        opportunities for the unemployed, nurturing economic growth within our communities.
                    </p>

                    <Link
                        to="/volunteer"
                        className="inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
                    >
                        Join Us <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Director's Message - Redesigned (CEO Letter Style) */}
            <section className="relative h-[600px] w-full overflow-hidden bg-slate-900">
                <div className="absolute inset-0">
                    <img
                        src={DirectorBgImage.url}
                        alt="Floyd Nyai"
                        className="w-full h-full object-cover object-right"
                    />
                    {/* Gradient Overlay for Text Readability on the Left */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end md:items-center justify-center md:justify-start pb-20 md:pb-0">
                    <div className="max-w-xl text-center md:text-left text-white">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-4 tracking-tight">Letter from our Director</h2>
                        <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-6 leading-relaxed font-light">
                            Read about our team’s commitment to providing everyone on our platform with the help and opportunities that can help them move ahead and restore our environment.
                        </p>
                        <Link
                            to="/letter-from-our-director"
                            className="inline-block bg-white text-brand-blue px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-green hover:text-white transition duration-300 shadow-xl"
                        >
                            Read Floyd's letter
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Mission (Replaces Our Foundation) */}
            <section className="py-24 bg-brand-blue text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Our Mission</h2>
                        <div className="w-20 h-1 bg-brand-green mx-auto mb-6"></div>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            We are not just another clean-up crew, we transform waste into opportunity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission 01 */}
                        <div className="bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:border-brand-green transition-all duration-300 group shadow-lg">
                            <div className="mb-6 inline-block p-4 bg-white/10 rounded-xl text-white group-hover:bg-brand-green group-hover:text-white transition-colors">
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 group-hover:text-brand-green transition-colors">
                                Education & Stewardship
                            </h3>
                            <div className="space-y-6 text-blue-100 leading-relaxed">
                                <p>
                                    Our mission goes beyond mere clean-up efforts. We are committed to fostering a
                                    culture of environmental responsibility and sustainability, including educational
                                    initiatives aimed at raising awareness about the importance of sustainable practices
                                    and recycling. By inspiring and engaging the community through educational programs,
                                    Hlanzekile sought to encourage a broad and lasting embrace of environmental
                                    stewardship.
                                </p>
                                <p>
                                    We believe that by imparting knowledge and promoting responsible actions, they could
                                    empower the community to take an active role in protecting the environment for
                                    current and future generations.
                                </p>
                            </div>
                        </div>

                        {/* Mission 02 */}
                        <div className="bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:border-brand-green transition-all duration-300 group shadow-lg">
                            <div className="mb-6 inline-block p-4 bg-white/10 rounded-xl text-white group-hover:bg-brand-green group-hover:text-white transition-colors">
                                <Hammer size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 group-hover:text-brand-green transition-colors">
                                Innovation & Empowerment
                            </h3>
                            <div className="space-y-6 text-blue-100 leading-relaxed">
                                <p>
                                    As a team, we aim is to transform plastic waste into opportunity — both for our
                                    environment and our society. Through innovative upcycling efforts, we repurpose
                                    discarded plastics into everyday products, reducing pollution while fostering a
                                    circular economy.
                                </p>
                                <p>
                                    At the same time, we are committed to social impact by creating employment
                                    opportunities for the youth of Soweto, equipping them with skills in sustainable
                                    manufacturing, and empowering them to build a better future. By merging
                                    environmental responsibility with economic empowerment, we strive to create lasting
                                    change—one recycled product, one job, and one cleaner river at a time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                        Ready to be part of the solution?
                    </h2>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                        Our mission is ambitious, but with your help, it is achievable. Join us in transforming waste
                        into wealth and pollution into purity. Whether through volunteering, sponsorship, or spreading
                        the word, your involvement creates ripples of change.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/volunteer"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand-green rounded-full hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-brand-blue border-2 border-brand-blue rounded-full hover:bg-blue-50 transition-all"
                        >
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
