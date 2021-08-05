import React from "react";

export class OriginalUrlFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { originalUrl: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({originalUrl: event.target.value});
        if (this.props.onChange) this.props.handleChange(event);
    }

    async handleSubmit(event) {
        await this.props.onSubmit(event, this.state.originalUrl);
    }

    render() {
        const { originalUrl } = this.state;
        const { submitButtonText } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Original URL:
                    <input type="text" value={originalUrl} onChange={this.handleChange}/>
                </label>
                <input disabled={!originalUrl} type="submit" value={submitButtonText}/>
            </form>
        );
    }
}
