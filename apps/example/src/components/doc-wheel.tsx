import React from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { ImageList, Image } from './doc-components'
import photo4 from '../images/4.jpg'

export default function DocDemo() {
  return (
    <PhotoProvider enableMouseZoom={false}>
      <ImageList>
        <PhotoView src={photo4.src}>
          <Image src={photo4.src} />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  )
}
