import { Router } from "express";
import * as galleryController from '../controllers/galleryController'

export const mainRouter = Router()

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true })
})

mainRouter.post('/galleries', galleryController.createGallery)