
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Fixed: Added ChevronRight to the lucide-react import list
import { MapPin, ChevronLeft, ChevronRight, ShoppingCart, X, Check, Heart, ShieldCheck } from 'lucide-react';
import { MOCK_AREAS, MOCK_GRIDS } from '../services/mockData';
import { GridItem, CartItem } from '../types';

export const AreaGridSelector: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const area = MOCK_AREAS.find(a => a.id === areaId);
  const grids = MOCK_GRIDS[areaId || ''] || [];
  
  const [selectedGrid, setSelectedGrid] = useState<GridItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Load cart from session if exists
    const savedCart = sessionStorage.getItem('hl_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const addToCart = (plan: 'monthly' | 'annual') => {
    if (!selectedGrid || !area) return;
    
    const price = plan === 'monthly' ? 500 : 5000;
    // Fixed: Added missing required properties (id, areaId, quantity) to CartItem object literal
    const newItem: CartItem = {
      id: selectedGrid.id,
      areaId: area.id,
      areaName: area.fullName,
      plan,
      price,
      quantity: 1,
      gridId: selectedGrid.id,
      gridNumber: selectedGrid.number
    };

    const updatedCart = [...cart, newItem];
    setCart(updatedCart);
    sessionStorage.setItem('hl_cart', JSON.stringify(updatedCart));
    setSelectedGrid(null);
    setIsCartOpen(true);
  };

  // Fixed: Use generic itemId for filtering to handle mixed cart items correctly
  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    sessionStorage.setItem('hl_cart', JSON.stringify(updatedCart));
  };

  if (!area) return <div>Area not found</div>;

  return (
    <div className="h-screen w-full bg-slate-100 flex overflow-hidden pt-20 animate-fade-in">
      {/* Side Control Panel */}
      <div className="w-[450px] bg-white h-full border-r border-slate-100 shadow-2xl z-20 overflow-y-auto flex flex-col">
        <div className="p-8 border-b border-slate-50">
          <Link to="/sponsor-a-grid" className="inline-flex items-center text-slate-400 hover:text-brand-blue mb-8 text-xs font-black uppercase tracking-widest gap-2">
            <ChevronLeft size={16} /> Back to Selection
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">{area.fullName}</h1>
          <p className="text-brand-green font-bold text-xs uppercase tracking-widest">Interactive Grid Selector</p>
        </div>

        <div className="p-8 flex-grow">
          {!selectedGrid ? (
            <div className="space-y-8">
              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                <h3 className="font-bold text-brand-blue mb-2">Instructions</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Select a numbered grid along the river on the map to view sponsorship options. Available grids are outlined in green.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-brand-green/20 border-2 border-brand-green"></div>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-slate-200 border-2 border-slate-300"></div>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sponsored</span>
                </div>
              </div>

              {cart.length > 0 && (
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-900 transition shadow-xl uppercase tracking-widest text-xs"
                >
                  <ShoppingCart size={18} /> View Basket ({cart.length})
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8 animate-slide-up">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-brand-blue uppercase tracking-tight">Grid #{selectedGrid.number}</h3>
                <button onClick={() => setSelectedGrid(null)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition">
                  <X size={20} />
                </button>
              </div>

              <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden relative">
                 <img src={`https://placehold.co/800x800/webp?text=Grid+Surface+#${selectedGrid.number}`} alt="Grid View" className="w-full h-full object-cover" />
                 <div className="absolute top-4 right-4 px-3 py-1 bg-brand-green text-white text-[10px] font-black rounded-full uppercase tracking-widest">Pristine Potential</div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Plan</h4>
                
                <div 
                  onClick={() => addToCart('monthly')}
                  className="p-6 border-2 border-slate-100 rounded-3xl cursor-pointer hover:border-brand-green transition-all bg-white shadow-sm group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-brand-blue uppercase text-sm">Monthly Stewardship</span>
                    <span className="font-black text-brand-green text-lg">R500 / mo</span>
                  </div>
                  <p className="text-xs text-slate-500">Continuous field crew support. Invoiced monthly.</p>
                </div>

                <div 
                  onClick={() => addToCart('annual')}
                  className="p-6 border-2 border-slate-100 rounded-3xl cursor-pointer hover:border-brand-yellow transition-all bg-white shadow-sm group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-brand-blue uppercase text-sm">Annual Stewardship</span>
                    <div className="text-right">
                      <span className="font-black text-brand-yellow text-lg block">R5000 / yr</span>
                      <span className="text-[10px] font-bold text-slate-400">Save R1000 (17% Off)</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">One year commitment. Paid upfront.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Map View */}
      <div className="flex-grow relative bg-slate-200">
        <iframe 
          width="100%" height="100%" frameBorder="0" 
          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${area.coordinates.lng}!3d${area.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v123456789`}
          /*src={`https://www.google.com/maps/embed/v1/view?key=AI*******************************-dTk&center=${area.coordinates.lat},${area.coordinates.lng}&zoom=17&maptype=satellite`}*/
          className="w-full h-full"
          title={`Detailed Map of ${area.fullName}`}
        />

        {/* Custom SVG Overlay for Grids - Simulated Interactive Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full">
            {grids.map((grid) => (
              <button
                key={grid.id}
                onClick={() => setSelectedGrid(grid)}
                style={{
                  top: `${40 + (Math.random() - 0.5) * 40}%`,
                  left: `${40 + (Math.random() - 0.5) * 40}%`
                }}
                disabled={grid.status !== 'available'}
                className={`
                  absolute w-12 h-12 border-2 rounded-lg flex items-center justify-center text-[10px] font-black transition-all pointer-events-auto shadow-lg
                  ${grid.status === 'available' 
                    ? 'bg-brand-green/20 border-brand-green text-white hover:scale-110 hover:bg-brand-green/40' 
                    : grid.status === 'sponsored' 
                      ? 'bg-slate-400/20 border-slate-400 text-slate-300 cursor-not-allowed opacity-40' 
                      : 'bg-brand-yellow/20 border-brand-yellow text-white cursor-not-allowed'}
                  ${selectedGrid?.id === grid.id ? 'scale-125 border-white ring-4 ring-brand-blue/20 bg-brand-blue/80' : ''}
                `}
              >
                {grid.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-out Cart Panel */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative ml-auto w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-brand-blue uppercase tracking-tighter">Your Basket</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X /></button>
            </div>
            
            <div className="p-8 flex-grow overflow-y-auto space-y-6">
              {cart.map((item) => (
                // Fixed: Using item.id as key for reliability
                <div key={item.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center">
                  <div>
                    {/* Fixed: Conditional check for gridNumber or display areaName if bulk */}
                    <h4 className="font-black text-brand-blue text-sm uppercase">{item.gridNumber ? `Grid #${item.gridNumber}` : item.areaName}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.areaName}</p>
                    <p className="text-xs font-bold text-brand-green mt-2 capitalize">{item.plan} Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-800 mb-2">R {item.price}</p>
                    {/* Fixed: Use generic item.id for removal to support all item types */}
                    <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600">Remove</button>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-bold">Your basket is empty</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Value</span>
                <span className="text-3xl font-black text-brand-blue tracking-tighter">R {cart.reduce((sum, item) => sum + item.price, 0)}</span>
              </div>
              <Link 
                to="/checkout"
                className="w-full py-5 bg-brand-green text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-green-600 transition shadow-xl uppercase tracking-widest text-sm"
              >
                Checkout Now <ChevronRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};