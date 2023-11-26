import { Request, Response, Router } from "express";
import { CreateVideoDto, UpdateVideoDto, Params } from "../types/video/input";
import { RequestWithParams, RequestWithBody, RequestWithBodyAndParams, ErrorType, ErrorsMessages } from "../types/common";
import { AvailableResolutions } from "../types/video/output";
import { db } from "../db/db";

export const videoRoute = Router();

videoRoute.get('/videos', (req: Request, res: Response) => {
    res.send(db.videos);
});

videoRoute.get('/videos/:id', (req: RequestWithParams<Params>, res: Response) =>{
    const id = +req.params.id;

    const video = db.videos.find((video) => video.id == id);

    if(!video){
        res.sendStatus(404);
        return;
     } 
    
     res.send(video);
});

videoRoute.post('/videos', (req: RequestWithBody<CreateVideoDto>, res: Response) => {
    let errors: ErrorType= {
        errorsMessages: []
    };

    let{title, author, availableResolutions} = req.body;

    if (!title || title.trim().length < 1 || title.trim().length > 40){
        errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
    };

    if (!author || author.trim().length < 1 || author.trim().length > 20){
        errors.errorsMessages.push({message: 'Invalid author', field: 'author'})
    };

    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((r) => {
            !AvailableResolutions.includes(r) && errors.errorsMessages.push({
                message: 'Invalid availableResolutions',
                field: 'availableResolutions'
            });
        });
    } else {
        availableResolutions = [];
    };

    if(errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    };

    const createdAt: Date = new Date();
    const publicationDate: Date = new Date();

    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideo = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions,
    };

    db.videos.push(newVideo);

    res.status(201).send(newVideo);
});

videoRoute.put('/videos/:id',(req: RequestWithBodyAndParams<Params, UpdateVideoDto>, res: Response) => {
    const id = +req.params.id;

    let errors: ErrorType= {
        errorsMessages: []
    };

    let{title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body;

    if (!title || title.trim().length < 1 || title.trim().length > 40){
        errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
    };

    if (!author || author.trim().length < 1 || author.trim().length > 20){
        errors.errorsMessages.push({message: 'Invalid author', field: 'author'})
    };

    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((r) => {
            !AvailableResolutions.includes(r) && errors.errorsMessages.push({
                message: 'Invalid availableResolutions',
                field: 'availableResolutions'
            });
        });
    } else {
        availableResolutions = [];
    };

    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean'){
        errors.errorsMessages.push({message: 'Invalid canBeDownloaded', field: 'canBeDownloaded'});
    };

    if (!publicationDate || typeof publicationDate === 'number'){
        errors.errorsMessages.push({message: 'publicationDate', field: 'publicationDate'});
    };

    if (typeof minAgeRestriction != 'undefined' && typeof minAgeRestriction == 'number'){
         minAgeRestriction < 1 || minAgeRestriction > 18 && errors.errorsMessages.push({
            message: 'Invalid minAgeRestriction', 
            field: 'minAgeRestriction'
        });
    } else {
        minAgeRestriction = null;
    };

    if(errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    };

    const videoIndex = db.videos.findIndex(v => v.id == id);
    const video = db.videos.find(v => v.id == id);

    if (!video){
        res.sendStatus(404);
        return;
    };

    const updatedItem = {
        ...video,
        canBeDownloaded,
        minAgeRestriction,
        title,
        author,
        availableResolutions,
        publicationDate: publicationDate ? publicationDate : video.publicationDate
    };

    db.videos.splice(videoIndex, 1, updatedItem);

    res.sendStatus(204);
});

videoRoute.delete('/videos/:id', (req: RequestWithParams<Params>, res: Response)  => {
    for (let i=0; i < db.videos.length; i++){
        if(db.videos[i].id === +req.params.id){
            db.videos.splice(i,1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
}); 

videoRoute.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos.length = 0;
    res.sendStatus(204);
})