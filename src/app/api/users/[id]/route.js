import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
    const awaitedParams = await params;
    const id = parseInt(awaitedParams.id, 10);
    try {
        const body = await request.json();
        const { firstName, lastName, role, identifier } = body;
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
                role,
                identifier: identifier || null,
            },
        });
        return new Response(JSON.stringify(updatedUser), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update user" }),
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const awaitedParams = await params;
    const id = parseInt(awaitedParams.id, 10);
    try {
        await prisma.user.delete({
            where: { id },
        });
        return new Response(
            JSON.stringify({ message: "User deleted successfully" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error deleting user:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete user" }),
            { status: 500 }
        );
    }
}
