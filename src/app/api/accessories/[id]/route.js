import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const deletedAccessory = await prisma.iTDevice.delete({
            where: { id: parseInt(id, 10) },
        });
        return new Response(JSON.stringify(deletedAccessory), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting accessory:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete accessory" }),
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const updatedAccessory = await prisma.iTDevice.update({
            where: { id: parseInt(id, 10) },
            data: {
                name: body.name,
                quantity: body.quantity,
                allocated: body.allocated ?? 0,
            },
        });
        return new Response(JSON.stringify(updatedAccessory), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating accessory:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update accessory" }),
            { status: 500 }
        );
    }
}
