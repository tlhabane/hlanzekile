
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, ChevronRight, ChevronLeft, ArrowRight,
    Calendar, Tag as TagIcon, Heart, UserPlus, Droplets
} from 'lucide-react';
import { MOCK_STORIES } from '@/services';
import { ImpactStory } from '../types';
import { Headers } from '@/assets/headers';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm.tsx';

const HeaderImage = Headers.aboutUs;

const VolunteerCTA = () => (
    <div className="bg-brand-blue rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col h-full relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 opacity-10 transform group-hover:scale-110 transition-transform">
            <UserPlus size={160} />
        </div>
        <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6 inline-block p-3 bg-white/10 rounded-2xl text-brand-yellow">
                <UserPlus size={32} />
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4 leading-none">Join the Frontline</h3>
            <p className="text-blue-100 font-light leading-relaxed mb-10 text-sm">
                Be the change you want to see in our rivers. Our field teams in Soweto and Bryanston need your hands on the banks.
            </p>
            <div className="mt-auto">
                <Link
                    to="/volunteer"
                    className="w-full py-4 bg-brand-yellow text-brand-blue font-black rounded-full text-center hover:bg-white transition-colors uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center gap-2"
                >
                    Volunteer <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    </div>
);

const DonationCTA = () => (
    <div className="bg-brand-green rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col h-full relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 opacity-10 transform group-hover:rotate-12 transition-transform">
            <Heart size={160} />
        </div>
        <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6 inline-block p-3 bg-white/10 rounded-2xl text-white">
                <Heart size={32} className="fill-current" />
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4 leading-none">Fuel the Restoration</h3>
            <p className="text-green-50 font-light leading-relaxed mb-10 text-sm">
                Every Rand donated directly funds equipment, youth workshops, and daily cleaning operations across 14km of riverbank.
            </p>
            <div className="mt-auto">
                <Link
                    to="https://pay.yoco.com/hlanzekile-river-and-ocean-cleaning-npc"
                    target="_blank"
                    className="w-full py-4 bg-white text-brand-green font-black rounded-full text-center hover:bg-brand-blue group hover:text-white transition-all uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center gap-2"
                >
                    Donate Today <Heart size={14} className="group-hover:fill-current" />
                </Link>
            </div>
        </div>
    </div>
);

