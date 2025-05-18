import type { NextApiRequest, NextApiResponse } from "next";
import getEvents from "@/backend/events";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const events = getEvents();
    res.status(200).json(events);
}
