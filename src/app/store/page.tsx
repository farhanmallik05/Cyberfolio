import { createClient } from "@/utils/supabase/server";
import StoreClient from "./StoreClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Store | Farhan Mallik",
    description: "Downloadable assets, architectural templates, and pre-built automation layers.",
};

export const revalidate = 3600; // Cache Supabase queries for 1 hour

export default async function StorePage() {
    let products = null;
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            products = data;
        }
    } catch (error) {
        console.error('Failed to initialize Supabase or fetch products:', error);
    }

    return (
        <StoreClient products={products || []} />
    );
}
