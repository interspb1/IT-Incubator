import request from 'supertest';
import { app } from '../src/settings';

describe('/videos',() => {
    
    beforeAll(async() =>{
        await request(app).delete('/__tests__/data')
    });

    it('it should not creates the video with incorrect data (no title, no author)', async () => {
        await request(app)
            .post('/videos')
            .send({ title: '', author: ''})
            .expect(400, {
                errorsMessages: [
                    { message: 'Invalid title', field: 'title' },
                    { message: 'Invalid author', field: 'author' },
                ],
            })

        await request(app)
            .get('/videos')
            .expect(200)
    });

    it('it should creates the video with correct data', async () => {
        const createResponse = await request(app) 
            .post('/videos')
            .send({ title: 'The First HW', author: 'AP'})
            .expect(201)
        
        const createVideo = createResponse.body

        expect(createVideo).toEqual({
            id: expect.any(Number),
            title: 'The First HW',
            author: 'AP',
            availableResolutions: expect.any(Array),
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            canBeDownloaded: false,
        })

    });

    it ('it should returns infomation about all videos', async() => {
        await request(app)
            .get('/videos')
            .expect(200)
    });

    it ('it should returns 404 for not expecting video', async() => {
        await request(app)
            .get('/videos/1111')
            .expect(404)
    });

    it('it should not products by ID with incorrect data', async () => {
        await request(app)
            .put('/videos/1111')
            .send({ title: 'title', author: 'title' })
            .expect(404)

        const res = await request(app).get('/videos/')
        expect(res.body[0])
    });

    it('it should not products by ID with incorrect data', async () => {
        await request(app)
            .put('/videos/0')
            .send({ 
                title: 'The First HW', 
                author: 'AP', 
                availableResolutions: expect.any(Array),
                minAgeRestriction: null,
                createdAt: expect.any(String),
                publicationDate: expect.any(String),
                canBeDownloaded: false,
            })
            .expect(204)

        const res = await request(app).get('/videos/')
        expect(res.body[0])
    });
    
    it('it should not DELETE product by incorrect ID', async () => {
        await request(app)
            .delete('/videos/876328')
            .expect(404)

        const res = await request(app).get('/videos/')
        expect(res.body[0])
    });

    it('it should DELETE product by correct ID, auth', async () => {
        await request(app)
            .delete('/testing/all-data')
            .set('authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)

        const res = await request(app).get('/videos')
        expect(res.body.length).toBe(0)
    });

});