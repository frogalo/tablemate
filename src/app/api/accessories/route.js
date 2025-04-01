import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const accessories = await prisma.iTDevice.findMany();
        return new Response(JSON.stringify(accessories), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching accessories:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch accessories" }),
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const newAccessory = await prisma.iTDevice.create({
            data: {
                name: body.name,
                quantity: body.quantity,
                allocated: body.allocated ?? 0,
            },
        });
        return new Response(JSON.stringify(newAccessory), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating accessory:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create accessory" }),
            { status: 500 }
        );
    }
}
