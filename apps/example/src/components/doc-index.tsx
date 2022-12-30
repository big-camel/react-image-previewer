import React from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { CloseButton, DragToolbar, SlideToolbar } from 'react-image-previewer/ui'
import { ImageList, photoImages, Image } from './doc-components'

export default function DocDemo() {
  return (
    <PhotoProvider
      mode="drag"
      overlayRender={props => {
        const { mode, onClose } = props
        return (
          <>
            {mode === 'drag' ? <DragToolbar {...props} /> : <SlideToolbar {...props} />}
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
