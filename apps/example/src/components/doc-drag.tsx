import React from 'react'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { CloseButton, DragToolbar, LoadingIcon } from 'react-image-previewer/ui'
import { ImageList, photoImages, Image } from './doc-components'

export default function DocDemo() {
  return (
    <PhotoProvider
      mode="drag"
      loadingElement={<LoadingIcon tw="text-white text-2xl" />}
      overlayRender={props => {
        return (
          <>
            <DragToolbar {...props} />
            <CloseButton onClick={props.onClose} />
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
