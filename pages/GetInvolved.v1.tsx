import React, { useState } from 'react';
import { Heart, CreditCard, Hand, Box, Check } from 'lucide-react';

export const GetInvolved: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'volunteer'>('donate');
  const [donationType, setDonationType] = useState<'once' | 'monthly' | 'grid'>('monthly');

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Integrating with Payment Gateway (PayFast/Stripe)...');
  };

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      <section className="bg-brand-blue pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Engage As A Steward Of Change</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Hlanzekile invites you to be a pivotal part of our mission. Your support can take various forms, from monetary contributions to active volunteering.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden min-h-[600px]">
            {/* Tabs */}
            <div className="flex border-b border-slate-200">
                <button 
                    onClick={() => setActiveTab('donate')}
                    className={`flex-1 py-6 text-center font-bold text-lg flex items-center justify-center gap-2 transition ${activeTab === 'donate' ? 'text-brand-green border-b-4 border-brand-green bg-green-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Heart className={activeTab === 'donate' ? 'fill-current' : ''} /> Make a Donation
                </button>
                <button 
                    onClick={() => setActiveTab('volunteer')}
                    className={`flex-1 py-6 text-center font-bold text-lg flex items-center justify-center gap-2 transition ${activeTab === 'volunteer' ? 'text-brand-blue border-b-4 border-brand-blue bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Hand /> Volunteer / Equipment
                </button>
            </div>

            <div className="p-8 md:p-12">
                {activeTab === 'donate' ? (
                    <div>
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <button 
                                onClick={() => setDonationType('once')}
                                className={`flex-1 p-4 rounded-lg border-2 text-center transition ${donationType === 'once' ? 'border-brand-green bg-green-50 text-brand-green font-bold' : 'border-slate-200 hover:border-brand-green'}`}
                            >
                                Once-off
                            </button>
                            <button 
                                onClick={() => setDonationType('monthly')}
                                className={`flex-1 p-4 rounded-lg border-2 text-center transition ${donationType === 'monthly' ? 'border-brand-green bg-green-50 text-brand-green font-bold' : 'border-slate-200 hover:border-brand-green'}`}
                            >
                                Monthly Recurring
                            </button>
                            <button 
                                onClick={() => setDonationType('grid')}
                                className={`flex-1 p-4 rounded-lg border-2 text-center transition ${donationType === 'grid' ? 'border-brand-green bg-green-50 text-brand-green font-bold' : 'border-slate-200 hover:border-brand-green'}`}
                            >
                                Sponsor a Grid (5sqm)
                            </button>
                        </div>

                        <form onSubmit={handleDonateSubmit} className="space-y-6 max-w-lg mx-auto">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount (ZAR)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-500">R</span>
                                    <input type="number" className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" placeholder={donationType === 'grid' ? '500' : 'Enter amount'} defaultValue={donationType === 'grid' ? 500 : ''} readOnly={donationType === 'grid'} />
                                </div>
                                {donationType === 'grid' && <p className="text-xs text-brand-green mt-1">Fixed price to clean 5 square meters.</p>}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none" required />
                            </div>

                            <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                                <CreditCard size={20} /> Proceed to Payment
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4">Secured by PayFast / Stripe</p>
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold text-brand-blue mb-4">Join Our Cleanup Crew</h3>
                                <p className="text-slate-600 mb-6">
                                    We welcome everyone to join us. We want everyone to learn about taking care of our rivers and the environment.
                                </p>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <h4 className="font-bold text-brand-blue mb-2">Upcoming Opportunity</h4>
                                    <p className="font-medium">Bryanston River Cleanup</p>
                                    <p className="text-sm text-slate-600 mb-4">Saturday, 15 June 2025 • 08:00 AM</p>
                                    <button className="bg-brand-blue text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition">RSVP Now</button>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-2">
                                    <Box size={24} /> Donate Equipment
                                </h3>
                                <p className="text-slate-600 mb-4 text-sm">
                                    Have gumboots, gloves, rakes, or bags? We accept equipment donations!
                                </p>
                                <form className="space-y-4">
                                    <input type="text" placeholder="What would you like to donate?" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" />
                                    <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" />
                                    <button className="w-full bg-white border-2 border-brand-blue text-brand-blue font-bold py-2 rounded-lg hover:bg-blue-50 transition">
                                        Submit Offer
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};