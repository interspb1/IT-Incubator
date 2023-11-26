import { VideoType } from "../types/video/output";

type DBType = {
    videos: VideoType[]
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
      }]
};