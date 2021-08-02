import React from 'react';
import { UrlShortenerService } from "../../services/UrlShortenerService";
import {OriginalUrlFormComponent} from "../../components/OriginalUrlFormComponent";

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

    async handleSubmit(event, originalUrl) {
        event.preventDefault();
        UrlShortenerService.generateShortUrl(originalUrl).then(
            shortUrlData => {
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
        const { shortUrl } = this.state;
        return (
            <div className={'container'}>
                <h2>Generate short URL</h2>
                <p>Hint: your URL must start with <b>http://</b> or <b>https://</b>.</p>
                <OriginalUrlFormComponent submitButtonText={'Generate!'} onSubmit={this.handleSubmit}/>
                {
                    shortUrl && <>
                        <h3>Your short URL is:</h3>
                        <a href={shortUrl} target={'_blank'}>
                            <code>
                                {shortUrl}
                            </code>
                        </a>
                    </>
                }
            </div>
        );
    }
}
