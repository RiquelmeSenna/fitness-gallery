import { RequestHandler } from "express";
import * as galleryService from '../services/galleryService'

export const createGallery: RequestHandler = async (req, res) => {
    const { title } = req.body;

    if (title && title.length > 2) {
        const newGallery = await galleryService.createGallery(title)
        res.status(201).json({ gallery: newGallery })

    } else {
        res.json({ error: 'Galeria sem titulo' })
    }
}