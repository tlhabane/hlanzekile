
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, ShieldCheck, CheckCircle, CreditCard, Droplets, Heart } from 'lucide-react';
import { CartItem } from '../types';

export const Checkout: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(100);
  const [customAmountInput, setCustomAmountInput] = useState<string>("100");
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const donationType = queryParams.get('type'); // 'regular' or 'once'

  const PREDEFINED_AMOUNTS = [50, 100, 250, 500, 750, 1000];

  useEffect(() => {
    const savedCart = sessionStorage.getItem('hl_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else if (!donationType) {
      // If no cart and not a direct donation link, redirect back
      navigate('/get-involved');
    }
  }, [navigate, donationType]);

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmountInput(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmountInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setDonationAmount(num);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    sessionStorage.removeItem('hl_cart');
  };

  const isGridFlow = cart.length > 0;
  const currentTotal = isGridFlow 
    ? cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    : donationAmount;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 animate-fade-in">
        <div className="max-w-xl w-full text-center space-y-8 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-2xl">
          <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white mx-auto shadow-xl animate-bounce">
            <CheckCircle size={48} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-brand-blue uppercase tracking-tighter mb-4">
                {donationType ? 'Contribution Received' : 'Stewardship Confirmed'}
            </h1>
            <p className="text-slate-600 leading-relaxed">
              {donationType 
                ? "Thank you for your generous contribution. Your support directly funds our field crews and community programs. A receipt has been sent to your email."
                : "Thank you for your vital contribution. Your selected grids are now under your exclusive sponsorship. We'll send your first impact report in 30 days."
              }
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Order Ref</span>
               <span className="text-xs font-bold text-slate-800">#HLZ-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Paid</span>
               <span className="text-xl font-black text-brand-green">R {currentTotal}</span>
            </div>
          </div>
          <Link to="/portal" className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black block uppercase tracking-widest text-xs hover:bg-slate-900 transition shadow-lg">
            Enter Member Portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Info Form */}
        <div className="space-y-8">
           <Link to="/get-involved" className="inline-flex items-center text-slate-400 hover:text-brand-blue gap-2 text-xs font-black uppercase tracking-widest">
             <ChevronLeft size={16} /> Back to Involved
           </Link>
           <h2 className="text-4xl font-black text-brand-blue uppercase tracking-tighter">
             {donationType ? 'Support Restoration' : 'Checkout Details'}
           </h2>
           
           <form onSubmit={handleCheckout} className="space-y-8">
              {/* Direct Donation Amount Selection Card */}
              {donationType && (
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-4 border-brand-yellow/20 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                        <Heart size={120} className="text-brand-yellow" />
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Contribution Amount</h3>
                        <p className="text-slate-600 text-sm font-light">Select a predefined amount or insert a custom value below.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {PREDEFINED_AMOUNTS.map((amt) => (
                            <button
                                key={amt}
                                type="button"
                                onClick={() => handleAmountSelect(amt)}
                                className={`py-4 rounded-xl border-2 font-black text-sm transition-all duration-300 ${
                                    donationAmount === amt 
                                    ? 'bg-brand-yellow border-brand-yellow text-brand-blue shadow-lg scale-105' 
                                    : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-brand-yellow/50'
                                }`}
                            >
                                R {amt}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Custom Amount (ZAR)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-brand-blue">R</span>
                            <input 
                                type="number" 
                                value={customAmountInput}
                                onChange={handleCustomAmountChange}
                                placeholder="Enter custom amount" 
                                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-brand-yellow font-black text-brand-blue text-lg" 
                            />
                        </div>
                    </div>
                </div>
              )}

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold" />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Secure Payment</h3>
                   <div className="flex gap-2">
                      <div className="w-10 h-6 bg-slate-100 rounded border border-slate-200"></div>
                      <div className="w-10 h-6 bg-slate-100 rounded border border-slate-200"></div>
                   </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Card Number</label>
                    <div className="relative">
                      <input type="text" placeholder="•••• •••• •••• ••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold" />
                      <CreditCard className="absolute right-4 top-3 text-slate-300" size={20} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Expiry</label>
                      <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">CVV</label>
                      <input type="text" placeholder="•••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold" />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-brand-green text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-green-600 transition shadow-xl uppercase tracking-widest text-sm">
                Confirm {donationType ? 'Contribution' : 'Sponsorship'} <ShieldCheck />
              </button>
           </form>
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-8">
           <div className="bg-brand-blue rounded-[3rem] p-12 text-white shadow-2xl sticky top-32">
              <div className="flex items-center gap-3 mb-10">
                 {donationType ? <Heart size={24} className="text-brand-yellow" /> : <ShoppingCart size={24} className="text-brand-green" />}
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Support Summary</h2>
              </div>
              
              <div className="space-y-6 mb-12 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {donationType ? (
                    <div className="flex justify-between items-start pb-6">
                        <div>
                            <h4 className="font-bold text-lg leading-none mb-2 capitalize">
                                {donationType === 'regular' ? 'Regular Stewardship' : 'Once-off Contribution'}
                            </h4>
                            <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-2">Restoration Fund</p>
                            <span className="text-[10px] font-black bg-brand-yellow/20 text-brand-yellow px-2 py-1 rounded-md uppercase tracking-widest">
                                {donationType === 'regular' ? 'Monthly' : 'One-time'}
                            </span>
                        </div>
                        <span className="font-black text-lg">R {donationAmount}</span>
                    </div>
                ) : (
                    cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-6 border-b border-white/10 last:border-0">
                        <div>
                        <h4 className="font-bold text-lg leading-none mb-2">{item.gridNumber ? `Grid #${item.gridNumber}` : item.areaName}</h4>
                        <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-2">{item.areaName}</p>
                        <span className="text-[10px] font-black bg-brand-green/20 text-brand-green px-2 py-1 rounded-md uppercase tracking-widest">{item.plan}</span>
                        </div>
                        <span className="font-black text-lg">R {item.price * (item.quantity || 1)}</span>
                    </div>
                    ))
                )}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/20">
                <div className="flex justify-between items-center text-blue-200 font-bold">
                  <span className="uppercase tracking-widest text-xs">Subtotal</span>
                  <span>R {currentTotal}</span>
                </div>
                <div className="flex justify-between items-center text-blue-200 font-bold">
                  <span className="uppercase tracking-widest text-xs">Processing Fee</span>
                  <span>R 0</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-black uppercase tracking-tighter">Total Due</span>
                  <span className="text-4xl font-black text-brand-yellow tracking-tighter">R {currentTotal}</span>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                <Droplets className="text-brand-green shrink-0" size={32} />
                <p className="text-xs text-blue-100 leading-relaxed font-light italic">
                  {donationType 
                    ? "\"Your contribution empowers our crews to continue the restoration of Gauteng's vital waterways.\""
                    : "\"Your sponsorship directly enables the permanent presence of cleaning crews on the riverbank.\""
                  }
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
