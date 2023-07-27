"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
const { userId } = useAuth();

const useMessages = (endpoint: string) =>
	useQuery({
		queryKey: ["messages", userId],
		queryFn: async () => {
			const response = await fetch(`/api/${endpoint}`);
			const data = await response.json();
			return data;
		},
	});

export default useMessages;
