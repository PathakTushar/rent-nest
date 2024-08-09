import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: 'Login to reserve this place' }, { status: 401 });
    }


    const body = await request.json();
    const {
        listingId,
        endDate,
        startDate,
        totalPrice,

    } = body;

    if (!listingId || !endDate || !startDate || !startDate) {
        return NextResponse.json({ error: 'Check if you have filled all the details!' }, { status: 401 });
    }


    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });
    return NextResponse.json(listingAndReservation);
}