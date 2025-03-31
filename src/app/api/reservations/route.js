import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const reservations = await prisma.reservation.findMany({
            include: {
                user: true,
                resource: true,
            },
        });
        return NextResponse.json(reservations);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const reservation = await prisma.reservation.create({
            data: {
                userId: data.userId,
                resourceId: data.resourceId,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                status: 'PENDING',
            },
            include: {
                user: true,
                resource: true,
            },
        });
        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
