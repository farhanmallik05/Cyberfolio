/* eslint-disable */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const ogSchema = z.object({
  title: z.string().optional().default('Neural Architect'),
  category: z.string().optional().default('TRANSMISSION')
});

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        
        const rawParams = {
            title: searchParams.get('title') || undefined,
            category: searchParams.get('category') || undefined
        };
        
        const parsed = ogSchema.safeParse(rawParams);
        if (!parsed.success) {
             return new Response(`Invalid parameters: ${parsed.error.message}`, { status: 400 });
        }
        
        const { title, category } = parsed.data;

        const styles = {
            container: {
                height: '100%', width: '100%', display: 'flex', flexDirection: 'column' as const,
                alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#070C1A',
                backgroundImage: 'linear-gradient(to bottom right, #070C1A, #0D1425)',
                padding: '80px', position: 'relative' as const,
            },
            gridOverlay: {
                position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', opacity: 0.1,
                backgroundImage: 'linear-gradient(#00F5FF 1px, transparent 1px), linear-gradient(90deg, #00F5FF 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            },
            contentWrapper: { display: 'flex', flexDirection: 'column' as const, zIndex: 10 },
            categoryContainer: { display: 'flex', alignItems: 'center', marginBottom: '40px' },
            categoryLabel: {
                padding: '8px 16px', backgroundColor: '#00F5FF', borderRadius: '2px',
                color: '#070C1A', fontSize: '24px', fontFamily: 'sans-serif',
                fontWeight: 'bold' as const, textTransform: 'uppercase' as const, letterSpacing: '2px',
            },
            titleText: {
                fontSize: '80px', fontWeight: 'bold' as const, fontFamily: 'sans-serif', color: 'white',
                lineHeight: 1.1, marginBottom: '60px', maxWidth: '1000px', display: 'flex',
            },
            footerContainer: { display: 'flex', alignItems: 'center', marginTop: 'auto' as const },
            logoBox: {
                width: '64px', height: '64px', backgroundColor: '#0D1425',
                border: '2px solid #00F5FF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginRight: '24px',
            },
            logoText: { color: '#00F5FF', fontSize: '24px', fontFamily: 'sans-serif', fontWeight: 'bold' as const },
            footerTextColumn: { display: 'flex', flexDirection: 'column' as const },
            authorText: { color: 'white', fontSize: '26px', fontFamily: 'sans-serif' },
            subtitleText: { color: '#00F5FF', fontSize: '18px', fontFamily: 'sans-serif', letterSpacing: '4px' },
            accentBar: {
                position: 'absolute' as const, right: '60px', top: '60px', bottom: '60px', width: '2px',
                backgroundImage: 'linear-gradient(to bottom, transparent, #00F5FF, transparent)',
            }
        };

        return new ImageResponse(
            (
                <div style={styles.container}>
                    {/* Futuristic Grid Overlay */}
                    <div style={styles.gridOverlay} />

                    {/* Content Wrapper */}
                    <div style={styles.contentWrapper}>
                        <div style={styles.categoryContainer}>
                            <div style={styles.categoryLabel}>
                                {category}
                            </div>
                        </div>

                        <div style={styles.titleText}>
                            {title}
                        </div>

                        <div style={styles.footerContainer}>
                            <div style={styles.logoBox}>
                                <span style={styles.logoText}>FM</span>
                            </div>
                            <div style={styles.footerTextColumn}>
                                <span style={styles.authorText}>FARHAN MALLIK</span>
                                <span style={styles.subtitleText}>NEURAL_ARCHITECT // BLOG_LOGS</span>
                            </div>
                        </div>
                    </div>

                    {/* Accent Bar */}
                    <div style={styles.accentBar} />
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error('OG API Error:', e);
        return new Response(`OG Generation Error: ${e.message}`, { status: 500 });
    }
}