const StoryCard = ({ story }: { story: ImpactStory }) => (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group h-full">
        <div className="aspect-[4/3] overflow-hidden rounded-t-[2rem] relative">
            <Link to={`/impact/story/${story.slug}`}>
                <img
                    src={story.mainMedia.thumbnail || story.mainMedia.url}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </Link>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-brand-blue shadow-sm uppercase tracking-widest">
                {story.category}
            </div>
            {story.mainMedia.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-12 h-12 bg-brand-green/90 rounded-full flex items-center justify-center text-white shadow-lg">
                        <ArrowRight size={24} className="ml-0.5" />
                    </div>
                </div>
            )}
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                <Calendar size={12} className="text-brand-green" /> {story.date}
            </div>
            <Link to={`/impact/story/${story.slug}`}>
                <h3 className="font-black text-xl text-brand-blue mb-4 leading-tight group-hover:text-brand-green transition-colors tracking-tight">
                    {story.title}
                </h3>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light line-clamp-3">
                {story.excerpt}
            </p>
            <div className="mt-auto">
                <Link
                    to={`/impact/story/${story.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-slate-50 text-brand-blue font-black rounded-full hover:bg-brand-blue hover:text-white transition-all text-[10px] uppercase tracking-widest shadow-sm"
                >
                    Read Story <ChevronRight size={14} />
                </Link>
            </div>
        </div>
    </div>
);

const STORIES_PER_PAGE = 4;
const CTA_CARDS = [
    {
        id: 'volunteer-card',
        CTACard: VolunteerCTA
    },
    {
        id: 'donation-card',
        CTACard: DonationCTA
    }
];

const formatStories = (stories: ImpactStory[]) => {
    const updatedStories = stories.map((story) => <StoryCard key={story.id} story={story} />);
    for(const { id, CTACard } of CTA_CARDS) {
        const ctaIndex = Math.floor(Math.random() * STORIES_PER_PAGE + CTA_CARDS.length) + 1;
        updatedStories.splice(ctaIndex, 0, <CTACard key={`${id}-0${ctaIndex}`} />);
    }

    return updatedStories;
};

export const ImpactStoryList: React.FC = () => {
    window.document.title = 'Impact Stories :: Hlanzekile River & Ocean Cleaning';
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTag, setSelectedTag] = useState<string>('All');

    // Derive unique categories and tags
    const categories = useMemo(() => {
        const cats = MOCK_STORIES.map(s => s.category);
        return ['All', ...Array.from(new Set(cats))];
    }, []);

    const allTags = useMemo(() => {
        const tags = MOCK_STORIES.flatMap(s => s.tags || []);
        return ['All', ...Array.from(new Set(tags))];
    }, []);

    // Filter Logic
    const filteredStories = useMemo(() => {
        return MOCK_STORIES.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
            const matchesTag = selectedTag === 'All' || (story.tags && story.tags.includes(selectedTag));
            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [searchQuery, selectedCategory, selectedTag]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
    let paginatedStories = filteredStories.slice(
        (currentPage - 1) * STORIES_PER_PAGE,
        currentPage * STORIES_PER_PAGE
    )
        .map((story) => <StoryCard key={story.id} story={story} />);

    if (paginatedStories.length === STORIES_PER_PAGE) {
        paginatedStories.splice(1, 0, <DonationCTA key="donation" />);
        paginatedStories.splice(4, 0, <VolunteerCTA key="volunteer" />);
    } else {
        paginatedStories.push(<DonationCTA key="donation" />);
        /*const ctaIndex = useMemo(() => Math.floor(Math.random() * CTA_CARDS.length) + 1, []);

        if (CTA_CARDS[ctaIndex]) {
            const { id: ctaKey, CTACard } = CTA_CARDS[ctaIndex];
            paginatedStories.push(<CTACard key={ctaKey} />);
            if (paginatedStories.length === 1) {
                paginatedStories.push(<CTACard key={ctaKey} />);
            } else {
                paginatedStories.splice(paginatedStories.length - 1, 0, <CTACard key={ctaKey} />)
            }
        }*/

    }


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <div className="animate-fade-in bg-slate-50 min-h-screen">
            {/* Hero Header */}
            <section className="bg-brand-blue pt-32 pb-40 text-white relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={HeaderImage.url}
                        alt="Impact Stories | Hlanzekile River & Ocean Cleaning"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-green/70 mix-blend-multiply" />
                </div>
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                    <Droplets size={400} />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Impact Stories</h1>
                    <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
                        Witness the transformation of our rivers and communities through deep dives into our recent initiatives and field work.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 pb-24 -mt-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Grid Content */}
                    <div className="flex-grow space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {paginatedStories.map((Story) => Story)}

                            {filteredStories.length === 0 && (
                                <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search size={40} className="text-slate-200" />
                                    </div>
                                    <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">No stories found</h3>
                                    <p className="text-slate-400 font-light mt-2">Try adjusting your filters or search keywords.</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedTag('All'); }}
                                        className="mt-6 text-brand-green font-bold text-xs uppercase tracking-widest underline"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-3 rounded-full bg-white border border-slate-100 text-brand-blue disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-10 h-10 rounded-full text-xs font-black uppercase transition-all ${
                                            currentPage === i + 1 ? 'bg-brand-blue text-white shadow-lg scale-110' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-3 rounded-full bg-white border border-slate-100 text-brand-blue disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Sidebar */}
                    <aside className="lg:w-80 flex-shrink-0 space-y-10">
                        {/* Search */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Search Stories</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Keywords..."
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue transition-all font-bold text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Categories</h3>
                            <div className="space-y-3">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                            selectedCategory === cat ? 'bg-brand-blue text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                                        }`}
                                    >
                                        {cat}
                                        <span className={`text-[8px] px-1.5 rounded bg-white/20 ${selectedCategory === cat ? 'block' : 'hidden'}`}>
                        Active
                      </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags Cloud */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Popular Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                                            selectedTag === tag
                                                ? 'bg-brand-green border-brand-green text-white shadow-md scale-105'
                                                : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-brand-blue'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats Sidebar Card */}
                        {/*<div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <TagIcon size={80} className="text-brand-yellow" />
                            </div>
                            <h4 className="text-[10px] font-black text-brand-yellow uppercase tracking-widest mb-4">Content Feed</h4>
                            <p className="text-xl font-black tracking-tighter leading-tight mb-4">
                                {MOCK_STORIES.length} Verified Impact Stories Live
                            </p>
                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                Real-time updates from our field crews and community initiatives.
                            </p>
                        </div>*/}
                    </aside>

                </div>
            </div>

            {/* Newsletter Signup - Updated Style */}
            <section className="bg-slate-100 py-20">
                <NewsletterSignupForm />
            </section>
        </div>
    );
};
