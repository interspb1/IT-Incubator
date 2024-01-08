import { Request, Response, Router } from "express";
import { BlogRepository } from "../repositories/blog-repository";
import { RequestWithParams, RequestWithBody, RequestWithBodyAndParams, ErrorsMessages, ErrorType } from "../types/common";
import { BlogParams, CreateBlog, UpdateBlog } from "../types/blog/input";
import { authMiddleware } from "../middlewares/auth/auth-middleware";
import { blogPostValidation } from "../validators/blogs-validator";

export const blogRoute = Router();

blogRoute.get('/', (req: Request, res: Response) => {
    const blogs = BlogRepository.getAllBlogs();

    res.send(blogs);
});

blogRoute.get('/:id', authMiddleware, (req: RequestWithParams<BlogParams>, res: Response) =>{
    const id = req.params.id;

    const blog = BlogRepository.getBlogById(id)

    if(!blog){
        res.sendStatus(404);
        return;
     } 
    
     res.send(blog);
});

blogRoute.post('/', authMiddleware, blogPostValidation(), (req: RequestWithBody<CreateBlog>, res: Response) => {
    let errors: ErrorType= {
        errorsMessages: []
    };

    let{name, description, websiteUrl} = req.body;

    if (!name || title.trim().length < 1 || title.trim().length > 40){
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

blogRoute.put('/:id',(req: RequestWithBodyAndParams<BlogParams, UpdateBlog>, res: Response) => {
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

blogRoute.delete('/:id', (req: RequestWithParams<BlogParams>, res: Response)  => {
    for (let i=0; i < videos.length; i++){
        if(videos[i].id === +req.params.id){
            videos.splice(i,1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
}); 