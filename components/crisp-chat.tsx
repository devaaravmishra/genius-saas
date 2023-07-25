"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure("afa20cf2-fe7d-446f-9e2d-81a1e6ab0299");
	}, []);

	return null;
};
