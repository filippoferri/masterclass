import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { name, email, masterclassId } = req.body;

        const response = await fetch("https://api.sendfox.com/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.SENDFOX_AUTHORIZATION_CODE}`, // Use server-side env variables
            },
            body: JSON.stringify({
                email,
                first_name: name,
                lists: [523840],
                countdownUrl: `/countdown?id=${masterclassId}&name=${encodeURIComponent(name)}`,
            }),
        });

        if (!response.ok) {
            throw new Error(`SendFox API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error: any) {
        console.error("SendFox API Error:", error);
        return res.status(500).json({ message: "Failed to register user", error: error.message });
    }
}