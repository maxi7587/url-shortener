import axios from "axios";

export class UrlShortenerService {
    static urlShortenerApiUrl = 'http://localhost:8080';

    static async generateShortUrl(originalUrl) {
        return axios.post(`${UrlShortenerService.urlShortenerApiUrl}/api/encode`, { original_url: originalUrl })
            .then(res => res.data)
            .catch(err => {
                console.log(`[UrlShortenerService][generateShortUrl] ${err}`);
                if (err.response && err.response.data && err.response.data.msg) {
                    throw new Error(err.response.data.msg);
                }
                throw err;
            });
    }
}
