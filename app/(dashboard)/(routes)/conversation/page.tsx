"use client";

import axios from "axios";
import dayjs from "dayjs";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Message } from "@prisma/client";
import { formSchema } from "./constants";

const ConversationPage = () => {
	const router = useRouter();
	const proModal = useProModal();
	const [messages, setMessages] = useState<Omit<Message[], "UserSubscription" | "userSubscriptionId">>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const prompt: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
			const newMessages = [prompt];

			const response = await axios.post<ChatCompletionRequestMessage>("/api/conversation", { messages: newMessages });
			// send user message and bot response to the server
			await axios.put("/api/conversation", { botMessage: response.data.content, userMessage: values.prompt });

			const userMessage = {
				createdAt: new Date(),
				id: Math.random().toString(),
				updatedAt: new Date(),
				content: values.prompt,
				role: "user",
				type: "conversation",
			} as Message;

			const botMessage = {
				createdAt: new Date(),
				id: Math.random().toString(),
				updatedAt: new Date(),
				content: response.data.content as string,
				role: "assistant",
				type: "conversation",
			} as Message;

			setMessages((messages) => [botMessage, userMessage, ...messages] as Message[]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			} else {
				toast.error("Something went wrong.");
				console.log(error);
			}
		} finally {
			router.refresh();
		}
	};

	const fetchConversation = async () => {
		try {
			const response = await axios.get("/api/conversation");
			console.log(response.data);
			setMessages(response.data);
		} catch (error: any) {
			if (error?.response?.status === 404) {
				return;
			} else {
				if (process.env.NODE_ENV === "development") {
					console.log(error);
				}
			}
		} finally {
			router.refresh();
		}
	};

	useEffect(() => {
		fetchConversation();
	}, []);

	return (
		<div>
			<Heading
				title="Conversation"
				description="Our most advanced conversation model."
				icon={MessageSquare}
				iconColor="text-violet-500"
				bgColor="bg-violet-500/10"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isLoading}
												placeholder="Start typing here..."
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && <Empty label="No conversation started." />}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									"p-8 w-full flex items-start gap-x-8 rounded-lg",
									message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
								)}
							>
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
								<p className="text-sm">{message.content}</p>
								{message?.createdAt && (
									<div className=" text-xs text-gray-500 mt-2 ms-auto min-w-max">
										{dayjs(message.createdAt).format("MMM D, h:mm A")}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationPage;
