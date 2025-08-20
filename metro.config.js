const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname, {
	// Ensure cache is properly initialized
	isCSSEnabled: true,
});

// Add path mapping for @ alias
config.resolver = {
	...config.resolver,
	unstable_conditionNames: ["browser"],
	unstable_enablePackageExports: false,
	alias: {
		...config.resolver.alias,
		"@": path.resolve(__dirname, "."),
	},
};

// Ensure cache configuration is present
config.cacheStores = config.cacheStores || [];

module.exports = withNativeWind(config, { input: "./global.css" });
