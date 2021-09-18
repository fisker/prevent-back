module.exports = {
  assumptions: {
    iterableIsArray: true,
  },
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        exclude: ['proposal-class-properties', 'transform-computed-properties'],
      },
    ],
  ],
}
