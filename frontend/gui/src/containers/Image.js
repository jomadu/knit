import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageDetail, { ImageList } from "../components/Image";
import { backend } from "../routes/urls";

export const ImageDetailContainer = (props) => {
    const [image, setImage] = useState({});

    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`${backend.api.images}/${id}`).then((res) => {
            setImage(res.data);
        });
    });

    return <ImageDetail image={image} />;
};

export const ImageListContainer = (props) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(backend.api.images).then((res) => {
            setImages(res.data);
        });
    });

    return <ImageList images={images} />;
};

export default ImageDetailContainer;
