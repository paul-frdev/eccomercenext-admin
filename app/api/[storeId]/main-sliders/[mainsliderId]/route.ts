import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { mainsliderId: string } }
) {
  try {
    if (!params.mainsliderId) {
      return new NextResponse('Main Slider id is required', { status: 400 });
    }

    const mainSlider = await prismadb.mainSlider.findUnique({
      where: {
        id: params.mainsliderId,
      },
    });

    return NextResponse.json(mainSlider);
  } catch (error) {
    console.log('[MainSlider_GET]', error);
    return NextResponse.json('internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; mainsliderId: string } }
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
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.mainsliderId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
    }

    const storeByUserId = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prismadb.mainSlider.update({
      where: {
        id: params.mainsliderId,
      },
      data: {
        label,
        images: {
          deleteMany: {},
        },
      },
    });

    const mainSlider = await prismadb.mainSlider.update({
      where: {
        id: params.mainsliderId,
      },
      data: {
        label,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url })),
          },
        },
      },
    });

    return NextResponse.json(mainSlider);
  } catch (error) {
    console.log('[MainSlider_PATCH]', error);
    return NextResponse.json('internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; mainsliderId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.mainsliderId) {
      return new NextResponse('Main Slider id is required', { status: 400 });
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

    const mainSlider = await prismadb.mainSlider.deleteMany({
      where: {
        id: params.mainsliderId,
      },
    });

    return NextResponse.json(mainSlider);
  } catch (error) {
    console.log('[MAINSLIDER_DELETE]', error);
    return NextResponse.json('internal error', { status: 500 });
  }
}
