import { verifyAdmin, getAdminSettings, getAdminMetrics } from './actions';
import { getAllPosts } from '@/lib/mdx';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const isAuthorized = await verifyAdmin();
    
    let initialPosts = [];
    let initialSettings = null;
    let metrics = { enquiries: [], subscribers: [] };
    
    if (isAuthorized) {
        initialPosts = await getAllPosts(true);
        initialSettings = await getAdminSettings();
        metrics = await getAdminMetrics();
    }

    return (
        <AdminDashboard 
            isAuthorized={isAuthorized} 
            initialPosts={initialPosts} 
            initialSettings={initialSettings}
            metrics={metrics}
        />
    );
}
