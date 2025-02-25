import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Fix: Correctly use `getServerSession`
  const session = await getServerSession(req, res, authOptions);

  console.log("Session in API:", session);

  if (!session || !session.user || session.user.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }

  if (req.method === "GET") {
    try {
      const masterclasses = await prisma.masterclass.findMany();
      return res.status(200).json(masterclasses);
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch masterclasses" });
    }
  }

  if (req.method === "POST") {
    const { title, subtitle, videoLink, imageLink, time, duration, actionGuide, topics, interactions } = req.body;

    if (!title || !subtitle || !videoLink || !time || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const newMasterclass = await prisma.masterclass.create({
        data: {
          title,
          subtitle,
          videoLink,
          imageLink: imageLink || null,
          time,
          duration,
          actionGuide: actionGuide || null,
          topics: topics || [],
          interactions: JSON.stringify(interactions), // Ensure interactions are stored as a JSON string
        },
      });

      return res.status(201).json(newMasterclass);
    } catch (err) {
      return res.status(500).json({ message: "Failed to create masterclass" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}