import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  console.log("Session in API:", session);

  // Ensure the user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const masterclass = await prisma.masterclass.findUnique({ where: { id: String(id) } });
      if (!masterclass) return res.status(404).json({ message: "Masterclass not found" });
      return res.status(200).json(masterclass);
    } catch (error) {
      console.error("Error fetching masterclass:", error);
      return res.status(500).json({ message: "Failed to fetch masterclass" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { title, subtitle, videoLink, imageLink, time, duration, actionGuide, topics, interactions } = req.body;
  
      // Ensure interactions is correctly formatted as a string
      const formattedInteractions = typeof interactions === "string" ? interactions : JSON.stringify(interactions);
  
      const updatedMasterclass = await prisma.masterclass.update({
        where: { id: String(id) },
        data: {
          title,
          subtitle,
          videoLink,
          imageLink,
          time,
          duration,
          actionGuide,
          topics,
          interactions: formattedInteractions, // 🔹 Ensure it's a string
        },
      });
  
      return res.status(200).json(updatedMasterclass);
    } catch (error) {
      console.error("Error updating masterclass:", error);
      return res.status(500).json({ message: "Failed to update masterclass" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.masterclass.delete({ where: { id: String(id) } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete masterclass" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}