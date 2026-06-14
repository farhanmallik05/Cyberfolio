export const runtime = 'nodejs'; // Use Node.js for fs access

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { COLLECTION_NAME, generateEmbedding, initQdrantCollection } from '@/lib/embeddings';
import { qdrantClient } from '@/lib/qdrant';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!qdrantClient) {
        return NextResponse.json({ error: 'Qdrant not configured' }, { status: 500 });
    }

    await initQdrantCollection();

    // 1. Vectorize Projects
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
    
    // 2. Vectorize Services
    const servicesPath = path.join(process.cwd(), 'src/data/services.json');
    const services = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

    const points = [];

    // Process Projects
    for (const project of projects) {
        const textToEmbed = `Project Title: ${project.title}. Description: ${project.description}. Tech Stack: ${project.technologies.join(', ')}. Details: ${project.content || ''}`;
        const vector = await generateEmbedding(textToEmbed);
        if (vector.length) {
            points.push({
                id: crypto.randomUUID(),
                vector,
                payload: {
                    type: 'project',
                    title: project.title,
                    url: `/projects/${project.slug}`,
                    text: textToEmbed
                }
            });
        }
    }

    // Process Services
    for (const service of services) {
        const textToEmbed = `Service Offering: ${service.title}. Price: ${service.price}. Description: ${service.description}. Target Audience: ${service.targetAudience}. Features: ${service.features.join(', ')}`;
        const vector = await generateEmbedding(textToEmbed);
        if (vector.length) {
            points.push({
                id: crypto.randomUUID(),
                vector,
                payload: {
                    type: 'service',
                    title: service.title,
                    url: `/services/${service.slug}`,
                    text: textToEmbed
                }
            });
        }
    }

    if (points.length > 0) {
        await qdrantClient.upsert(COLLECTION_NAME, {
            wait: true,
            points: points
        });
    }

    return NextResponse.json({ success: true, pointsInserted: points.length });
  } catch (error: any) {
    console.error("Vectorize Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
