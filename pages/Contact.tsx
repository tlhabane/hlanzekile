import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
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
        <div className="w-[90%] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto">
            
            {/* Left Column: Get in Touch (Brand Blue) */}
            <div className="md:w-1/2 bg-brand-blue p-10 lg:p-12 text-white relative overflow-hidden flex flex-col justify-between">
                {/* Decorative Background Blurs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Get in Touch</h2>
                    <p className="text-blue-100 text-lg mb-12 leading-relaxed font-light">
                        Whether you have a question about our services, pricing, or want to discuss a new project, our team is ready to answer all your questions.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start group">
                            <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                                <MapPin className="text-white h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Our Location</h3>
                                <p className="text-blue-200 text-sm leading-relaxed">
                                    12 Chroom Street, Jukskeipark<br/>
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
                                <p className="text-blue-200 text-sm break-all">info@hlanzekile.org</p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                            <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                                <Clock className="text-white h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                                <p className="text-blue-200 text-sm mb-1">Mon - Fri: 8:00 AM - 5:00 PM</p>
                                <p className="text-brand-green text-xs font-bold uppercase tracking-wide bg-white/10 inline-block px-2 py-1 rounded">24/7 Support for Emergencies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Send Message Form (White) */}
            <div className="md:w-1/2 bg-white p-10 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Send us a Message</h2>
                
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="John Doe" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                            <input 
                                type="text" 
                                placeholder="+27..." 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="john@example.com" 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subject</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all appearance-none font-medium text-slate-700">
                                <option>General Enquiry</option>
                                <option>Volunteering</option>
                                <option>Donations</option>
                                <option>Partnership Proposal</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message</label>
                        <textarea 
                            rows={4} 
                            placeholder="How can we help you?" 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium resize-none"
                        ></textarea>
                    </div>

                    <button 
                        type="button" 
                        className="w-full bg-brand-blue text-white font-bold py-4 rounded-lg hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2"
                    >
                        SendMessage
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};