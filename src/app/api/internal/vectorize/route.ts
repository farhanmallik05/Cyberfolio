export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { COLLECTION_NAME, generateEmbedding, initQdrantCollection } from '@/lib/embeddings';
import { qdrantClient } from '@/lib/qdrant';

// Import Typescript data files
import { SERVICES_FAQ } from '@/data/faq';
import { SKILLS } from '@/data/skills';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!qdrantClient) {
        return NextResponse.json({ error: 'Qdrant not configured' }, { status: 500 });
    }

    await initQdrantCollection();

    const points = [];

    // Helper function to read JSON
    const readJson = (filename: string) => {
      const filepath = path.join(process.cwd(), 'src/data', filename);
      if (fs.existsSync(filepath)) {
        return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      }
      return null;
    };

    // 1. Vectorize Projects
    const projects = readJson('projects.json') || [];
    for (const project of projects) {
        const textToEmbed = `Project Title: ${project.title}. Description: ${project.description}. Tech Stack: ${(project.technologies||[]).join(', ')}. Details: ${project.content || ''}`;
        const vector = await generateEmbedding(textToEmbed);
        if (vector.length) {
            points.push({
                id: crypto.randomUUID(), vector,
                payload: { type: 'project', title: project.title, url: `/projects/${project.slug}`, text: textToEmbed }
            });
        }
    }

    // 2. Vectorize Services
    const services = readJson('services.json') || [];
    for (const service of services) {
        const textToEmbed = `Service Offering: ${service.title}. Price: ${service.price}. Description: ${service.description}. Target Audience: ${service.targetAudience}. Features: ${(service.features||[]).join(', ')}`;
        const vector = await generateEmbedding(textToEmbed);
        if (vector.length) {
            points.push({
                id: crypto.randomUUID(), vector,
                payload: { type: 'service', title: service.title, url: `/services/${service.slug}`, text: textToEmbed }
            });
        }
    }

    // 3. Vectorize FAQ
    for (const faq of SERVICES_FAQ) {
        const textToEmbed = `FAQ Question: ${faq.question} Answer: ${faq.answer} Category: ${faq.category || 'general'}`;
        const vector = await generateEmbedding(textToEmbed);
        if (vector.length) {
            points.push({
                id: crypto.randomUUID(), vector,
                payload: { type: 'faq', title: faq.question, url: `/services`, text: textToEmbed }
            });
        }
    }

    // 4. Vectorize About
    const aboutData = readJson('about.json');
    if (aboutData && aboutData.content) {
        for (const section of aboutData.content) {
            const textToEmbed = `About Farhan: ${section.text}`;
            const vector = await generateEmbedding(textToEmbed);
            if (vector.length) {
                points.push({
                    id: crypto.randomUUID(), vector,
                    payload: { type: 'about', title: section.title || 'About Section', url: `/about`, text: textToEmbed }
                });
            }
        }
    }

    // 5. Vectorize Uses (Tools)
    const usesData = readJson('uses.json') || { categories: [] };
    for (const category of usesData.categories || []) {
        for (const tool of category.items || []) {
            const textToEmbed = `Tool Farhan uses: ${tool.name}. Category: ${category.name}. Description: ${tool.description}`;
            const vector = await generateEmbedding(textToEmbed);
            if (vector.length) {
                points.push({
                    id: crypto.randomUUID(), vector,
                    payload: { type: 'uses', title: tool.name, url: `/uses`, text: textToEmbed }
                });
            }
        }
    }

    // 6. Vectorize Certificates
    const certsData = readJson('certificates.json') || [];
    for (const cert of certsData) {
        const textToEmbed = `Certificate/Achievement: ${cert.title} from ${cert.issuer}. Description: ${cert.description}. Type: ${cert.type}`;
        const vector = await generateEmbedding(textToEmbed);
        if (vector.length) {
            points.push({
                id: crypto.randomUUID(), vector,
                payload: { type: 'certificate', title: cert.title, url: `/certificates`, text: textToEmbed }
            });
        }
    }

    // 7. Vectorize Skills
    for (const skill of SKILLS) {
        const textToEmbed = `Skill: ${skill.name}. Category: ${skill.category}. Related to: ${(skill.relatedTo||[]).join(', ')}.`;
        const vector = await generateEmbedding(textToEmbed);
        if (vector.length) {
            points.push({
                id: crypto.randomUUID(), vector,
                payload: { type: 'skill', title: skill.name, url: `/skills`, text: textToEmbed }
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
