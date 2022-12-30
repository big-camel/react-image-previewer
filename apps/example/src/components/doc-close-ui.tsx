import React from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { ImageList, Image } from './doc-components'
import photo4 from '../images/4.jpg'
import { CloseButton } from 'react-image-previewer/ui'

export default function DocDemo() {
  return (
    <PhotoProvider
      overlayRender={props => {
        return <CloseButton onClick={props.onClose} />
      }}
    >
      <ImageList>
        <PhotoView src={photo4.src}>
          <Image src={photo4.src} />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  )
}
