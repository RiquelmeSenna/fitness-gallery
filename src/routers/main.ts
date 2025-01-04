import { Router } from "express";
import * as galleryController from '../controllers/galleryController'
import { upload } from "../libs/multer";

export const mainRouter = Router()

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true })
})

mainRouter.post('/galleries', galleryController.createGallery)
mainRouter.get('/galleries', galleryController.getGalleries)
mainRouter.get('/gallery/:id', galleryController.getGallery)
mainRouter.post('/upload', upload.single('photo'), galleryController.upload)