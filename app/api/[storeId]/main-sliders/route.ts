import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('StoreId is required', { status: 400 });
    }

    const mainSliders = await prismadb.mainSlider.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(mainSliders);
  } catch (error) {
    console.log('[MainSlider_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, images } = body;

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images is required', { status: 400 });
    }

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('StoreId is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const mainSlider = await prismadb.mainSlider.create({
      data: {
        label,
        storeId: params.storeId,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url })),
          },
        },
      },
    });

    return NextResponse.json(mainSlider);
  } catch (error) {
    console.log('[MainSlider_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
