import React from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  DownloadIcon,
  LoadingIcon,
  OneToOneIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'react-image-previewer/ui'

const DocIcons = () => {
  return (
    <div tw="flex gap-2 text-3xl">
      <ArrowLeftIcon />
      <ArrowRightIcon />
      <RotateLeftIcon />
      <RotateRightIcon />
      <ZoomInIcon />
      <ZoomOutIcon />
      <OneToOneIcon />
      <DownloadIcon />
      <LoadingIcon />
      <CloseIcon />
    </div>
  )
}
export default DocIcons
