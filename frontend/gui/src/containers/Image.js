import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageDetail, { ImageList } from "../components/Image";
import { backendEndpoints } from "../routes/routes";

export const ImageDetailContainer = (props) => {
    const [image, setImage] = useState({});

    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`${backendEndpoints.api.images}/${id}`).then((res) => {
            setImage(res.data);
        });
    });

    return <ImageDetail image={image} />;
};

export const ImageListContainer = (props) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(backendEndpoints.api.images).then((res) => {
            setImages(res.data);
        });
    });

    return <ImageList images={images} />;
};

export default ImageDetailContainer;
