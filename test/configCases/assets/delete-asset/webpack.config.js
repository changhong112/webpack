"use strict";

const TerserPlugin = require("terser-webpack-plugin");
const { BannerPlugin, Compilation } = require("../../../../");

/** @type {import("../../../../").Configuration} */
module.exports = {
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: {
					filename: "LICENSES.txt"
				}
			})
		],
		chunkIds: "named"
	},
	devtool: "source-map",
	plugins: [
		new BannerPlugin({
			banner: "Test"
		}),
		(compiler) => {
			compiler.hooks.compilation.tap("Test", (compilation) => {
				compilation.hooks.processAssets.tap(
					{
						name: "Test",
						stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
					},
					() => {
						compilation.deleteAsset("chunk2_js.bundle0.js");
					}
				);
				compilation.hooks.processAssets.tap(
					{
						name: "Test",
						stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE
					},
					() => {
						expect(compilation.getAsset("chunk_js.bundle0.js")).toBeDefined();
						expect(
							compilation.getAsset("chunk_js.bundle0.js.map")
						).toBeDefined();
						expect(compilation.getAsset("LICENSES.txt")).toBeDefined();
						// TODO: terser-webpack-plugin should set related info
						compilation.updateAsset(
							"chunk_js.bundle0.js",
							compilation.assets["chunk_js.bundle0.js"],
							{
								related: { license: "LICENSES.txt" }
							}
						);
						compilation.updateAsset(
							"bundle0.js",
							compilation.assets["bundle0.js"],
							{
								related: { license: "LICENSES.txt" }
							}
						);
						compilation.deleteAsset("chunk_js.bundle0.js");
						expect(compilation.getAsset("chunk_js.bundle0.js")).toBeUndefined();
						expect(
							compilation.getAsset("chunk_js.bundle0.js.map")
						).toBeUndefined();
						expect(
							compilation.getAsset("chunk2_js.bundle0.js")
						).toBeUndefined();
						expect(
							compilation.getAsset("chunk2_js.bundle0.js.map")
						).toBeUndefined();
						expect(compilation.getAsset("LICENSES.txt")).toBeDefined();
					}
				);
			});
		}
	]
};
