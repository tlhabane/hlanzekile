import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export const Contact: React.FC = () => {
    window.document.title = 'Contact Us :: Hlanzekile River & Ocean Cleaning';
    return (
        <div className="animate-fade-in bg-slate-50 min-h-screen relative flex flex-col items-center">
            {/* Map Hero Section - 60% Viewport Height */}
            <div className="absolute top-0 left-0 w-full h-[60vh] min-h-[600px] bg-slate-300 overflow-hidden z-0">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Hlanzekile Location"
                    marginHeight={0}
                    marginWidth={0}
                    scrolling="no"
                    style={{ border: 0, width: '100%', height: '100%' }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.6388766545674!2d27.9851498!3d-26.045369299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957425a3d28da5%3A0x36bbe39f3eac3894!2s12%20Chroom%20St%2C%20Jukskei%20Park%2C%20Randburg%2C%202188!5e0!3m2!1sen!2sza!4v1765830882185!5m2!1sen!2sza"
                    className="w-full h-full filter grayscale-[20%]"
                ></iframe>

                {/* Gradient Overlay for Nav Visibility */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
            </div>

            {/* Overlapping Card Container 
          Map is 60vh. 
          We want to overlap by roughly the header height (approx 130px).
      */}
            <div className="relative z-10 w-full flex justify-center mt-[calc(85vh-30px)] pb-20 px-4 pointer-events-none">
                <div id="form-top" />
                <div className="w-[90%] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto">
                    {/* Left Column: Get in Touch (Brand Blue) */}
                    <div className="md:w-1/2 bg-brand-blue p-10 lg:p-12 text-white relative overflow-hidden flex flex-col justify-between">
                        {/* Decorative Background Blurs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Get in Touch</h2>
                            <p className="text-blue-100 text-lg mb-12 leading-relaxed font-light">
                                Whether you have a question about our services, pricing, or want to discuss a new
                                project, our team is ready to answer all your questions.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start group">
                                    <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                                        <MapPin className="text-white h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Our Location</h3>
                                        <p className="text-blue-200 text-sm leading-relaxed">
                                            12 Chroom Street, Jukskeipark
                                            <br />
                                            Randburg, Johannesburg, South Africa
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                                        <Phone className="text-white h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                                        <p className="text-blue-200 text-sm mb-1">+27 11 331 0932</p>
                                        <p className="text-blue-200 text-sm">+27 82 589 8461</p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                                        <Mail className="text-white h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Email Address</h3>
                                        <p className="text-blue-200 text-sm break-all">admin@hlanzekile.org</p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                                        <Clock className="text-white h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                                        <p className="text-blue-200 text-sm mb-1">Mon - Fri: 8:00 AM - 5:00 PM</p>
                                        <p className="text-brand-green text-xs font-bold uppercase tracking-wide bg-white/10 inline-block px-2 py-1 rounded">
                                            24/7 Support for Emergencies
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Send Message Form (White) */}
                    <div className="md:w-1/2 bg-white p-10 lg:p-12 flex flex-col justify-center">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};
