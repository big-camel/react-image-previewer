import React from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { CloseButton, SlideToolbar } from 'react-image-previewer/ui'
import { ImageList, photoImages, Image } from './doc-components'

export default function DocDemo() {
  return (
    <PhotoProvider
      overlayRender={props => {
        const { onClose } = props
        return (
          <>
            <SlideToolbar {...props} />
            <CloseButton onClick={onClose} />
          </>
        )
      }}
    >
      <ImageList>
        {photoImages.map((item, index) => (
          <PhotoView key={index} src={item}>
            <Image src={item} />
          </PhotoView>
        ))}
      </ImageList>
    </PhotoProvider>
  )
}
