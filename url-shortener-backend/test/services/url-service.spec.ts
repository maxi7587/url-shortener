jest.mock('../../src/repositories/url-repository');

import { nanoid } from 'nanoid';
import { UrlRepository } from '../../src/repositories/url-repository';
import { UrlService } from '../../src/services/url-service';
import dotenv from 'dotenv';
import { mocked } from "ts-jest/utils";

dotenv.config({path: 'src/config/.env'});
jest.mock('nanoid');
// mock nanoid imported function
const nanoidMock = mocked(nanoid);

describe('UrlService.create', () => {
    // findOne, create, increaseEncodeCount
    const UrlRepositoryMock = <jest.Mock<UrlRepository>>UrlRepository;
    let urlRepository = new UrlRepositoryMock();
    let urlService: UrlService;
    const baseUrl = process.env.BASE_URL;

    beforeEach(() => {
        jest.resetAllMocks();
        urlService = new UrlService(urlRepository);
    });

    it('should create a new short URL and return it', async () => {
        const originalUrl = 'https://www.google.com';
        const urlPath = 'abcde';
        nanoidMock.mockReturnValueOnce(urlPath);
        const expectedUrlData = {
            originalUrl,
            shortUrl: `${baseUrl}/${urlPath}`,
            urlPath,
            redirectCount: 0,
            lastRedirect: null,
            decodeCount: 0,
            lastDecode: null,
            encodeCount: 0,
            lastEncode: new Date(),
            createdAt: new Date()
        };
        const urlRepositoryFindOneSpy = jest.spyOn(urlRepository, 'findOne');
        const urlRepositoryCreateSpy = jest.spyOn(urlRepository, 'create')
            .mockReturnValueOnce(Promise.resolve(expectedUrlData));
        const urlData = await urlService.create(originalUrl);

        // must return the stored data
        expect(urlData).toMatchObject(expectedUrlData);
        // check that the mocked "findOne" method from urlRepository was called once
        expect(urlRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
        // check that the mocked "create" method from urlRepository was called once
        expect(urlRepositoryCreateSpy).toHaveBeenCalledTimes(1);
    });

    it('if original URL has been encoded before, should return an existing short URL', async () => {
        const originalUrl = 'https://www.google.com';
        const urlPath = 'abcde';
        nanoidMock.mockReturnValueOnce(urlPath);
        const expectedUrlData = {
            originalUrl,
            shortUrl: `${baseUrl}/${urlPath}`,
            urlPath,
            redirectCount: 0,
            lastRedirect: null,
            decodeCount: 0,
            lastDecode: null,
            encodeCount: 0,
            lastEncode: new Date(),
            createdAt: new Date()
        };
        const urlRepositoryCreateSpy = jest.spyOn(urlRepository, 'create');
        const urlRepositoryFindOneSpy = jest.spyOn(urlRepository, 'findOne')
            .mockReturnValueOnce(Promise.resolve(expectedUrlData));
        const urlData = await urlService.create(originalUrl);

        // must return the stored data
        expect(urlData).toMatchObject(expectedUrlData);
        // check that the mocked "findOne" method from urlRepository was called once
        expect(urlRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
        // check that the mocked "create" method from urlRepository was NOT called
        expect(urlRepositoryCreateSpy).toHaveBeenCalledTimes(0);
    });

    it('if urlRepository throws an error when creating, should throw the same error', async () => {
        const originalUrl = 'https://www.google.com';
        const urlPath = 'abcde';
        nanoidMock.mockReturnValueOnce(urlPath);
        const urlRepositoryFindOneSpy = jest.spyOn(urlRepository, 'findOne');
        const urlRepositoryCreateSpy = jest.spyOn(urlRepository, 'create')
            .mockImplementationOnce(async () => Promise.reject(new Error('Test dependency error.')))

        // must throw the error received from urlRepository
        await expect(urlService.create(originalUrl)).rejects.toThrow('Test dependency error.');

        // check that the mocked "findOne" method from urlRepository was called once
        expect(urlRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
        // check that the mocked "create" method from urlRepository was called once
        expect(urlRepositoryCreateSpy).toHaveBeenCalledTimes(1);
    });

    it('if urlRepository throws an error on findOne, should throw the same error', async () => {
        const originalUrl = 'https://www.google.com';
        const urlPath = 'abcde';
        nanoidMock.mockReturnValueOnce(urlPath);
        const urlRepositoryFindOneSpy = jest.spyOn(urlRepository, 'findOne')
            .mockImplementationOnce(async () => Promise.reject(new Error('Test dependency error.')))
        const urlRepositoryCreateSpy = jest.spyOn(urlRepository, 'create');

        // must throw the error received from urlRepository
        await expect(urlService.create(originalUrl)).rejects.toThrow('Test dependency error.');

        // check that the mocked "findOne" method from urlRepository was called once
        expect(urlRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
        // check that the mocked "create" method from urlRepository was NOT called
        expect(urlRepositoryCreateSpy).toHaveBeenCalledTimes(0);
    });
});
