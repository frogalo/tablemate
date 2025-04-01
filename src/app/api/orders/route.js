import prisma from "@/lib/prisma";

export async function GET(_request) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                delivery: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch orders" }),
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, itemType, itemId, status } = body;
        // Create new order using properties from the request body.
        const newOrder = await prisma.order.create({
            data: {
                userId,
                itemType,
                itemId,
                status,
            },
        });
        return new Response(JSON.stringify(newOrder), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create order" }),
            { status: 500 }
        );
    }
}
