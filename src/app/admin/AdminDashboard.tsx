'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin, toggleAvailability, togglePostStatus, saveBlogPost, deleteBlogPost, saveServiceConfig } from './actions';
import { ServiceConfig } from '@/types/services';
import { BlogPost, Category } from '@/types/blog';
import { 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FileText, Power, Mail, Users, Lock, Terminal, Activity, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Plus, Edit3, Trash2, Eye, Save, X, ArrowLeft, Sliders, Briefcase
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Tab = 'overview' | 'compose' | 'services';

export default function AdminDashboard({ 
    isAuthorized, 
    initialPosts, 
    initialSettings,
    metrics
}: { 
    isAuthorized: boolean; 
    initialPosts: (BlogPost & { is_published: boolean })[];
    initialSettings: { is_available: boolean; service_config: any } | null;
    metrics?: { enquiries: any[], subscribers: any[] };
}) {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // View Management
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [editingPost, setEditingPost] = useState<(BlogPost & { is_published: boolean }) | null>(null);

    // Dynamic State
    const [isAvailable, setIsAvailable] = useState(initialSettings?.is_available ?? true);
    const [posts, setPosts] = useState(initialPosts);
    const [serviceConfig, setServiceConfig] = useState<ServiceConfig>(() => {
        return (initialSettings?.service_config ?? []) as ServiceConfig;
    });
    const [configStatus, setConfigStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    // Editor Form State
    const [form, setForm] = useState({
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        category: 'Development' as Category,
        tags: '',
        image: '',
        featured: false,
        is_published: false
    });

    if (!isAuthorized) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-6 sm:px-12 flex items-center justify-center">
                <main className="w-full max-w-sm mech-panel p-8 rounded-xl flex flex-col items-center">
                    <Lock className="w-12 h-12 mb-6" style={{ color: 'var(--neon)' }} />
                    <h1 className="text-3xl font-orbitron mb-8 track-wider mech-text-glow uppercase text-center">System Override</h1>
                    <div className="w-full relative">
                        <input 
                            type="password" 
                            placeholder="OPERATOR_KEY"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            className="w-full bg-[var(--bg2)] border border-[var(--border)] text-[var(--neon)] font-mono p-4 rounded-lg focus:outline-none focus:border-[var(--neon)] transition-colors text-center tracking-[0.5em]"
                        />
                    </div>
                    {error && <p className="text-red-500 font-mono mt-4 text-sm uppercase text-center">{error}</p>}
                    <button 
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full mt-6 mech-button hover:bg-[var(--glass2)] text-[var(--neon)] font-orbitron py-4 rounded-lg transition-all"
                    >
                        {loading ? 'AUTHENTICATING...' : 'INITIALIZE'}
                    </button>
                </main>
            </div>
        );
    }

    async function handleLogin() {
        setLoading(true);
        setError('');
        const res = await loginAdmin(password);
        if (res.success) {
            router.refresh();
        } else {
            setError(res.error || 'Access Denied.');
            setLoading(false);
        }
    }

    // Actions
    async function handleToggleAvailability() {
        setLoading(true);
        const newState = !isAvailable;
        try {
            await toggleAvailability(newState);
            setIsAvailable(newState);
        } catch (err: any) {
            alert(`Toggle failed: ${err.message}`);
        }
        setLoading(false);
    }

    async function handleSaveServiceConfig() {
        setConfigStatus('saving');
        try {
            await saveServiceConfig(serviceConfig);
            setConfigStatus('saved');
            setTimeout(() => setConfigStatus('idle'), 2000);
        } catch (err: any) {
            alert(`Save failed: ${err.message}`);
            setConfigStatus('idle');
        }
    }



    async function handleTogglePost(slug: string, currentState: boolean) {
        try {
            await togglePostStatus(slug, !currentState);
            setPosts(posts.map(p => p.slug === slug ? { ...p, is_published: !currentState } : p));
        } catch (err: any) {
            alert(`Post toggle failed: ${err.message}`);
        }
    }

    async function handleDeletePost(slug: string) {
        if (!confirm(`Are you sure you want to delete ${slug}? This cannot be undone.`)) return;
        try {
            await deleteBlogPost(slug);
            setPosts(posts.filter(p => p.slug !== slug));
        } catch (err: any) {
            alert(`Delete failed: ${err.message}`);
        }
    }

    async function handleSavePost() {
        if (!form.slug || !form.title || !form.content) {
            alert('Missing required fields: Slug, Title, Content');
            return;
        }
        setLoading(true);
        try {
            const data = {
                ...form,
                tags: form.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
            };
            await saveBlogPost(data as any);
            alert('Post saved successfully!');
            router.refresh(); // Reload to update lists
            setActiveTab('overview');
            setEditingPost(null);
        } catch (err: any) {
            alert(`Save failed: ${err.message}`);
        }
        setLoading(false);
    }

    const startEditing = (post: BlogPost & { is_published: boolean }) => {
        setEditingPost(post);
        setForm({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || '',
            content: post.content,
            category: post.category,
            tags: post.tags?.join(', ') || '',
            image: post.image || '',
            featured: post.featured || false,
            is_published: post.is_published
        });
        setActiveTab('compose');
    };

    const startNew = () => {
        setEditingPost(null);
        setForm({
            slug: '',
            title: '',
            excerpt: '',
            content: '',
            category: 'Development',
            tags: '',
            image: '',
            featured: false,
            is_published: true
        });
        setActiveTab('compose');
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col gap-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--border)] pb-8 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-orbitron mech-text-glow uppercase tracking-wider">Command Core</h1>
                    <p className="text-[var(--dim)] font-mono mt-2">Level 9 Administration Interface (DB CMS Mode)</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-2 font-orbitron rounded transition-all text-sm ${activeTab === 'overview' ? 'bg-[var(--neon)] text-[var(--bg)] shadow-[0_0_15px_var(--neon)]' : 'bg-transparent border border-[var(--border)] text-[var(--dim)] hover:text-[var(--text)]'}`}
                    >
                        OVERVIEW
                    </button>
                    <button 
                        onClick={() => setActiveTab('services')}
                        className={`px-6 py-2 font-orbitron rounded transition-all text-sm flex items-center gap-2 ${activeTab === 'services' ? 'bg-[var(--neon)] text-[var(--bg)] shadow-[0_0_15px_var(--neon)]' : 'bg-transparent border border-[var(--border)] text-[var(--dim)] hover:text-[var(--text)]'}`}
                    >
                        <Briefcase size={16} /> SERVICES
                    </button>
                    <button 
                        onClick={startNew}
                        className={`px-6 py-2 font-orbitron rounded transition-all text-sm flex items-center gap-2 ${activeTab === 'compose' && !editingPost ? 'bg-[var(--neon)] text-[var(--bg)] shadow-[0_0_15px_var(--neon)]' : 'bg-transparent border border-[var(--border)] text-[var(--dim)] hover:text-[var(--text)]'}`}
                    >
                        <Plus size={16} /> COMPOSE
                    </button>
                </div>
            </header>

            {activeTab === 'overview' ? (
                <div className="flex flex-col gap-10">
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Status Node */}
                        <div className="mech-panel p-6 rounded-xl flex flex-col justify-between items-start gap-4">
                            <h2 className="text-xl font-orbitron flex items-center gap-2">
                                <Power className="w-5 h-5 text-[var(--neon)]" /> Matrix Status
                            </h2>
                            <button 
                                onClick={handleToggleAvailability}
                                disabled={loading}
                                className={`w-full py-4 font-mono rounded font-bold transition-all ${isAvailable ? 'bg-[color-mix(in_srgb,var(--neon)_15%,transparent)] text-[var(--neon)] mech-border-glow' : 'bg-transparent border border-[var(--border)] text-[var(--dim)]'}`}
                            >
                                {isAvailable ? '/// ONLINE' : '/// OFFLINE'}
                            </button>
                        </div>
                        
                        {/* Metrics: Subscribers */}
                        <div className="mech-panel p-6 rounded-xl flex flex-col">
                            <h2 className="text-xl font-orbitron flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-4">
                                <Users className="w-5 h-5 text-[var(--neon)]" /> Subscribers
                            </h2>
                            <div className="max-h-[120px] overflow-y-auto font-mono text-xs flex flex-col gap-2">
                                {metrics?.subscribers?.map((s, i) => (
                                    <div key={i} className="flex justify-between text-[var(--dim)]">
                                        <span className="text-[var(--text)]">{s.email}</span>
                                        <span>{new Date(s.created_at).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Telemetry */}
                        <div className="mech-panel p-6 rounded-xl flex flex-col bg-[var(--bg2)] border-dashed">
                             <h2 className="text-xl font-orbitron flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-4">
                                <Terminal className="w-5 h-5 text-[var(--neon)]" /> Telemetry
                            </h2>
                            <div className="font-mono text-xs text-[var(--neon)] opacity-60">
                                <p>[INIT] DB Connected</p>
                                <p>[AUTO] Edge Proxy Active</p>
                                <p>[CMD] Session Validated</p>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Blog Ledger */}
                        <div className="mech-panel p-6 rounded-xl flex flex-col border-2 border-[var(--border)]">
                            <h2 className="text-2xl font-orbitron flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
                                <FileText className="w-6 h-6 text-[var(--neon)]" /> Content Ledger
                            </h2>
                            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                                {posts.map(post => (
                                    <div key={post.slug} className="group flex flex-col p-4 bg-[var(--bg)] rounded border border-[var(--glass)] hover:border-[var(--neon)] transition-all gap-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="font-orbitron font-bold text-lg">{post.title}</span>
                                                <span className="text-xs font-mono text-[var(--dim)]">/{post.slug} • {post.category}</span>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEditing(post)} className="p-2 hover:text-[var(--neon)]" title="Edit Post"><Edit3 size={18}/></button>
                                                <button onClick={() => handleDeletePost(post.slug)} className="p-2 hover:text-red-500" title="Delete Post"><Trash2 size={18}/></button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                {post.featured && <span className="text-[10px] px-2 py-0.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded uppercase font-mono">Featured</span>}
                                            </div>
                                            <button 
                                                onClick={() => handleTogglePost(post.slug, post.is_published)}
                                                className={`px-3 py-1 font-mono text-[10px] uppercase rounded border transition-all ${post.is_published ? 'border-[var(--neon)] text-[var(--neon)]' : 'border-red-500/50 text-red-500/70'}`}
                                            >
                                                {post.is_published ? 'Published' : 'Draft'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Enquiries Inbox */}
                        <div className="mech-panel p-6 rounded-xl flex flex-col border border-[var(--border)]">
                            <h2 className="text-2xl font-orbitron flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
                                <Mail className="w-6 h-6 text-[var(--neon)]" /> Enquiries Matrix
                            </h2>
                            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                                {metrics?.enquiries?.map((e, i) => (
                                    <div key={i} className="p-4 bg-[var(--bg2)] rounded border border-[var(--border)] text-sm">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[var(--neon)] font-mono">{e.email}</span>
                                            <span className="text-xs text-[var(--dim)] font-mono">{new Date(e.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-[var(--text)] opacity-80 leading-relaxed">{e.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ) : activeTab === 'services' ? (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-[var(--glass)] rounded transition-colors" title="Back to Overview">
                                <ArrowLeft className="text-[var(--neon)]" />
                            </button>
                            <h2 className="text-2xl font-orbitron mech-text-glow flex items-center gap-3">
                                <Briefcase className="w-6 h-6 text-[var(--neon)]" /> Service Calculator
                            </h2>
                        </div>
                        <button
                            onClick={handleSaveServiceConfig}
                            disabled={configStatus !== 'idle'}
                            className={`px-5 py-2 font-orbitron font-bold rounded flex items-center gap-2 text-sm transition-all ${
                                configStatus === 'saved'
                                    ? 'bg-green-500 text-black shadow-[0_0_15px_#22c55e]'
                                    : 'bg-[var(--neon)] text-[var(--bg)] shadow-[0_0_15px_var(--neon)] hover:scale-[1.02]'
                            }`}
                        >
                            <Save size={16} /> {configStatus === 'saving' ? 'SAVING...' : configStatus === 'saved' ? 'DEPLOYED!' : 'DEPLOY'}
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        <button 
                            onClick={() => {
                                setServiceConfig([
                                    ...serviceConfig, 
                                    {
                                        id: 'new-service-' + Date.now(),
                                        title: 'New Service',
                                        icon: 'Briefcase',
                                        description: '',
                                        startingPrice: '₹0',
                                        basePrice: 0,
                                        enabled: false,
                                        includes: [],
                                        complexityTiers: [
                                            { value: 'mvp', label: 'MVP / Essential', multiplier: 1.0, enabled: true },
                                            { value: 'standard', label: 'Standard / Pro', multiplier: 1.5, enabled: true },
                                            { value: 'advanced', label: 'Advanced / Complex', multiplier: 2.5, enabled: true },
                                            { value: 'enterprise', label: 'Enterprise / Scaled', multiplier: 3.5, enabled: true },
                                            { value: 'custom', label: 'Custom Architecture', multiplier: 4.5, enabled: true }
                                        ]
                                    }
                                ]);
                            }}
                            className="w-full py-4 border-2 border-dashed border-[var(--neon)]/50 text-[var(--neon)] font-orbitron hover:bg-[var(--neon)]/10 transition-colors rounded-xl flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> ADD NEW SERVICE
                        </button>

                        {serviceConfig.map((svc, sIndex) => (
                            <div key={svc.id} className="mech-panel p-6 rounded-xl border border-[var(--border)] flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-2">
                                    <input 
                                        type="text" 
                                        value={svc.title}
                                        onChange={(e) => {
                                            const newCfg = [...serviceConfig];
                                            newCfg[sIndex].title = e.target.value;
                                            setServiceConfig(newCfg);
                                        }}
                                        className="bg-transparent text-xl font-orbitron font-bold text-[var(--neon)] outline-none border-b border-transparent focus:border-[var(--neon)] px-2 py-1 w-1/2"
                                        placeholder="Service Title"
                                    />
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => {
                                                const newCfg = [...serviceConfig];
                                                newCfg[sIndex].enabled = !newCfg[sIndex].enabled;
                                                setServiceConfig(newCfg);
                                            }}
                                            className={`px-3 py-1 font-mono text-[10px] uppercase rounded border transition-all ${
                                                svc.enabled
                                                    ? 'border-[var(--neon)] text-[var(--neon)]'
                                                    : 'border-red-500/50 text-red-500/70'
                                            }`}
                                        >
                                            {svc.enabled ? 'ONLINE' : 'OFFLINE'}
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (confirm(`Delete ${svc.title}?`)) {
                                                    setServiceConfig(serviceConfig.filter((_, i) => i !== sIndex));
                                                }
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-500/20 rounded"
                                            title="Delete Service"
                                            aria-label={`Delete ${svc.title}`}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor={`slug-${sIndex}`} className="text-xs font-mono text-[var(--dim)] uppercase">Slug ID</label>
                                        <input id={`slug-${sIndex}`} value={svc.id} onChange={e => { const c=[...serviceConfig]; c[sIndex].id=e.target.value; setServiceConfig(c); }} className="bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-sm focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor={`icon-${sIndex}`} className="text-xs font-mono text-[var(--dim)] uppercase">Icon (Lucide)</label>
                                        <input id={`icon-${sIndex}`} value={svc.icon} onChange={e => { const c=[...serviceConfig]; c[sIndex].icon=e.target.value; setServiceConfig(c); }} className="bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-sm focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                    </div>
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label htmlFor={`desc-${sIndex}`} className="text-xs font-mono text-[var(--dim)] uppercase">Description</label>
                                        <input id={`desc-${sIndex}`} value={svc.description} onChange={e => { const c=[...serviceConfig]; c[sIndex].description=e.target.value; setServiceConfig(c); }} className="bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-sm focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor={`base-price-${sIndex}`} className="text-xs font-mono text-[var(--dim)] uppercase">Base Price (Number)</label>
                                        <input id={`base-price-${sIndex}`} type="number" value={svc.basePrice} onChange={e => { const c=[...serviceConfig]; c[sIndex].basePrice=Number(e.target.value); setServiceConfig(c); }} className="bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-sm focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor={`start-price-${sIndex}`} className="text-xs font-mono text-[var(--dim)] uppercase">Starting Price Label</label>
                                        <input id={`start-price-${sIndex}`} value={svc.startingPrice} onChange={e => { const c=[...serviceConfig]; c[sIndex].startingPrice=e.target.value; setServiceConfig(c); }} className="bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-sm focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor={`includes-${sIndex}`} className="text-xs font-mono text-[var(--dim)] uppercase mb-2 block">Included Features (Comma Separated)</label>
                                    <textarea 
                                        id={`includes-${sIndex}`}
                                        value={svc.includes.join(', ')} 
                                        onChange={e => { const c=[...serviceConfig]; c[sIndex].includes=e.target.value.split(',').map(s => s.trim()).filter(Boolean); setServiceConfig(c); }}
                                        className="w-full bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-sm focus:border-[var(--neon)] outline-none min-h-[60px] text-[var(--text)]"
                                    />
                                </div>

                                <div className="mt-4 border-t border-[var(--border)] pt-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="text-sm font-orbitron text-[var(--neon)] uppercase">Complexity Tiers</label>
                                        <button 
                                            onClick={() => {
                                                const c = [...serviceConfig];
                                                c[sIndex].complexityTiers.push({ value: 'new-tier', label: 'New Tier', multiplier: 1.0, enabled: true });
                                                setServiceConfig(c);
                                            }}
                                            className="text-xs font-mono px-2 py-1 bg-[var(--bg2)] hover:bg-[var(--neon)]/20 text-[var(--text)] rounded transition-colors"
                                        >
                                            + ADD TIER
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {svc.complexityTiers.map((tier, tIndex) => (
                                            <div key={tIndex} className="flex items-center gap-2">
                                                <input value={tier.value} onChange={e => { const c=[...serviceConfig]; c[sIndex].complexityTiers[tIndex].value=e.target.value; setServiceConfig(c); }} placeholder="id" className="w-1/4 bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-xs focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                                <input value={tier.label} onChange={e => { const c=[...serviceConfig]; c[sIndex].complexityTiers[tIndex].label=e.target.value; setServiceConfig(c); }} placeholder="Label" className="w-1/2 bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-xs focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                                <input type="number" step="0.1" value={tier.multiplier} onChange={e => { const c=[...serviceConfig]; c[sIndex].complexityTiers[tIndex].multiplier=Number(e.target.value); setServiceConfig(c); }} placeholder="1.0" className="w-1/4 bg-[var(--bg2)] border border-[var(--border)] p-2 font-mono text-xs focus:border-[var(--neon)] outline-none text-[var(--text)]" />
                                                <button
                                                    onClick={() => {
                                                        const c = [...serviceConfig];
                                                        c[sIndex].complexityTiers[tIndex].enabled = tier.enabled === false ? true : false;
                                                        setServiceConfig(c);
                                                    }}
                                                    className={`px-2 py-1 font-mono text-[10px] uppercase rounded border transition-all ${
                                                        tier.enabled !== false
                                                            ? 'border-[var(--neon)] text-[var(--neon)]'
                                                            : 'border-red-500/50 text-red-500/70'
                                                    }`}
                                                >
                                                    {tier.enabled !== false ? 'ON' : 'OFF'}
                                                </button>
                                                <button 
                                                    onClick={() => { const c=[...serviceConfig]; c[sIndex].complexityTiers = c[sIndex].complexityTiers.filter((_, i) => i !== tIndex); setServiceConfig(c); }} 
                                                    className="p-2 text-red-500 hover:bg-red-500/20 rounded"
                                                    title="Delete Tier"
                                                    aria-label={`Delete ${tier.label} tier`}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-[var(--border)] pb-4">
                        <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-[var(--glass)] rounded transition-colors" title="Back to Overview">
                            <ArrowLeft className="text-[var(--neon)]" />
                        </button>
                        <h2 className="text-2xl font-orbitron mech-text-glow">
                            {editingPost ? 'EDIT_NODE' : 'GENERATE_POST'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Form Pane */}
                        <div className="mech-panel p-8 rounded-xl flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono text-[var(--neon)] uppercase tracking-widest">Slug (Primary Key)</label>
                                    <input 
                                        type="text" 
                                        value={form.slug}
                                        disabled={!!editingPost}
                                        onChange={(e) => setForm({...form, slug: e.target.value})}
                                        className="w-full bg-[var(--bg2)] border border-[var(--border)] p-3 font-mono text-sm focus:border-[var(--neon)] outline-none"
                                        placeholder="post-url-slug"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono text-[var(--neon)] uppercase tracking-widest">Category</label>
                                    <select 
                                        title="Select Category"
                                        value={form.category}
                                        onChange={(e) => setForm({...form, category: e.target.value as Category})}
                                        className="w-full bg-[var(--bg2)] border border-[var(--border)] p-3 font-mono text-sm focus:border-[var(--neon)] outline-none"
                                    >
                                        <option value="Development">Development</option>
                                        <option value="Architecture">Architecture</option>
                                        <option value="AI">AI</option>
                                        <option value="Security">Security</option>
                                        <option value="Automation">Automation</option>
                                        <option value="Career">Career</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-mono text-[var(--neon)] uppercase tracking-widest">Title</label>
                                <input 
                                    type="text" 
                                    value={form.title}
                                    onChange={(e) => setForm({...form, title: e.target.value})}
                                    className="w-full bg-[var(--bg2)] border border-[var(--border)] p-3 font-orbitron font-bold text-lg focus:border-[var(--neon)] outline-none"
                                    placeholder="Enter Post Title"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-mono text-[var(--neon)] uppercase tracking-widest">Excerpt</label>
                                <textarea 
                                    value={form.excerpt}
                                    onChange={(e) => setForm({...form, excerpt: e.target.value})}
                                    className="w-full bg-[var(--bg2)] border border-[var(--border)] p-3 font-mono text-sm h-24 focus:border-[var(--neon)] outline-none resize-none"
                                    placeholder="Short hook for the blog card..."
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-mono text-[var(--neon)] uppercase tracking-widest">Content (Markdown/MDX)</label>
                                <textarea 
                                    value={form.content}
                                    onChange={(e) => setForm({...form, content: e.target.value})}
                                    className="w-full bg-[var(--bg2)] border border-[var(--border)] p-4 font-mono text-sm h-[400px] focus:border-[var(--neon)] outline-none resize-none leading-relaxed"
                                    placeholder="# Write your thoughts..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono text-[var(--neon)] uppercase tracking-widest">Status / Settings</label>
                                    <div className="flex items-center gap-4 mt-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={form.is_published}
                                                onChange={(e) => setForm({...form, is_published: e.target.checked})}
                                                className="hidden"
                                            />
                                            <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${form.is_published ? 'border-[var(--neon)] bg-[var(--neon)]' : 'border-[var(--border)]'}`}>
                                                {form.is_published && <X size={14} className="text-[var(--bg)] stroke-[3px]" />}
                                            </div>
                                            <span className="text-xs font-mono uppercase tracking-widest">Published</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={form.featured}
                                                onChange={(e) => setForm({...form, featured: e.target.checked})}
                                                className="hidden"
                                            />
                                            <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${form.featured ? 'border-yellow-500 bg-yellow-500' : 'border-[var(--border)]'}`}>
                                                {form.featured && <X size={14} className="text-[var(--bg)] stroke-[3px]" />}
                                            </div>
                                            <span className="text-xs font-mono uppercase tracking-widest">Featured</span>
                                        </label>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleSavePost}
                                    disabled={loading}
                                    className="w-full py-4 bg-[var(--neon)] text-[var(--bg)] font-orbitron font-bold rounded shadow-[0_0_20px_var(--neon)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={20} /> {editingPost ? 'UPDATE_ENTRY' : 'PUBLISH_ENTRY'}
                                </button>
                            </div>
                        </div>

                        {/* Preview Pane */}
                        <div className="mech-panel p-8 rounded-xl flex flex-col gap-4 sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto">
                            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-4">
                                <h3 className="text-xs font-mono text-[var(--dim)] uppercase tracking-widest flex items-center gap-2">
                                    <Eye size={14} /> LIVE_PREVIEW
                                </h3>
                                <span className="text-[var(--neon)] font-mono text-[10px]">
                                    {Math.max(1, Math.ceil(form.content.split(/\s+/).length / 200))} MIN READ
                                </span>
                            </div>

                            <article className="prose prose-invert max-w-none prose-pre:bg-[var(--bg2)] prose-pre:border prose-pre:border-[var(--border)] prose-headings:font-orbitron prose-headings:text-[var(--neon)] prose-a:text-[var(--neon)]">
                                <h1 className="text-4xl">{form.title || 'Post Title'}</h1>
                                {form.excerpt && <p className="text-lg text-[var(--dim)] italic font-mono mb-8">{form.excerpt}</p>}
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {form.content || '*Composition window empty...*'}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
