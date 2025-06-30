import type { WebpackPluginInstance } from 'webpack';


import { basename } from 'node:path';

import { defineConfig } from '@lynx-js/rspeedy'

import { LynxTemplatePlugin } from '@lynx-js/template-webpack-plugin';
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'

export default defineConfig({
  output: {
    distPath: {
      js: '',
      jsAsync: '',
    },
    filename: {
      bundle: '[name].lynx.bundle',
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx(),
    pluginTypeCheck(),
  ],
  tools: {
    rspack: {
      plugins: [
        // {
        //   apply(compiler) {
        //     compiler.hooks.thisCompilation.tap('AsyncChunkNameFixPlugin', (compilation) => {
        //       // LynxTemplatePlugin uses Compilation type from Webpack
        //       const hooks = LynxTemplatePlugin.getLynxTemplatePluginHooks(compilation);
        //       // Omit the sub directory prefix from async chunk names
        //       hooks.asyncChunkName.tap('AsyncChunkNameFixPlugin', (chunkName) =>
        //         chunkName ? basename(chunkName) : chunkName,
        //       );
        //     });
        //   },
        // } satisfies WebpackPluginInstance,
      ]
    },
    // bundlerChain(chain) {
    //   // Omit the default `async/` prefix for async chunk names
    //   chain
    //     .plugin('lynx:template-main')
    //     .tap((args) => [
    //       { ...args[0], lazyBundleFilename: '[name]-[fullhash].lynx.bundle' },
    //       ...args.slice(1),
    //     ]);
    // },
  }
})
