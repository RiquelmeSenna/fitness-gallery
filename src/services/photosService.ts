import { v4 } from "uuid"
import { prisma } from "../libs/prisma"
import sharp from "sharp"
import fs from 'fs/promises'

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

export const handleRawPhoto = async (tmpPath: string) => {
    const newName = v4() + '.jpg';

    const image = await sharp(tmpPath)
        .resize(1000, 1000, {
            fit: 'cover'
        })
        .toBuffer();

    await sharp(image)
        .resize(200)
        .toFile(`./public/images/thumb/${newName}`);

    await sharp(image)
        .composite([{ input: './assets/gon.png', gravity: 'center' }])
        .toFile(`./public/images/${newName}`);


    setTimeout(async () => {
        await fs.unlink(tmpPath)
    }, 100)

    return newName
}

export const createPhoto = async (galleryId: number, filename: string) => {
    const newPhoto = await prisma.photo.create({ data: { filename, galleryId } })

    return newPhoto
}