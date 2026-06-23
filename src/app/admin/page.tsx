import { verifyAdmin, getAdminSettings, getAdminMetrics, getAllProjects, getAllStoreProducts, getStoreOrders } from './actions';
import { getAllPosts } from '@/lib/mdx';
import AdminDashboard from './AdminDashboard';
import { BlogPost } from '@/types/blog';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const isAuthorized = await verifyAdmin();
    
    let initialPosts: (BlogPost & { is_published: boolean })[] = [];
    let initialSettings: { is_available: boolean; service_config: Record<string, unknown> } | null = null;
                                                   
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let metrics: { enquiries: any[]; subscribers: any[] } = { enquiries: [], subscribers: [] };
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let initialProjects: any[] = [];
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let initialStoreProducts: any[] = [];
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let initialStoreOrders: any[] = [];
    
    if (isAuthorized) {
        initialPosts = await getAllPosts(true);
        initialSettings = await getAdminSettings();
        metrics = await getAdminMetrics();
        initialProjects = await getAllProjects();
        initialStoreProducts = await getAllStoreProducts();
        initialStoreOrders = await getStoreOrders();
    }

    return (
        <AdminDashboard 
            isAuthorized={isAuthorized} 
            initialPosts={initialPosts} 
            initialSettings={initialSettings}
            metrics={metrics}
            initialProjects={initialProjects}
            initialStoreProducts={initialStoreProducts}
            initialStoreOrders={initialStoreOrders}
        />
    );
}
