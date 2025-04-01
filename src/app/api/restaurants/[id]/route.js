import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        // For simplicity, update only name and email.
        const updatedRestaurant = await prisma.restaurant.update({
            where: { id: parseInt(id, 10) },
            data: {
                name: body.name,
                email: body.email || null,
                // If you need to update menu items as well, that logic can be added here using nested writes.
            },
            include: { menu: true },
        });
        return new Response(JSON.stringify(updatedRestaurant), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating restaurant:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update restaurant" }),
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const restaurantId = parseInt(id, 10);

        // Delete associated menu items first.
        await prisma.menuItem.deleteMany({
            where: { restaurantId },
        });

        // Now delete the restaurant.
        const deletedRestaurant = await prisma.restaurant.delete({
            where: { id: restaurantId },
        });

        return new Response(JSON.stringify(deletedRestaurant), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete restaurant" }),
            { status: 500 }
        );
    }
}
