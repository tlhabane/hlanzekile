
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { WhatWeDo } from './pages/WhatWeDo';
import { Impact } from './pages/Impact';
import { ImpactAreaDetail } from './pages/ImpactAreaDetail';
import { ImpactV1 } from './pages/Impact.v1';
import { GetInvolved } from './pages/GetInvolved';
import { Contact } from './pages/Contact';
import { Portal } from './pages/Portal';
import { DirectorLetter } from './pages/DirectorLetter';
import { SponsorGrid } from './pages/SponsorGrid';
import { AreaGridSelector } from './pages/AreaGridSelector';
import { Checkout } from './pages/Checkout';
import { LoadingSpinner } from './components/LoadingSpinner';

// Component to scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

// Wrapper component to handle routing effects (scroll, loading)
const AppContent: React.FC = () => {
    const location = useLocation();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // Handle Route Changes (Transitions)
    useEffect(() => {
        // 1. Show Spinner immediately on route change
        setIsLoading(true);

        // 2. Scroll to top
        window.scrollTo(0, 0);

        // 3. Simulate Loading / Transition Delay
        // This allows the spinner to be seen and creates a smooth 'fade in' effect for content
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // 0.8s transition time

        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Handle Scroll Progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            if (docHeight > 0) {
                const progress = (scrollTop / docHeight) * 100;
                setScrollProgress(progress);
                setShowScrollTop(progress > 50);
            } else {
                setScrollProgress(0);
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <ScrollToTop />
            <div
                className={`fixed inset-0 z-[100] w-full h-full transition-opacity duration-500 ease-in-out ${
                    isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                <LoadingSpinner />
            </div>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent pointer-events-none">
                <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-lime-500 transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/what-we-do" element={<WhatWeDo />} />
                    <Route path="/impact" element={<Impact />} />
                    <Route path="/impact/:areaId" element={<ImpactAreaDetail />} />
                    <Route path="/impact-dashboard" element={<ImpactV1 />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/sponsor-a-grid" element={<SponsorGrid />} />
                    <Route path="/sponsor-a-grid/:areaId" element={<AreaGridSelector />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portal" element={<Portal />} />
                    <Route path="/a-letter-from-our-director" element={<DirectorLetter />} />
                </Routes>
            </Layout>

            {/* Scroll To Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-3 rounded-full bg-cyan-600 text-white shadow-xl border border-white/20 z-50 transition-all duration-300 transform hover:bg-cyan-500 hover:scale-110 focus:outline-none flex items-center justify-center ${
                    showScrollTop && !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </>
    )
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
