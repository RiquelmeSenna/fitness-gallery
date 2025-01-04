import { prisma } from '../libs/prisma'

export const createGallery = async (title: string) => {
    const newGallery = await prisma.gallery.create({ data: { title } })

    return newGallery
}

export const getGalleries = async () => {
    const galleries = await prisma.gallery.findMany({
        orderBy: { id: 'desc' },
        include: {
            photos: {
                select: { filename: true },
                take: 1,
                orderBy: { id: 'asc' }
            }
        }
    });

    const galleriesWithThumb = galleries.map(item => ({
        id: item.id,
        title: item.title,
        thumb: item.photos[0] ?
            `${process.env.BASE_URL}/images/thumb/${item.photos[0].filename}` : null
    }))

    return galleriesWithThumb
}