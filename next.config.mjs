export default {
    webpack: (config, { isServer }) => {
      config.experiments = {
        asyncWebAssembly: true,  // Enable WebAssembly for async modules
        layers: true,            // Enable Webpack layers to resolve the entryOptions.layer error
      };
  
      return config;
    },
  };
  