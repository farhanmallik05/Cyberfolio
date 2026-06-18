import { verifyAdmin, getAdminSettings, getAdminMetrics, getAllProjects } from './actions';
import { getAllPosts } from '@/lib/mdx';
import AdminDashboard from './AdminDashboard';
import { BlogPost } from '@/types/blog';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const isAuthorized = await verifyAdmin();
    
    let initialPosts: (BlogPost & { is_published: boolean })[] = [];
    let initialSettings: { is_available: boolean; service_config: Record<string, unknown> } | null = null;
    let metrics: { enquiries: any[]; subscribers: any[] } = { enquiries: [], subscribers: [] };
    let initialProjects: any[] = [];
    
    if (isAuthorized) {
        initialPosts = await getAllPosts(true);
        initialSettings = await getAdminSettings();
        metrics = await getAdminMetrics();
        initialProjects = await getAllProjects();
    }

    return (
        <AdminDashboard 
            isAuthorized={isAuthorized} 
            initialPosts={initialPosts} 
            initialSettings={initialSettings}
            metrics={metrics}
            initialProjects={initialProjects}
        />
    );
}
