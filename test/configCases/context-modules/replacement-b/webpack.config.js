"use strict";

const webpack = require("../../../../");

/** @type {import("../../../../").Configuration} */
module.exports = {
	plugins: [new webpack.ContextReplacementPlugin(/replacement.b$/, /^\.\/only/)]
};
