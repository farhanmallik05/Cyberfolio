import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Neural Architect | Farhan Mallik',
    short_name: 'Farhan Mallik',
    description: 'Portfolio and Digital Engineering Hub of Farhan Mallik',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#00f0ff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
