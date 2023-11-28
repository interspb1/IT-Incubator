import { Request, Response, Router } from "express";
import { PostRepository } from "../repositories/post-repository";
import { RequestWithParams } from "../types/common";
import { PostParams } from "../types/post/input";
import { authMiddleware } from "../middlewares/auth/auth-middleware";
import { postPostValidation } from "../validators/posts-validator";

export const postRoute = Router();

postRoute.get('/', (req: Request, res: Response) => {
    const posts = PostRepository.getAllPosts();

    res.send(posts);
});

postRoute.get('/:id', authMiddleware, (req: RequestWithParams<PostParams>, res: Response) =>{
    const id = req.params.id;

    const post = PostRepository.getPostById(id)

    if(!post){
        res.sendStatus(404);
        return;
     } 
    
     res.send(post);
});

postRoute.post('/videos', authMiddleware, postPostValidation(), (req: RequestWithBody<CreateBody>, res: Response) => {
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

    videos.push(newVideo);

    res.status(201).send(newVideo);
});

postRoute.put('/videos/:id',(req: RequestWithBodyAndParams<Params, UpdateVideoDto>, res: Response) => {
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

    const videoIndex = videos.findIndex(v => v.id == id);
    const video = videos.find(v => v.id == id);

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

    videos.splice(videoIndex, 1, updatedItem);

    res.sendStatus(204);
});

postRoute.delete('/videos/:id', (req: RequestWithParams<Params>, res: Response)  => {
    for (let i=0; i < videos.length; i++){
        if(videos[i].id === +req.params.id){
            videos.splice(i,1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
}); 
