/* eslint-disable */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title') || 'Neural Architect';
        const category = searchParams.get('category') || 'TRANSMISSION';

        return new ImageResponse(
            (
                <div style={{
                    height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#070C1A',
                    backgroundImage: 'linear-gradient(to bottom right, #070C1A, #0D1425)',
                    padding: '80px', position: 'relative',
                }}>
                    {/* Futuristic Grid Overlay */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', opacity: 0.1,
                        backgroundImage: 'linear-gradient(#00F5FF 1px, transparent 1px), linear-gradient(90deg, #00F5FF 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }} />

                    {/* Content Wrapper */}
                    <div style={{ display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                            <div style={{
                                padding: '8px 16px', backgroundColor: '#00F5FF', borderRadius: '2px',
                                color: '#070C1A', fontSize: '24px', fontFamily: 'sans-serif',
                                fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px',
                            }}>
                                {category}
                            </div>
                        </div>

                        <div style={{
                            fontSize: '80px', fontWeight: 'bold', fontFamily: 'sans-serif', color: 'white',
                            lineHeight: 1.1, marginBottom: '60px', maxWidth: '1000px', display: 'flex',
                        }}>
                            {title}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                            <div style={{
                                width: '64px', height: '64px', backgroundColor: '#0D1425',
                                border: '2px solid #00F5FF', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', marginRight: '24px',
                            }}>
                                <span style={{ color: '#00F5FF', fontSize: '24px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>FM</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: 'white', fontSize: '26px', fontFamily: 'sans-serif' }}>FARHAN MALLIK</span>
                                <span style={{ color: '#00F5FF', fontSize: '18px', fontFamily: 'sans-serif', letterSpacing: '4px' }}>NEURAL_ARCHITECT // BLOG_LOGS</span>
                            </div>
                        </div>
                    </div>

                    {/* Accent Bar */}
                    <div style={{
                        position: 'absolute', right: '60px', top: '60px', bottom: '60px', width: '2px',
                        backgroundImage: 'linear-gradient(to bottom, transparent, #00F5FF, transparent)',
                    }} />
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
