import React from 'react';
import { Trash2, Recycle } from 'lucide-react';

export const OurVision: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Vision</h2>
            <div className="w-20 h-1 bg-brand-green mx-auto"></div>
        </div>

        {/* Adjusted height: 500px for mobile, 350px for md and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px] md:h-[350px]">
            {/* Vision 01 */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg h-full cursor-pointer">
                <img
                    src="https://placehold.co/800x800/webp"
                    alt="Restoration"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Restoration</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-blue-100 leading-relaxed mt-4">
                            To restore the natural purity of South Africa's rivers and wetlands through
                            impactful clean-up initiatives. We aim to revive the Braamfontein Spruit and
                            other water bodies into vibrant, thriving ecosystems.
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision 02 */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg h-full cursor-pointer">
                <img
                    src="https://placehold.co/800x800/webp"
                    alt="Transformation"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20">
                        <Recycle size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Transformation</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-green-50 leading-relaxed mt-4">
                            Transforming plastic waste into opportunity. We envision a future where waste is
                            given renewed purpose—transformed into everyday products like pens, driving
                            sustainability and social impact through job creation in Soweto.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);