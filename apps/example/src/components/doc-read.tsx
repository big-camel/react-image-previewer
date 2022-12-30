import React from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { ImageList } from './doc-components'
import photo7 from '../images/7.jpg'

export default function DocDemo() {
  return (
    <PhotoProvider>
      <ImageList>
        <PhotoView src={photo7.src}>
          <img src={photo7.src} tw="block w-32 h-32 object-cover" alt="" />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  )
}
