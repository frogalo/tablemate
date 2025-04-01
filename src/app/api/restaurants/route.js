import prisma from "@/lib/prisma";

export async function GET(_request) {
    try {
        const restaurants = await prisma.restaurant.findMany({
            orderBy: { id: "asc" },
            include: { menu: true },
        });
        return new Response(JSON.stringify(restaurants), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch restaurants" }),
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, menu } = body;
        const newRestaurant = await prisma.restaurant.create({
            data: {
                name,
                email: email || null,
                orderCount: 0,
                menu: { create: menu },
            },
            include: { menu: true },
        });
        return new Response(JSON.stringify(newRestaurant), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating restaurant:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create restaurant" }),
            { status: 500 }
        );
    }
}
