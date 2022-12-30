import React, { useRef } from 'react'
import { PhotoView, PhotoProvider } from 'react-image-previewer'
import { ImageList, photoImages, Image } from './doc-components'
import dog from '../images/dog.png'
import { DragToolbar, DragToolbarItems, DragStyledItem } from 'react-image-previewer/ui'

const FullScreenIcon = ({ container }: { container?: React.RefObject<HTMLDivElement> }) => {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false)
  React.useEffect(() => {
    document.onfullscreenchange = () => {
      setFullscreen(Boolean(document.fullscreenElement))
    }
  }, [])

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else if (container?.current) {
      const element = container.current
      element.requestFullscreen()
    }
  }
  return (
    <DragStyledItem onClick={toggleFullScreen}>
      <svg fill="currentColor" width="1em" height="1em" viewBox="0 0 768 768">
        {fullscreen ? (
          <path d="M511.5 256.5h96v63h-159v-159h63v96zM448.5 607.5v-159h159v63h-96v96h-63zM256.5 256.5v-96h63v159h-159v-63h96zM160.5 511.5v-63h159v159h-63v-96h-96z" />
        ) : (
          <path d="M448.5 160.5h159v159h-63v-96h-96v-63zM544.5 544.5v-96h63v159h-159v-63h96zM160.5 319.5v-159h159v63h-96v96h-63zM223.5 448.5v96h96v63h-159v-159h63z" />
        )}
      </svg>
    </DragStyledItem>
  )
}

export default function DocDemo() {
  const [images, setImages] = React.useState(photoImages)
  const ref = useRef<HTMLDivElement>(null)
  return (
    <PhotoProvider
      ref={ref}
      mode="drag"
      overlayRender={props => {
        const items: DragToolbarItems = [
          'arrowLeft',
          'countText',
          'arrowRight',
          'split',
          'zoomOut',
          'scaleCount',
          'zoomIn',
          'oneToOne',
          'split',
          'download',
          'split',
          'rotateLeft',
          'rotateRight',
        ]
        if (document.fullscreenEnabled) {
          items.push({
            key: 'fullscreen',
            component: () => {
              return <FullScreenIcon container={ref} />
            },
          })
        }
        items.push({
          key: 'dog',
          component: ({ index }) => {
            return (
              <DragStyledItem
                onClick={() => {
                  setImages(prev => {
                    const result = [...prev]
                    result.splice(index, 1, dog.src)
                    return result
                  })
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 768 768"
                  fill="currentColor"
                >
                  <path d="M384 559.5c-75 0-138-45-163.5-111h327c-25.5 66-88.5 111-163.5 111zM271.5 352.5c-27 0-48-21-48-48s21-48 48-48 48 21 48 48-21 48-48 48zM496.5 352.5c-27 0-48-21-48-48s21-48 48-48 48 21 48 48-21 48-48 48zM384 640.5c141 0 256.5-115.5 256.5-256.5s-115.5-256.5-256.5-256.5-256.5 115.5-256.5 256.5 115.5 256.5 256.5 256.5zM384 64.5c177 0 319.5 142.5 319.5 319.5s-142.5 319.5-319.5 319.5-319.5-142.5-319.5-319.5 142.5-319.5 319.5-319.5z" />
                </svg>
              </DragStyledItem>
            )
          },
        })
        return <DragToolbar items={items} {...props} />
      }}
    >
      <ImageList>
        {images.map((item, index) => (
          <PhotoView key={index} src={item}>
            <Image src={item} />
          </PhotoView>
        ))}
      </ImageList>
    </PhotoProvider>
  )
}
