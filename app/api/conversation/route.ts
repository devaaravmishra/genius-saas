import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { messages } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!configuration.apiKey) {
			return new NextResponse("OpenAI API Key not configured.", { status: 500 });
		}

		if (!messages) {
			return new NextResponse("Messages are required", { status: 400 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
		}

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages,
		});

		if (!isPro) {
			await incrementApiLimit();
		}

		return NextResponse.json(response.data.choices[0].message);
	} catch (error) {
		console.log("[CONVERSATION_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function GET() {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse("No cloud storage for free trial. Please upgrade to pro.", { status: 404 });
		}

		const messages = await prisma.message.findMany({
			where: {
				userId,
				type: "conversation",
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return new NextResponse(JSON.stringify(messages));
	} catch (error) {
		console.log("[CODE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function PUT(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { content, title } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!content || !title) {
			return new NextResponse("Content and title is required", { status: 400 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse("No cloud storage for free trial. Please upgrade to pro.", { status: 404 });
		}

		const message = await prisma.message.create({
			data: {
				userId,
				type: "conversation",
				title,
				content,
			},
		});

		return new NextResponse(JSON.stringify(message));
	} catch (error) {
		console.log("[CODE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
