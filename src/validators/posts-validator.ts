import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputModelValidation } from "../middlewares/inputModel/input-model-validation";
import { BlogRepository } from "../repositories/blog-repository";

const titleValidation = body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('Incorrect title!');

const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('Incorrect shortDescription!');

const contentValidation = body('content').isString().trim().isLength({min: 1, max: 1000}).withMessage('Incorrect content!');

const blogIdValidation = body('blogId').isString().trim().custom((value) => {
    const blog = BlogRepository.getBlogById(value);

    if(!blog){
        throw new Error('Incorrect blogId!')
    }

    return true;
}).withMessage('Incorrect blogId!');

export const postPostValidation = () => [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputModelValidation];