> ### 此仓库 fork 自 https://github.com/MinJieLiu/react-photo-view
> ### 由于 [react-photo-view](https://github.com/MinJieLiu/react-photo-view) 的更新不再及时，所以创建此仓库。
> ### 此仓库更新的内容可以看这个 pr https://github.com/MinJieLiu/react-photo-view/pull/140

# react-image-previewer

**中文** | [English](./README.md)

**一款超精致的图片预览组件**

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Minified size][min-size-image]][bundlephobia-url]
[![Gzip size][gzip-size-image]][bundlephobia-url]

![example](./.github/example.gif)

## 快速开始

- [文档入口](https://react-image-previewer-example.vercel.app)
- [基本示例](https://react-image-previewer-example.vercel.app/docs/getting-started)
- [API](https://react-image-previewer-example.vercel.app/docs/api)
- [更新日志](https://github.com/big-camel/react-image-previewer/blob/master/packages/core/CHANGELOG.md)

## 特性

- 支持触摸手势，**拖动/平移/物理效果滑动，双指指定位置放大/缩小**
- 全方面动画衔接，**打开/关闭/回弹/触边**，顺其自然的交互效果
- 图像自适应，以一个合适的最初呈现大小，并根据调整自适应
- 支持自定义如 `<video />` 或任意 `HTML` 元素的预览
- 键盘导航，drag模式**支持视图内自由拖拽，按图片大小缩放**，完美适配桌面端
- 支持自定义节点扩展，轻松实现**全屏预览、旋转控制、图片介绍**以及更多功能
- 工具栏UI组件分离，支持自定义工具栏
- 基于 `typescript`，支持服务端渲染
- 简单易用的 `API`，上手零成本

## 安装

```bash
yarn add react-image-previewer
```

## 基本使用:

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

## 使用内置工具栏:

```js
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import { SlideToolbar, CloseButton } from 'react-image-previewer/ui';

function App() {
  return (
    <PhotoProvider overlayRender={props => {
        const { onClose } = props
        return (
          <>
            <SlideToolbar {...props} />
            <CloseButton onClick={onClose} />
          </>
        )
      }}>
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
