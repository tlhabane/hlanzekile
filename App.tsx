
import React from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Component to scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop /> 
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
    </Router>
  );
};

export default App;
