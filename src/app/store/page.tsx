import { createClient } from "@/utils/supabase/server";
import StoreClient from "./StoreClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Store | Farhan Mallik",
    description: "Downloadable assets, architectural templates, and pre-built automation layers.",
};

export default async function StorePage() {
    const supabase = await createClient();
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <StoreClient products={products || []} />
    );
}
