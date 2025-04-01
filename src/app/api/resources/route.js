import prisma from "@/lib/prisma";

export async function GET(request) {
    try {
        // Extract type query parameter if present
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        let whereClause = {};
        if (type) {
            whereClause = { type: type };
        }

        // Fetch resources with or without type filter
        const resources = await prisma.resource.findMany({
            where: whereClause,
        });

        return new Response(JSON.stringify(resources), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch resources" }),
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const newResource = await prisma.resource.create({
            data: {
                type: body.type,
                name: body.name,
                identifier: body.identifier,
            },
        });
        return new Response(JSON.stringify(newResource), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating resource:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create resource" }),
            { status: 500 }
        );
    }
}
