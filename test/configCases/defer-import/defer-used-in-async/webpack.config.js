"use strict";

/** @type {import("../../../../").Configuration} */
module.exports = {
	target: [`async-node${process.versions.node.split(".").map(Number)[0]}`],
	experiments: {
		topLevelAwait: true,
		deferImport: true
	}
};
