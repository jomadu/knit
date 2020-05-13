import React from "react";
import axios from 'axios';
import ImageDetail, {ImageList} from "../components/Image";

class ImageDetailContainer extends React.Component {
    state = {
        image: {}
    };

    componentDidMount() {
        const imageID = this.props.match.params.imageID;
        axios.get(`http://127.0.0.1:8000/api/images/${imageID}`)
        .then(res => {
            this.setState({
                image: res.data
            });
        })
    }

    render() {
        return <ImageDetail image={this.state.image} />;
    }
}


export class ImageListContainer extends React.Component {
    state = {
        images: [],
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/images/')
        .then(res => {
            this.setState({
                images: res.data
            });
        })
    }

    render() {
        return <ImageList images={this.state.images} />;
    }
}

export default ImageDetailContainer;
