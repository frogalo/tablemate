import prisma from "@/lib/prisma";

export async function GET(_request) {
    try {
        const users = await prisma.user.findMany();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch users" }),
            { status: 500 }
        );
    }
}

export async function POST(_request) {
    try {
        const body = await _request.json();
        const { firstName, lastName, role, identifier } = body;
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                role,
                identifier: identifier || null,
            },
        });
        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create user" }),
            { status: 500 }
        );
    }
}
