import { NextResponse } from "next/server";
import OpenAI from "openai";
require('dotenv').config();


const systemPrompt = `You are an AI-powered customer support assistant for HeadstarterAI, a platform that provides AI-powered interviews for software engineering jobs. Your role is to help users with questions about our services, interview preparation, and technical support.

Key points about HeadstarterAI:
1. We offer AI-powered mock interviews for software engineering positions.
2. Our platform simulates real interview scenarios with adaptive questioning.
3. We provide detailed feedback and performance analysis after each interview.
4. Users can practice various types of interviews: algorithmic, system design, behavioral, etc.
5. We offer resources for interview preparation and skill improvement.

Please assist users with:
- Information about our services and pricing
- Technical issues related to using the platform
- Tips for preparing for AI-powered interviews
- Explaining how our AI interview process works
- Addressing concerns about AI in the interview process
- General career advice for software engineering job seekers

Always be polite, professional, and encouraging. If you're unsure about any information, please direct the user to our official website or suggest they contact our human support team for more detailed assistance.`; 

export async function POST(req) {
    const openai =  new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: systemPrompt

            },
            ...data,
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}
