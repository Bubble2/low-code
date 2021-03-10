import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from '@router';

import 'core-js/es6/map';
import 'core-js/es6/set';

import { ConfigProvider } from '@abiz/rc-aeps';

const render = (App) => {
    ReactDOM.render(
        <ConfigProvider>
            <App/>
        </ConfigProvider>
        , document.getElementById('root'))
};

render(RootRouter);




