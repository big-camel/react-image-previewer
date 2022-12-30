> ### This warehouse is forked from https://github.com/MinJieLiu/react-photo-view
> ### Since the update of [react-photo-view](https://github.com/MinJieLiu/react-photo-view) is no longer timely, this repository was created.
> ### You can see this pr https://github.com/MinJieLiu/react-photo-view/pull/140 for the updated content of this warehouse

# react-image-previewer

**English** | [中文](./README.zh-CN.md)

**An exquisite React photo preview component.**

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Minified size][min-size-image]][bundlephobia-url]
[![Gzip size][gzip-size-image]][bundlephobia-url]

![example](./example.gif)

## Quick start

- [Getting Started](https://react-image-previewer.vercel.app)
- [Basic usage](https://react-image-previewer.vercel.app/docs/getting-started)
- [API](https://react-image-previewer.vercel.app/docs/api)
- [Change log](https://react-image-previewer.vercel.app/docs/change-log)

## features

- Support touch gestures, drag and pan physical effect sliding, two-finger specified position to zoom in and out
- All aspects of animation connection, open and close the rebound touch edge, let the natural interaction effect
- The image is adaptive, with a suitable initial rendering size, and adapts according to the adjustment
- Support for custom previews like `<video>` or any `HTML` element
- Keyboard navigation, drag mode **supports free dragging in the view, zooming according to the size of the picture**, perfectly adapted to the desktop
- Support custom node expansion, easy to achieve full-screen preview, rotation control, picture introduction and more functions
- Based on `typescript`, `7KB Gzipped`, supports server-side rendering
- Simple and easy to use `API`, zero cost to get started

## Install

```bash
yarn add react-image-previewer
```

## Basic usage:

```js
import { PhotoProvider, PhotoView } from 'react-image-previewer';

function App() {
  return (
    <PhotoProvider>
      <PhotoView src="/1.jpg">
        <img src="/1-thumbnail.jpg" alt="" />
      </PhotoView>
    </PhotoProvider>
  );
}
```

## License

Apache-2.0 © [MinJieLiu](https://github.com/MinJieLiu)

[npm-image]: https://img.shields.io/npm/v/react-image-previewer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-image-previewer
[downloads-image]: http://img.shields.io/npm/dm/react-image-previewer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-image-previewer
[min-size-image]: https://badgen.net/bundlephobia/min/react-image-previewer?label=minified
[gzip-size-image]: https://badgen.net/bundlephobia/minzip/react-image-previewer?label=gzip
[bundlephobia-url]: https://bundlephobia.com/result?p=react-image-previewer
