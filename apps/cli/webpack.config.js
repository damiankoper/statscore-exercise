const { composePlugins, withNx } = require('@nx/webpack');
const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;

// Nx plugins for webpack.
module.exports = composePlugins(withNx({ target: 'node' }), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // ALT: Not ideal, just for PoC of SWC in NestJS + monorepo
  config.module.rules[2].options = swcDefaultConfig;

  return config;
});
