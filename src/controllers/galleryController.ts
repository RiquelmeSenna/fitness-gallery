import { RequestHandler } from "express";
import * as galleryService from '../services/galleryService'
import * as photoService from '../services/photosService'
import fs from 'fs/promises'

export const createGallery: RequestHandler = async (req, res) => {
    const { title } = req.body;

    if (title && title.length > 2) {
        const newGallery = await galleryService.createGallery(title)
        res.status(201).json({ gallery: newGallery })

    } else {
        res.json({ error: 'Galeria sem titulo' })
    }
}

export const getGalleries: RequestHandler = async (req, res) => {
    const galleries = await galleryService.getGalleries()

    res.json({ list: galleries })
}

export const getGallery: RequestHandler = async (req, res) => {
    const { id } = req.params

    if (!id) { return res.status(404).json({ error: 'Mande o id da galeria' }) }

    const gallery = await galleryService.getGallery(parseInt(id))
    const photos = await photoService.getPhotosFromGallery(parseInt(id))

    if (gallery) {
        res.json({ gallery, photos })
    } else {
        res.status(404).json({ error: 'Categoria não encontrada' })
    }
}


export const upload: RequestHandler = async (req, res) => {
    if (req.file) {
        const { gallery } = req.body
        if (gallery) {
            const gal = await galleryService.getGallery(parseInt(gallery))
            if (gal) {
                const filename = await photoService.handleRawPhoto(req.file.path);
                const photo = await photoService.createPhoto(gal.id, filename)

                res.status(201).json({})
            } else {
                await fs.unlink(req.file.path)
                res.json({ error: 'Galeria inexistente' })
            }
        } else {
            await fs.unlink(req.file.path)
            res.json({ error: 'Galeria inexistente' })
        }
    } else {
        res.json({ error: 'Nenhum arquivo enviado' })
    }
}