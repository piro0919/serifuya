const path = require("path");
const genericNames = require("generic-names");
const sass = require("@zeit/next-sass");
const css = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  [
    css,
  ],
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
], {
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    APP_ID: process.env.APP_ID,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  },
});
