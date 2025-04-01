import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const updatedResource = await prisma.resource.update({
            where: { id: parseInt(id, 10) },
            data: {
                type: body.type,
                name: body.name,
                identifier: body.identifier,
            },
        });
        return new Response(JSON.stringify(updatedResource), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating resource:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update resource" }),
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const deletedResource = await prisma.resource.delete({
            where: { id: parseInt(id, 10) },
        });
        return new Response(JSON.stringify(deletedResource), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete resource" }),
            { status: 500 }
        );
    }
}
