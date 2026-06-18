"use server";

import DodoPayments from 'dodopayments';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { sendDeliveryEmail } from '@/lib/email';

const dodo = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY || 'dummy_key'
});

export async function createCheckoutSession(productId: string, formData: FormData) {
    console.log('[createCheckoutSession] Called with productId:', productId);
    const email = formData?.get('email') as string || 'guest@example.com';
    console.log('[createCheckoutSession] Email:', email);
    const supabase = await createClient();
    console.log('[createCheckoutSession] Supabase client created');
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', productId)
        .single();
    console.log('[createCheckoutSession] Product query result:', product ? 'found' : 'not found', error || '');

    if (error || !product) {
        console.error("Product not found", error);
        throw new Error("Product not found");
    }

    if (product.is_free) {
        // Redirect to a free claim page to get the email
        redirect(`/store/${product.slug}/free`);
    }

    const isTest = process.env.NODE_ENV === 'test' || !process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_PAYMENTS_API_KEY === 'dummy_key';
    if (isTest) {
        // Redirect to mock Dodo Payments checkout URL for E2E tests
        redirect(`https://checkout.dodopayments.com/buy/mock_product_123?return_url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/store/success`)}`);
    }

    try {
        const payment = await dodo.payments.create({
            billing: { city: '', country: 'US', state: '', street: '', zipcode: '' },
            customer: { email, name: email.split('@')[0] || 'Guest' },
            product_cart: [{
                product_id: product.id,
                quantity: 1,
            }],
            payment_link: true,
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store/success`,
            metadata: { 
                product_id: product.id 
            }
        });

        if (payment && payment.payment_link) {
            redirect(payment.payment_link);
        } else {
             throw new Error("Failed to get payment link");
        }
    } catch (e: any) {
        if (e.message === "NEXT_REDIRECT") throw e;
        console.error("Payment error:", e);
        throw e;
    }
}

export async function claimFreeProduct(formData: FormData) {
    const productId = formData.get('productId') as string;
    const email = formData.get('email') as string;
    
    if (!productId || !email) {
        throw new Error("Missing required fields");
    }

    const supabase = await createClient();
    const { data: product } = await supabase.from('products').select('*').eq('id', productId).single();

    if (!product || !product.is_free) {
        throw new Error("Product is not free or not found");
    }

    // 1. Add to subscribers
    await supabase.from('subscribers').upsert(
        { email, source: 'free_product_claim' },
        { onConflict: 'email' }
    );

    // 2. Generate signed URL
    const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('store-files')
        .createSignedUrl(product.file_path, 86400); // 24 hrs

    if (signedUrlError || !signedUrlData?.signedUrl) {
        console.error("Error generating signed URL", signedUrlError);
        throw new Error("Could not generate download link");
    }

    // 3. Email the link
    await sendDeliveryEmail(email, product.name, signedUrlData.signedUrl);

    redirect(`/store/success`);
}
