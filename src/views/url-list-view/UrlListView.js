import './index.css'
import React from 'react';
import { UrlShortenerService } from "../../services/UrlShortenerService";

export class UrlListView extends React.Component {
    shortUrlProperties = [
        'urlPath',
        'originalUrl',
        'shortUrl',
        'redirectCount',
        'lastRedirect',
        'decodeCount',
        'lastDecode',
        'encodeCount',
        'lastEncode',
        'createdAt'
    ];
    constructor(props) {
        super(props);
        this.state = {originalUrl: '', shortUrls: [], typingTimeoutToRequest: null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (this.state.typingTimeoutToRequest) {
            clearTimeout(this.state.typingTimeoutToRequest);
        }
        const originalUrl = event.target.value;
        const handleSubmit = this.handleSubmit;
        if (originalUrl && originalUrl.length > 2) {
            this.setState({
                typingTimeoutToRequest: setTimeout(async function () {
                    await handleSubmit(event, originalUrl);
                }, 1000)
            });
        }
        this.setState({originalUrl});
    }

    async handleSubmit(event, originalUrl) {
        event.preventDefault();
        UrlShortenerService.getShortUrlsList(originalUrl).then(
            shortUrls => {
                this.setState({shortUrls});
            }
        ).catch(
            err => {
                console.log(`[UrlListView][handleSubmit] ${err.message}`);
                alert(`Error getting URLs list. ${err.message}`);
            }
        );
    }

    render() {
        const { shortUrls, originalUrl } = this.state;
        // const colsWidth = {width: 100/this.shortUrlProperties.length + '%'};
        return (
            <div className={'container'}>
                <h2>Filters</h2>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <label>
                        Original Url:
                        <input type="text" value={originalUrl} onChange={this.handleChange} />
                    </label>
                    <input disabled={!originalUrl} type="button" onClick={this.handleSubmit} value={"Search!"}/>
                </form>
                <table className={'url-table'}>
                    <thead>
                        <tr>
                            { this.shortUrlProperties.map(shortUrlProperty => <th key={shortUrlProperty}>
                                <p>{ shortUrlProperty }</p>
                            </th>) }
                        </tr>
                    </thead>
                    {
                        shortUrls.map(shortUrl => <tbody>
                            <tr key={shortUrl.urlPath}>
                                {
                                    this.shortUrlProperties.map(shortUrlProperty =>
                                        <td key={shortUrl.urlPath + shortUrlProperty}>
                                            <p>{ shortUrl[shortUrlProperty] }</p>
                                        </td>)
                                }
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        );
    }
}
