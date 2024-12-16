// craco.config.js
module.exports = {
    devServer: (devServerConfig) => {
      devServerConfig.allowedHosts = ['localhost'];
      return devServerConfig;
    },
  };
  