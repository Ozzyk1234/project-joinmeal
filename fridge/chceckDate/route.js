import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req) => {
    try {
        const allItems = await prisma.Item.findMany({
            where: {
                status: true,
            },
        });
        if (allItems) {
            const currentDate = new Date();
            const localTimezoneOffset = currentDate.getTimezoneOffset() * 60000;
            const localCurrentDate = new Date(currentDate.getTime() - localTimezoneOffset);
            for (const item of allItems) {
                if (localCurrentDate > item.expiryDate) {
                    await prisma.item.update({
                        where: {
                            id: item.id,
                        },
                        data: {
                            status: false,
                        },
                    });
                }
            }
            return new NextResponse(JSON.stringify({ success: true }));
        } else {
            return new NextResponse(JSON.stringify({ success: false }));
        }
    } catch (error) {
        console.error('Błąd podczas sprawdzania daty przedmiotów z bazy (lodowka):', error);
        return new NextResponse(JSON.stringify({ success: false, error: error }));
    } finally {
        if (prisma.$isConnected) {
            await prisma.$disconnect();
        }
    }
};

export { GET };
