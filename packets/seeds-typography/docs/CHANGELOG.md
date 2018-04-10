## Changelog

### v0.5.2

- **Updated** Under-the-hood dependency fix

### v0.5.1
- **Deprecated** `Family cleanSanchez` is no longer used by Bambu and will be removed from SEEDS soon.
- **Deprecated** `weight regular` is now `weight normal` to better align with CSS property values.

### v0.5.0
- **New** Added support for tokens as CSS custom properties. To use them, `@import seeds-typography/dist/seeds-typography.css` and refer to the token names in the documentation.

### v0.4.2
- **Fixed** Fixed documentation of Javascript tokens. Were showing objects for all values, but only type scale values are objects; the rest of the values are simple constants.

### v0.4.1

- **Deprecated** The Sketch Text Styles plugin has not been updated for the latest versions of Sketch. It has been removed from the docs until another solution is determined.

### v0.4.0

- **New** For better cross-browser fallbacks and to solve issues like odd emoji rendering, our official font stacks should default to system fonts like San Francisco.
- **Updated** Shows Sass vars instead of mixins for font size and font weight values