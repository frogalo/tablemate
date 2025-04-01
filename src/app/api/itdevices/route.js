import prisma from "@/lib/prisma";

export async function GET(_request) {
    try {
        const devices = await prisma.ITDevice.findMany({
            orderBy: { id: "asc" },
        });
        return new Response(JSON.stringify(devices), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching IT devices:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch IT devices" }),
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, quantity } = body;
        const newDevice = await prisma.iTDevice.create({
            data: {
                name,
                quantity,
                allocated: 0, // new device starts with no allocation
            },
        });
        return new Response(JSON.stringify(newDevice), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating IT device:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create IT device" }),
            { status: 500 }
        );
    }
}
