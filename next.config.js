const path = require("path");
const genericNames = require("generic-names");
const sass = require("@zeit/next-sass");
const css = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  [css],
  [
    sass,
    {
      cssModules: true,
      cssLoaderOptions: {
        getLocalIdent: ({ resourcePath }, _, localName) => {
          const context = process.cwd();

          return genericNames("[path]___[name]__[local]___[hash:base64:5]", {
            context,
          })(localName, path.relative(context, resourcePath));
        },
      },
    },
  ],
]);
