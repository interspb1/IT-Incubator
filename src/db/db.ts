import { VideoType } from "../types/video/output";
import { BlogType } from "../types/blog/output";
import { PostType } from "../types/post/output";

type DBType = {
    videos: VideoType[],
    blogs: BlogType[],
    posts: PostType[]
};

export const db = {
    videos: [{
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-10-11T08:26:09.760Z",
        publicationDate: "2023-10-11T08:26:09.760Z",
        availableResolutions: [
            'P144'
        ]
      }],

    blogs: [{
        id: "string",
        name: "string",
        description: "string",
        websiteUrl: "string"
      }],

    posts:  [{
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
      }]
};