'use strict';

module.exports = (isDev, appLoader) => {
    const devEntry = [
        'react-hot-loader/patch',
        // activate HMR for React

        appLoader,
    ];

    const prodEntry = [
        appLoader,
    ];
    return isDev ? devEntry : prodEntry;
};
