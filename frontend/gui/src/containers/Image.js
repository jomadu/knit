import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageDetail, { ImageList } from "../components/Image";

export const ImageDetailContainer = (props) => {
    const [image, setImage] = useState({});

    useEffect(() => {
        const imageID = props.match.params.imageID;
        axios.get(`http://127.0.0.1:8000/api/images/${imageID}`).then((res) => {
            setImage(res.data);
        });
    });

    return <ImageDetail image={image} />;
};

export const ImageListContainer = (props) => {
    const [images, setImages] = useState({});

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/images/").then((res) => {
            setImages(res.data);
        });
    });

    return <ImageList images={images} />;
};

export default ImageDetailContainer;
