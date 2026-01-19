import React, { useState } from 'react';
import {
    User as UserIcon,
    Download,
    Calendar,
    Settings,
    LogOut,
    Users,
    DollarSign,
    PlusCircle,
    Trash2,
    PieChart,
    Database,
    Search,
    Filter,
    ChevronRight,
    Wrench,
    Package,
    CheckCircle,
} from 'lucide-react';
import { UserRole, User, Transaction, CleanupEvent } from '../types';
import { MOCK_USERS, MOCK_TRANSACTIONS, MOCK_CLEANUPS, MOCK_AREAS } from '../services/mockData';

export const Portal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [adminTab, setAdminTab] = useState<'members' | 'transactions' | 'cleanups' | 'tally'>('members');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const roleSelect = (e.target as any).elements.role.value;
        const user = MOCK_USERS.find((u) => u.role === roleSelect) || MOCK_USERS[0];
        setCurrentUser(user);
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-slate-100">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-6">
                            <UserIcon size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-brand-blue uppercase tracking-tighter">
                            Member Portal
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 font-medium">
                            Restoring South Africa's Rivers Together
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">
                                    Login Role (Demo)
                                </label>
                                <select
                                    name="role"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none font-bold text-brand-blue"
                                >
                                    <option value={UserRole.USER}>Sarah (Member - Donor/Volunteer)</option>
                                    <option value={UserRole.ADMIN}>Floyd (Administrator)</option>
                                </select>
                            </div>
                            <div className="rounded-xl shadow-sm -space-y-px overflow-hidden border border-slate-200">
                                <input
                                    type="email"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border-b border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-brand-blue focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    defaultValue="sarah@example.com"
                                />
                                <input
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-brand-blue focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    defaultValue="password"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-4 px-4 bg-brand-blue text-white text-sm font-black rounded-xl hover:bg-slate-900 transition-all uppercase tracking-widest shadow-lg"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- ADMIN COMPONENTS ---

    const AdminMembers = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">Community Stewards</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search members..."
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm outline-none focus:border-brand-blue w-64"
                    />
                </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Member
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Role
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Joined
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Donated
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Attendance
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {MOCK_USERS.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold text-xs">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">{user.name}</div>
                                            <div className="text-xs text-slate-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${user.role === UserRole.ADMIN ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500'}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{user.joinDate}</td>
                                <td className="px-6 py-4 text-sm font-bold text-brand-green">R {user.totalDonated}</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                    {user.cleanupAttendance} Events
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const AdminTransactions = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">Financial Stream</h3>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Member
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Type
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {MOCK_TRANSACTIONS.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm text-slate-500">{tx.date}</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-800">{tx.userName}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{tx.type}</td>
                                <td className="px-6 py-4 text-sm font-black text-brand-green">R {tx.amount}</td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded uppercase tracking-widest">
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const AdminCleanups = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">Campaign Management</h3>
                <button className="flex items-center gap-2 px-6 py-2 bg-brand-green text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-green-600 transition shadow-lg">
                    <PlusCircle size={14} /> Schedule Cleanup
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_CLEANUPS.map((cleanup) => (
                    <div
                        key={cleanup.id}
                        className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span
                                    className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest ${cleanup.status === 'Completed' ? 'bg-slate-100 text-slate-400' : 'bg-brand-green text-white animate-pulse'}`}
                                >
                                    {cleanup.status}
                                </span>
                                <span className="text-xs font-bold text-slate-400">{cleanup.date}</span>
                            </div>
                            <h4 className="text-xl font-black text-brand-blue mb-4">{cleanup.location}</h4>

                            {cleanup.details && (
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <Users size={14} className="text-brand-green" /> <strong>Stewards:</strong>{' '}
                                        {cleanup.details.stewards.join(', ')}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        {/* Updated icon from 'Tool' to 'Wrench' */}
                                        <Wrench size={14} className="text-brand-green" /> <strong>Tools:</strong>{' '}
                                        {cleanup.details.donatedTools.join(', ')}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <Package size={14} className="text-brand-green" /> <strong>Supplies:</strong>{' '}
                                        {cleanup.details.donatedMaterials.join(', ')}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <DollarSign size={14} className="text-brand-green" />{' '}
                                        <strong>Allocated Funds:</strong> R {cleanup.details.totalFunding}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-100">
                                Edit Details
                            </button>
                            <button className="flex-1 py-2 border border-slate-100 text-brand-blue rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50">
                                View Participants
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const AdminTally = () => (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
                <h3 className="text-2xl font-black text-brand-blue uppercase tracking-tight mb-2">
                    Impact Tally Entry
                </h3>
                <p className="text-slate-500 text-sm">Update our database with the latest cleanup metrics.</p>
            </div>

            <form className="bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                            Area Target
                        </label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold">
                            {MOCK_AREAS.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                            Event Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-bold"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-black text-brand-blue uppercase tracking-widest block pb-2 border-b border-slate-100">
                        Waste Breakdown (Kgs)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Plastic Waste',
                            'Plastic Bottles',
                            'Glass Bottles',
                            'Metal/Aluminium',
                            'Paper/Cardboard',
                            'Textile/Fabric',
                            'Electronics',
                            'Other',
                        ].map((cat) => (
                            <div key={cat} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
                                <span className="text-xs font-bold text-slate-600 flex-1">{cat}</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-24 px-3 py-1 border border-slate-200 rounded-md outline-none focus:border-brand-blue text-right font-black"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-brand-blue text-white font-black rounded-xl uppercase tracking-[0.2em] shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                >
                    <Database size={18} /> Sync Impact Data
                </button>
            </form>
        </div>
    );

    // --- USER COMPONENTS (Sarah's View) ---

    const UserDashboard = () => (
        <div className="space-y-12">
            {/* Top Status Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                        Total Support
                    </div>
                    <div className="text-4xl font-black text-brand-green tracking-tighter">
                        R {currentUser?.totalDonated}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic">Lifesaving funding for rivers</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                        Field Impact
                    </div>
                    <div className="text-4xl font-black text-brand-blue tracking-tighter">
                        {currentUser?.cleanupAttendance} Events
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic">Hands-on restoration</p>
                </div>
                <div className="bg-brand-blue p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform">
                        <CheckCircle size={100} />
                    </div>
                    <div className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-4">
                        Steward Rank
                    </div>
                    <div className="text-4xl font-black tracking-tighter uppercase italic">Elite</div>
                    <p className="text-xs text-blue-100 mt-2 italic">Top 5% of contributors</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Donation Section */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">Support History</h3>
                        <Download size={18} className="text-slate-300 hover:text-brand-green cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                        {MOCK_TRANSACTIONS.filter((tx) => tx.userId === currentUser?.id).map((tx) => (
                            <div
                                key={tx.id}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                            >
                                <div>
                                    <div className="text-xs font-black text-slate-800 uppercase tracking-widest">
                                        {tx.type}
                                    </div>
                                    <div className="text-[10px] text-slate-400">{tx.date}</div>
                                </div>
                                <div className="text-lg font-black text-brand-green">R {tx.amount}</div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-3 bg-slate-50 text-brand-blue text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100">
                        View All Invoices
                    </button>
                </div>

                {/* Volunteering Section */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">
                            Active Deployments
                        </h3>
                        <div className="px-3 py-1 bg-green-50 text-brand-green text-[10px] font-black rounded uppercase tracking-widest animate-pulse">
                            Live
                        </div>
                    </div>
                    <div className="space-y-4">
                        {MOCK_CLEANUPS.filter((c) => c.status === 'Upcoming').map((cleanup) => (
                            <div
                                key={cleanup.id}
                                className="p-4 border border-brand-green/30 bg-green-50/30 rounded-2xl flex justify-between items-center"
                            >
                                <div>
                                    <div className="text-xs font-black text-brand-blue uppercase tracking-widest mb-1">
                                        {cleanup.location}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                                        <Calendar size={12} /> {cleanup.date}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-brand-green text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                                        Enlisted
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-slate-50">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                            Past Contributions
                        </h4>
                        <div className="space-y-2">
                            {MOCK_CLEANUPS.filter((c) => c.status === 'Completed')
                                .slice(0, 2)
                                .map((c) => (
                                    <div key={c.id} className="flex items-center gap-3 text-sm text-slate-600">
                                        <CheckCircle size={14} className="text-brand-green" />
                                        <span className="font-bold">{c.location}</span>
                                        <span className="text-[10px] text-slate-400">{c.date}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20">
            <header className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-3xl bg-brand-blue flex items-center justify-center text-white shadow-2xl relative overflow-hidden group">
                                <UserIcon size={40} />
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-brand-blue uppercase tracking-tighter">
                                    Hello, {currentUser?.name.split(' ')[0]}
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Member ID: HLZ-{currentUser?.id.toUpperCase()}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span
                                        className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${currentUser?.role === UserRole.ADMIN ? 'bg-brand-blue text-white' : 'bg-brand-green text-white'}`}
                                    >
                                        {currentUser?.role}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-slate-50 text-slate-400 hover:text-brand-blue hover:bg-slate-100 transition-all rounded-xl border border-slate-100">
                                <Settings size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    setCurrentUser(null);
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 transition-all text-xs font-black uppercase tracking-widest rounded-xl border border-red-100"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {currentUser?.role === UserRole.ADMIN ? (
                    <div className="space-y-12">
                        {/* Admin Navigation */}
                        <div className="flex flex-wrap gap-2 justify-center bg-white p-2 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
                            <button
                                onClick={() => setAdminTab('members')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'members' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                <Users size={14} /> Stewards
                            </button>
                            <button
                                onClick={() => setAdminTab('transactions')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'transactions' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                <DollarSign size={14} /> Funding
                            </button>
                            <button
                                onClick={() => setAdminTab('cleanups')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'cleanups' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                <Calendar size={14} /> Campaigns
                            </button>
                            <button
                                onClick={() => setAdminTab('tally')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'tally' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                <PieChart size={14} /> Tally Entry
                            </button>
                        </div>

                        {/* Admin Content */}
                        <div className="animate-fade-in">
                            {adminTab === 'members' && <AdminMembers />}
                            {adminTab === 'transactions' && <AdminTransactions />}
                            {adminTab === 'cleanups' && <AdminCleanups />}
                            {adminTab === 'tally' && <AdminTally />}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <UserDashboard />
                    </div>
                )}
            </main>
        </div>
    );
};
