
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Droplets, MapPin, Zap, ShoppingCart, 
  X, Plus, Minus, Trash2, ShieldCheck 
} from 'lucide-react';
import { MOCK_AREAS } from '../services/mockData';
import { CartItem } from '../types';

export const SponsorGrid: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // State for the purchase form inputs on each card
  const [selections, setSelections] = useState<Record<string, { plan: 'monthly' | 'annual', quantity: number }>>(
    MOCK_AREAS.reduce((acc, area) => ({
      ...acc,
      [area.id]: { plan: 'monthly', quantity: 1 }
    }), {})
  );

  useEffect(() => {
    const savedCart = sessionStorage.getItem('hl_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    sessionStorage.setItem('hl_cart', JSON.stringify(updatedCart));
  };

  const updateSelection = (areaId: string, field: 'plan' | 'quantity', value: any) => {
    setSelections(prev => ({
      ...prev,
      [areaId]: { ...prev[areaId], [field]: value }
    }));
  };

  const addToBasket = (areaId: string) => {
    const area = MOCK_AREAS.find(a => a.id === areaId);
    if (!area) return;

    const { plan, quantity } = selections[areaId];
    const unitPrice = plan === 'monthly' ? 500 : 5000;
    
    const cartId = `${areaId}-${plan}`;
    const existingIndex = cart.findIndex(item => item.id === cartId);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, {
        id: cartId,
        areaId,
        areaName: area.fullName,
        plan,
        price: unitPrice,
        quantity
      }];
    }

    saveCart(updatedCart);
    setIsCartOpen(true);
    // Reset selection quantity after adding
    updateSelection(areaId, 'quantity', 1);
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    saveCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://placehold.co/1920x1080/webp?text=River+Sponsorship"
            alt="River Sponsorship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/50 text-sm font-semibold mb-8 backdrop-blur-sm">
            <Zap size={14} className="fill-current" /> Exclusive Stewardship
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Sponsor a <span className="text-brand-green italic">Grid</span>
          </h1>
          <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light opacity-90">
            Directly fund riverbank maintenance. Skip selection and sponsor multiple grids instantly.
          </p>
        </div>
      </section>

      {/* Area Purchase Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-brand-blue mb-6 tracking-tight">Select Your Impact Area</h2>
          <div className="w-20 h-1 bg-brand-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {MOCK_AREAS.map((area) => {
            const selection = selections[area.id];
            return (
              <div key={area.id} className="group bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="h-[300px] relative overflow-hidden">
                  <iframe
                    width="100%" height="100%" frameBorder="0"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${area.coordinates.lng}!3d${area.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v123456789`}
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    title={`Map of ${area.fullName}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <MapPin className="text-brand-green" size={16} />
                      <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{area.name}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col flex-grow">
                  <div className="mb-8">
                    <h3 className="text-3xl font-black text-brand-blue tracking-tighter mb-2">{area.fullName}</h3>
                    <p className="text-slate-600 font-light leading-relaxed text-sm mb-8">
                      {area.description}
                    </p>
                    
                    {/* Purchase Interface */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Sponsorship Plan</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => updateSelection(area.id, 'plan', 'monthly')}
                            className={`py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${selection.plan === 'monthly' ? 'border-brand-green bg-green-50' : 'border-slate-100 hover:border-slate-200'}`}
                          >
                            <span className="text-xs font-black text-brand-blue uppercase">Monthly</span>
                            <span className="text-sm font-bold text-brand-green">R500 / mo</span>
                          </button>
                          <button 
                            onClick={() => updateSelection(area.id, 'plan', 'annual')}
                            className={`py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${selection.plan === 'annual' ? 'border-brand-yellow bg-yellow-50' : 'border-slate-100 hover:border-slate-200'}`}
                          >
                            <span className="text-xs font-black text-brand-blue uppercase">Annual</span>
                            <span className="text-sm font-bold text-brand-yellow">R5000 / yr</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-6">
                        <div className="flex-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Number of Grids</label>
                          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden h-12">
                            <button 
                              onClick={() => updateSelection(area.id, 'quantity', Math.max(1, selection.quantity - 1))}
                              className="w-12 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500"
                            >
                              <Minus size={16} />
                            </button>
                            <input 
                              type="number" 
                              value={selection.quantity}
                              onChange={(e) => updateSelection(area.id, 'quantity', parseInt(e.target.value) || 1)}
                              className="flex-1 text-center bg-transparent font-black text-brand-blue outline-none"
                            />
                            <button 
                              onClick={() => updateSelection(area.id, 'quantity', selection.quantity + 1)}
                              className="w-12 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Subtotal</label>
                          <span className="text-2xl font-black text-brand-blue">R {(selection.plan === 'monthly' ? 500 : 5000) * selection.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => addToBasket(area.id)}
                      className="w-full py-5 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl group/btn uppercase tracking-widest text-sm"
                    >
                      Add to Basket <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="bg-slate-900 py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green mx-auto mb-8 border border-brand-green/30">
              <Zap size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4">Immediate Action</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Your funds go directly to the cleanup crews operating in your chosen area within 48 hours.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-yellow/20 rounded-2xl flex items-center justify-center text-brand-yellow mx-auto mb-8 border border-brand-yellow/30">
              <Droplets size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4">Monthly Reporting</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Receive a detailed audit of the waste collected from the grids you support.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-8 border border-blue-500/30">
              <MapPin size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4">Field Access</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Exclusive access to photos and logs for your sponsored segments via the Portal.</p>
          </div>
        </div>
      </section>

      {/* Integrated Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative ml-auto w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-blue text-white rounded-lg">
                  <ShoppingCart size={20} />
                </div>
                <h2 className="text-2xl font-black text-brand-blue uppercase tracking-tighter">Your Basket</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition"><X /></button>
            </div>
            
            <div className="p-8 flex-grow overflow-y-auto space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-green"></div>
                  <div className="flex-grow">
                    <h4 className="font-black text-brand-blue text-sm uppercase leading-none mb-2">{item.areaName}</h4>
                    <div className="flex items-center gap-2 mb-3">
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${item.plan === 'monthly' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-yellow/10 text-brand-yellow'}`}>
                        {item.plan}
                       </span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                    </div>
                    <p className="font-black text-brand-blue">R {item.price * item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              {cart.length === 0 && (
                <div className="text-center py-24 text-slate-400">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart size={40} className="opacity-20" />
                  </div>
                  <p className="font-black uppercase tracking-widest text-xs">Your basket is empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-6 text-brand-blue font-bold text-sm underline">Start Sponsoring</button>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Stewardship</span>
                  <span className="text-3xl font-black text-brand-blue tracking-tighter">R {total}</span>
                </div>
                <div className="p-3 bg-brand-green/10 rounded-2xl">
                  <ShieldCheck className="text-brand-green" size={32} />
                </div>
              </div>
              <Link 
                to={cart.length > 0 ? "/checkout" : "#"}
                onClick={(e) => cart.length === 0 && e.preventDefault()}
                className={`w-full py-5 bg-brand-green text-white font-black rounded-2xl flex items-center justify-center gap-3 transition shadow-xl uppercase tracking-widest text-sm ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
              >
                Proceed to Checkout <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button (Visible when cart has items but sidebar is closed) */}
      {!isCartOpen && cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-10 right-10 z-[40] bg-brand-blue text-white p-6 rounded-full shadow-2xl flex items-center gap-4 hover:scale-105 transition-all group animate-bounce-in"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-3 -right-3 w-6 h-6 bg-brand-green text-white text-[10px] font-black rounded-full flex items-center justify-center ring-4 ring-white">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <span className="font-black uppercase tracking-widest text-xs pr-2 border-l border-white/20 pl-4">Basket Total: R {total}</span>
        </button>
      )}
    </div>
  );
};
