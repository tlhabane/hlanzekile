import React, { useState } from 'react';
import {
    /*ArrowLeft, ArrowRight, Check, */Calendar, MapPin, Clock,
    Info, CheckCircle, ShieldAlert, Heart, Phone, /*User,*/
    ChevronRight, ChevronLeft, Droplets, Zap
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Headers } from '@/assets/headers';

const HeaderImage = Headers.aboutUs;

type SignupStep = 1 | 2 | 3;
type Area = 'Soweto' | 'Bryanston';

const Success: React.FC<{ area: Area}> = ({ area }) => (
    <div className="w-full flex flex-col md:flex-row justify-center">
        <div className="max-w-xl w-full text-center space-y-8 p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 animate-fade-in">
            <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white mx-auto shadow-xl">
                <CheckCircle size={48} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-brand-blue tracking-tighter mb-4">You're Enlisted!</h1>
                <p className="text-slate-600 leading-relaxed font-light">
                    Thank you for volunteering with Hlanzekile in <span className="font-bold text-brand-blue">{area}</span>.
                    We've received your application and will contact you shortly with the meeting details.
                </p>
            </div>
            <Link to="/" className="inline-block px-10 py-4 bg-brand-blue text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition shadow-lg">
                Back to Home
            </Link>
        </div>
    </div>
);

