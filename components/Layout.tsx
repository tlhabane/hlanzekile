import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, Instagram, Facebook, Linkedin, Youtube, User } from 'lucide-react';
import Logo01 from '../assets/logo-color.png';
import Logo02 from '../assets/logo-white.png';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should show the transparent header styling
  // Only on desktop (handled via md: classes mostly, but logical check helps for conditional rendering if needed)
  // And not on the Portal page (which has a light background)
  const isPortal = location.pathname === '/portal';
  const isTransparent = !isScrolled && !isPortal;

  // Links for the center navigation (desktop)
  const centerLinks = [
    { path: '/', label: 'Home' },
    { path: '/what-we-do', label: 'What We Do' },
    { path: '/impact', label: 'Our Impact' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  // Links for mobile menu
  const mobileLinks: { path: string; label: string; isHighlight?: boolean }[] = [
    ...centerLinks,
    { path: '/get-involved', label: 'Get Involved', isHighlight: true },
    { path: '/portal', label: 'Member Portal' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isTransparent 
            ? 'bg-white md:bg-transparent shadow-sm md:shadow-none border-b border-slate-100 md:border-none' 
            : 'bg-white shadow-sm border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                {/*<div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isTransparent 
                    ? 'bg-brand-blue text-white md:bg-white md:text-brand-blue group-hover:bg-brand-green group-hover:text-white' 
                    : 'bg-brand-blue text-white group-hover:bg-brand-green'
                }`}>
                    <Droplets size={24} />
                </div>*/}
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <img alt="Hlanzekile" src={isTransparent ? Logo02 : Logo01}/>
                </div>
                <div className="flex flex-col">
                    <span className={`font-bold text-xl tracking-tight leading-none transition-colors ${
                        isTransparent 
                        ? 'text-brand-blue md:text-white group-hover:text-brand-green' 
                        : 'text-brand-blue group-hover:text-brand-green'
                    }`}>HLANZEKILE</span>
                    <span className={`text-xs font-medium tracking-wider transition-colors ${
                        isTransparent 
                        ? 'text-brand-green md:text-blue-200 group-hover:text-brand-blue' 
                        : 'text-brand-green group-hover:text-brand-blue'
                    }`}>RIVER & OCEAN CLEANING</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Center Menu - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              <div className="flex space-x-8">
                {centerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? (isTransparent ? 'text-brand-yellow font-bold' : 'text-brand-green font-bold')
                        : (isTransparent ? 'text-white hover:text-brand-yellow' : 'text-slate-600 hover:text-brand-blue')
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-4">
               <Link 
                 to="/get-involved" 
                 className="px-6 py-2.5 bg-brand-green text-white text-sm font-bold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
               >
                 Get Involved
               </Link>
               <Link 
                 to="/portal" 
                 className={`p-2 rounded-full border transition-all ${
                     isTransparent 
                     ? 'text-white border-white hover:text-brand-blue hover:bg-white' 
                     : 'text-slate-400 border-slate-300 hover:text-brand-blue hover:border-brand-blue'
                 }`}
                 title="Member Portal"
               >
                 <User size={20} strokeWidth={2} />
               </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-brand-blue hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-fade-in shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {mobileLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                     link.isHighlight
                    ? 'bg-brand-green text-white' 
                    : isActive(link.path)
                      ? 'text-brand-blue bg-blue-50'
                      : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-blue text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    {/* Replaced Text Title with Logo Component */}
                    <Link to="/" className="flex items-center gap-3 mb-6 group">
                        {/*<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue">
                            <Droplets size={24} />
                        </div>*/}
                        <div className="w-10 h-10  rounded-full flex items-center justify-center text-brand-blue">
                            <img src={Logo02} alt="Hlanzekile" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl tracking-tight text-white leading-none">HLANZEKILE</span>
                            <span className="text-xs text-blue-200 font-medium tracking-wider">RIVER & OCEAN CLEANING</span>
                        </div>
                    </Link>

                    <p className="text-slate-300 max-w-md mb-6">
                        Restoring the natural purity of South Africa's rivers and wetlands through impactful clean-up initiatives, community engagement, and sustainable practices.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-slate-300 hover:text-brand-yellow transition"><Instagram size={20} /></a>
                        <a href="#" className="text-slate-300 hover:text-brand-yellow transition"><Facebook size={20} /></a>
                        <a href="#" className="text-slate-300 hover:text-brand-yellow transition"><Linkedin size={20} /></a>
                        <a href="#" className="text-slate-300 hover:text-brand-yellow transition"><Youtube size={20} /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-brand-yellow">Quick Links</h4>
                    <ul className="space-y-2 text-slate-300">
                        <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/what-we-do" className="hover:text-white">Our Process</Link></li>
                        <li><Link to="/impact" className="hover:text-white">Impact Dashboard</Link></li>
                        <li><Link to="/get-involved" className="hover:text-white">Donate</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-brand-yellow">Contact</h4>
                    <ul className="space-y-2 text-slate-300">
                        <li>info@hlanzekile.org</li>
                        <li>@hlanzekile.za</li>
                        <li>Johannesburg, South Africa</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
                &copy; 2025 Hlanzekile River and Ocean Cleaning. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};