import { db } from "../db/db";

export class PostRepository{
    static getAllPosts(){
        return db.posts;
    };

    static getPostById(id:string){
        const post = db.posts.find(p => p.id == id);
        
        if(!post){
            return null;
        }

        return post;
    };
};