export const VolunteerSignup: React.FC = () => {
    window.document.title = 'Become a Steward of Change :: Hlanzekile River & Ocean Cleaning';
    const [step, setStep] = useState<SignupStep>(1);
    const { areaName } = useParams<{ areaName?: string }>();
    const [area, setArea] = useState<Area>((areaName as Area) || 'Soweto');
    const [isSubmitted, setIsSubmitted] = useState(false);


    // Form State
    const [formData, setFormData] = useState({
        date: '',
        fullName: '',
        age: '',
        phone: '',
        email: '',
        medical: '',
        emergencyName1: '',
        emergencyPhone1: '',
        emergencyName2: '',
        emergencyPhone2: '',
        safetyConsent: '',
        mediaConsent: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => (prev < 3 ? prev + 1 : prev) as SignupStep);
    const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev) as SignupStep);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="animate-fade-in bg-slate-50 min-h-screen relative flex flex-col items-center">
            {/* Hero Header Section */}
            <section className="absolute top-0 left-0 w-full h-screen pt-32 pb-40 text-white overflow-hidden">
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
                    <div className="inline-flex align-center gap-2 py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/50 text-sm font-semibold mb-8 backdrop-blur-sm animate-fade-in">
                        <Zap size={14} className="fill-current" /> Join our Movement
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Become a <br />
                        <span className="text-brand-yellow italic underline decoration-brand-yellow/30">Steward </span>
                        of Change
                    </h1>
                    <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12 opacity-90">
                        Your hands, your voice, and your support are the primary drivers in restoring South Africa's
                        vital water ecosystems.
                    </p>
                </div>
            </section>

            <div className="relative z-10 w-full flex justify-center mt-[calc(85vh-30px)] pb-20 px-4">
                {isSubmitted && <Success area={area} />}
                {!isSubmitted && (
                    <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">

                        {/* Left Column: Info Section (Brand Blue) */}
                        <div className="md:w-5/12 bg-brand-blue p-10 lg:p-14 text-white relative overflow-hidden flex flex-col">
                            <div className="relative z-10">
                                {/*<Link to="/contact" className="inline-flex items-center text-blue-200 hover:text-white mb-10 text-xs font-black uppercase tracking-widest gap-2 group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Contact us
                            </Link>*/}

                                {/*<h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-tight">
                                Volunteer <br/> <span className="text-brand-yellow">Signup</span>
                            </h2>*/}

                                <div className="space-y-10">
                                    {/* Location Info */}
                                    <div className="flex items-start group">
                                        <div className="p-3 bg-white/10 rounded-xl mr-5">
                                            <MapPin className="text-brand-yellow h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xs uppercase tracking-widest text-blue-200 mb-2">Location</h3>
                                            <p className="text-white text-base font-light leading-relaxed">
                                                Location pin will be sent to you via WhatsApp once confirmed.
                                                {/*{area === 'Soweto'
                                                ? '299 Mokhele Street, Orlando West'
                                                : 'Location pin will be sent to you via WhatsApp once confirmed.'}*/}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Days Info */}
                                    <div className="flex items-start group">
                                        <div className="p-3 bg-white/10 rounded-xl mr-5">
                                            <Calendar className="text-brand-yellow h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xs uppercase tracking-widest text-blue-200 mb-2">Cleanup Days</h3>
                                            <p className="text-white text-base font-light leading-relaxed">
                                                {area === 'Soweto'
                                                    ? 'One Saturday a month - Please indicate which Saturday in the form.'
                                                    : 'Three Saturdays a month - Choose your preferred date.'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Time Info */}
                                    <div className="flex items-start group">
                                        <div className="p-3 bg-white/10 rounded-xl mr-5">
                                            <Clock className="text-brand-yellow h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xs uppercase tracking-widest text-blue-200 mb-2">Time</h3>
                                            <p className="text-white text-base font-light leading-relaxed">08h30 - 14h00</p>
                                        </div>
                                    </div>

                                    {/* What to Bring */}
                                    <div className="flex items-start group">
                                        <div className="p-3 bg-white/10 rounded-xl mr-5">
                                            <Info className="text-brand-yellow h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xs uppercase tracking-widest text-blue-200 mb-2">What to Bring</h3>
                                            <p className="text-white text-sm font-light leading-relaxed opacity-90">
                                                Comfortable clothing, closed shoes, a hat, sunscreen, and a reusable water bottle.
                                                <span className="font-bold text-white block mt-2 underline decoration-brand-green underline-offset-4">Gloves and bags will be provided.</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start group">
                                        <div className="p-3 bg-white/10 rounded-xl mr-5">
                                            <Phone className="text-brand-yellow h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xs uppercase tracking-widest text-blue-200 mb-2">Need More Info</h3>
                                            <p className="text-blue-200 text-sm mb-1">+27 11 331 0932</p>
                                            <p className="text-blue-200 text-sm">+27 82 589 8461</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background Decorative */}
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        {/* Right Column: Form Wizard (White) */}
                        <div className="md:w-7/12 bg-white p-10 lg:p-14 flex flex-col relative">

                            {/* Step Indicator */}
                            <div className="flex items-center gap-2 mb-12">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-100 relative">
                                        <div
                                            className={`absolute inset-0 bg-brand-green transition-all duration-500 ${
                                                step >= s ? 'translate-x-0' : '-translate-x-full'
                                            }`}
                                        />
                                    </div>
                                ))}
                                <span className="ml-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Step {step} / 3
              </span>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">

                                {/* Step 1: The Basics */}
                                {step === 1 && (
                                    <div className="space-y-8 animate-slide-up">
                                        <h3 className="text-2xl font-black text-brand-blue tracking-tighter">Tell us where & when</h3>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Focus Area *</label>
                                                <select
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value as Area)}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-blue font-bold text-brand-blue transition-all"
                                                >
                                                    <option value="Soweto">Soweto (Kliprivier)</option>
                                                    <option value="Bryanston">Bryanston (Braamfontein Spruit)</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Saturday (e.g. Sat 29 March) *</label>
                                                <input
                                                    type="text"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                    placeholder="Saturday, 29 March"
                                                    required
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-blue font-bold text-slate-800 transition-all placeholder:text-slate-300"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name and Surname *</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-blue font-bold text-slate-800 transition-all"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age *</label>
                                                    <input
                                                        type="number"
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-blue font-bold text-slate-800 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-blue font-bold text-slate-800 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-blue font-bold text-slate-800 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Health & Emergency */}
                                {step === 2 && (
                                    <div className="space-y-8 animate-slide-up">
                                        <h3 className="text-2xl font-black text-brand-blue tracking-tighter">Health & Safety</h3>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Any medical conditions/allergies? *</label>
                                                <textarea
                                                    name="medical"
                                                    value={formData.medical}
                                                    onChange={handleInputChange}
                                                    placeholder="If yes, please elaborate..."
                                                    required
                                                    rows={3}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand-blue font-medium text-slate-800 transition-all resize-none"
                                                />
                                            </div>

                                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} className="text-brand-green" />
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emergency Contact #1 *</span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        name="emergencyName1"
                                                        value={formData.emergencyName1}
                                                        onChange={handleInputChange}
                                                        placeholder="Contact Name"
                                                        required
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-blue text-sm font-bold"
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="emergencyPhone1"
                                                        value={formData.emergencyPhone1}
                                                        onChange={handleInputChange}
                                                        placeholder="Phone Number"
                                                        required
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-blue text-sm font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} className="text-brand-green" />
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emergency Contact #2 (Optional)</span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        name="emergencyName2"
                                                        value={formData.emergencyName2}
                                                        onChange={handleInputChange}
                                                        placeholder="Contact Name"
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-blue text-sm font-bold"
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="emergencyPhone2"
                                                        value={formData.emergencyPhone2}
                                                        onChange={handleInputChange}
                                                        placeholder="Phone Number"
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-blue text-sm font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Consent */}
                                {step === 3 && (
                                    <div className="space-y-10 animate-slide-up">
                                        <h3 className="text-2xl font-black text-brand-blue tracking-tighter">Consent</h3>

                                        <div className="space-y-8">
                                            {/* Safety Guideline */}
                                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <ShieldAlert size={20} className="text-brand-green" />
                                                    <h4 className="text-sm font-black text-brand-blue uppercase tracking-tight">Liability Waiver *</h4>
                                                </div>
                                                <p className="text-xs text-slate-500 leading-relaxed font-light">
                                                    I agree to participate as a volunteer at my own risk and will follow all safety guidelines provided by the team.
                                                </p>
                                                {/*<div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFormData(prev => ({ ...prev, safetyConsent: 'agree' }))
                                                    }}
                                                    className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                                                        formData.safetyConsent === 'agree'
                                                            ? 'bg-brand-green border-brand-green text-white shadow-lg'
                                                            : 'bg-white border-slate-100 text-slate-400 hover:border-brand-green/30'
                                                    }`}
                                                >
                                                    {formData.safetyConsent === 'agree' && <Check size={14} />} I Agree
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFormData(prev => ({ ...prev, safetyConsent: 'disagree' }))
                                                    }}
                                                    className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                                                        formData.safetyConsent === 'disagree'
                                                            ? 'bg-slate-800 border-slate-800 text-white shadow-lg'
                                                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-800/30'
                                                    }`}
                                                >
                                                    I Disagree
                                                </button>
                                            </div>*/}
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="safetyConsent"
                                                            required
                                                            className="w-4 h-4 accent-brand-green"
                                                            onChange={() => setFormData(prev => ({ ...prev, safetyConsent: 'agree' }))}
                                                        />
                                                        <span className="text-xs font-bold text-slate-700">I Agree</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="safetyConsent"
                                                            className="w-4 h-4 accent-brand-green"
                                                            onChange={() => setFormData(prev => ({ ...prev, safetyConsent: 'disagree' }))}
                                                        />
                                                        <span className="text-xs font-bold text-slate-700">I Disagree</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Media Release */}
                                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Heart size={20} className="text-brand-green" />
                                                    <h4 className="text-sm font-black text-brand-blue uppercase tracking-tight">Media Release *</h4>
                                                </div>
                                                <p className="text-xs text-slate-500 leading-relaxed font-light">
                                                    I give permission for photos/videos taken during the cleanup to be used for awareness and promotional purposes.
                                                </p>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="mediaConsent"
                                                            required
                                                            className="w-4 h-4 accent-brand-green"
                                                            onChange={() => setFormData(prev => ({ ...prev, mediaConsent: 'agree' }))}
                                                        />
                                                        <span className="text-xs font-bold text-slate-700">I Agree</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="mediaConsent"
                                                            className="w-4 h-4 accent-brand-green"
                                                            onChange={() => setFormData(prev => ({ ...prev, mediaConsent: 'disagree' }))}
                                                        />
                                                        <span className="text-xs font-bold text-slate-700">I Disagree</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="mt-auto pt-12 flex items-center justify-between">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center gap-2 px-6 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-blue transition-colors group"
                                        >
                                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}

                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex items-center gap-3 px-10 py-4 bg-brand-blue text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl group"
                                        >
                                            Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="flex items-center gap-3 px-12 py-5 bg-brand-green text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-all shadow-2xl scale-105"
                                        >
                                            Signup <CheckCircle size={18} />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Branding Overlay */}
            <div className="absolute bottom-6 opacity-10 pointer-events-none">
                <div className="flex items-center gap-3">
                    <Droplets size={32} className="text-brand-blue" />
                    <span className="font-black text-2xl tracking-tighter text-brand-blue">HLANZEKILE</span>
                </div>
            </div>
        </div>
    );
};
