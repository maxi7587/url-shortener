import React from 'react';
import { UrlShortenerService } from "../services/UrlShortenerService";

export class CreateShortUrlFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {originalUrl: '', shortUrl: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({originalUrl: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        UrlShortenerService.generateShortUrl(this.state.originalUrl).then(
            shortUrlData => {
                console.log('shortUrlData');
                console.log(shortUrlData);
                this.setState({shortUrl: shortUrlData.short_url});
            }
        ).catch(
            err => {
                console.log(`[CreateShortUrlForm][handleSubmit] ${err.message}`);
                alert(`Error generating short URL. ${err.message}`);
            }
        );
    }

    render() {
        const { shortUrl, originalUrl } = this.state;
        return (
            <>
                <h2>Generate short URL</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Original Url:
                        <input type="text" value={originalUrl} onChange={this.handleChange} />
                    </label>
                    <input disabled={!originalUrl} type="button" onClick={this.handleSubmit} value={"Generate!"}/>
                </form>
                {
                    shortUrl && <>
                        <h3>Your short URL is:</h3>
                        <p>
                            {shortUrl}
                        </p>
                    </>
                }
            </>
        );
    }
}
