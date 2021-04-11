module.exports = {
  presets: [
    [
      // Use config in .browserlistrc to decide the target env
      require('@babel/preset-env'),
      {
        // Preserve ES modules. Leave module handling to Rollup.
        modules: false,
      },
    ],
     require('@babel/preset-react'),
     require('@babel/preset-typescript'),
  ],
  plugins: [
    // Target project using this preset will need @babel/runtime as a run-time dependency
    require('@babel/plugin-transform-runtime'),

    // Stage 3 Proposals
    // Public and private instance fields : https://github.com/tc39/proposal-class-fields
    // Static class features : https://github.com/tc39/proposal-static-class-features
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],

    // Finished Proposal - Published in ES 2020
    // Optional Chaining : https://github.com/tc39/proposal-optional-chaining
    require('@babel/plugin-proposal-optional-chaining'),

    // Finished Proposal - Published in ES 2020
    // https://github.com/tc39-transfer/proposal-nullish-coalescing
    require('@babel/plugin-proposal-nullish-coalescing-operator'),
  ],
}
