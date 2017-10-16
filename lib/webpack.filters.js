'use strict';

module.exports = class WebpackFilter {
    /**
     * Filters.
     * @param {boolean} isDev - check if it is the development environment.
     */
    constructor(isDev) {
        this.isDev = isDev;
    }

    /**
     * Filter if development.
     * @param {any} then - any object.
     * @return {any|null}
     */
    ifDev(then) {
        return (this.isDev ? then : null);
    }

    /**
     * Filter if production.
     * @param {any} then - any object.
     * @return {any|null}
     */
    ifProd(then) {
        return (!this.isDev ? then : null);
    }

    /**
     * Filter out any nulls.
     * @param {any} i - any object.
     * @return {any}
     */
    nullsOut(i) {
        return i;
    }
};
