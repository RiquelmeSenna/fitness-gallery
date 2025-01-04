import { prisma } from "../libs/prisma"

export const getPhotosFromGallery = async (galleryId: number) => {
    const photos = await prisma.photo.findMany(
        {
            where: { galleryId },
            select: {
                id: true,
                filename: true
            }
        }
    )

    const photosWithUrl = photos.map(item => ({
        id: item.id,
        thumbs: `${process.env.BASE_URL}/images/thumb/${item.filename}`,
        images: `${process.env.BASE_URL}/images/${item.filename}`
    }))
    return photosWithUrl
}