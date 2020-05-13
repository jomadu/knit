import React from 'react';
import {Route} from 'react-router-dom';
import ImageDetailContainer, {ImageListContainer} from './containers/Image';

const BaseRouter = () => {
    return (
        <div>
            <Route exact path='/' component={ImageListContainer} />
            <Route exact path='/:imageID' component={ImageDetailContainer} />
        </div>
    );
}

export default BaseRouter;