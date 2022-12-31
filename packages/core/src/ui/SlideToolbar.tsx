import React, { FC, useMemo } from 'react'
import tw, { styled } from 'twin.macro'
import { OverlayRenderProps } from '../types'
import { download } from '../utils/download'
import isTouchDevice from '../utils/isTouchDevice'
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon } from './Icons'

const StyledArrow = styled.div(({ visible }: Record<'visible', boolean>) => [
  tw`absolute top-0 bottom-0 p-2 text-lg sm:p-2.5 sm:text-xl opacity-100 sm:opacity-90 md:opacity-75 hover:opacity-100 bg-gray-800/90 sm:bg-gray-800/60 md:bg-gray-800/30 flex justify-center items-center w-fit h-fit m-auto z-50 rounded-md text-white cursor-pointer select-none transition-opacity ease-linear delay-200`,
  !visible && tw`opacity-0`,
])

const StyledArrowLeft = tw(StyledArrow)`left-2 sm:left-3 md:left-4 lg:left-5`

const StyledArrowRight = tw(StyledArrow)`right-2 sm:right-3 md:right-4 lg:right-5`

export type SlideToolbarKeys = 'arrowLeft' | 'arrowRight' | 'countText' | 'download'

export interface SlideToolbarProps extends OverlayRenderProps {
  children?: React.ReactNode
  items?: SlideToolbarKeys[]
}

export interface SlideItemProps extends OverlayRenderProps {
  className?: string
}

export const SlideArrowLeft: FC<SlideItemProps> = ({
  index,
  images,
  loop,
  onIndexChange,
  overlayVisible,
  className,
}) => {
  const count = images.length
  const isFirst = index === 0
  const prev = () => {
    onIndexChange(isFirst ? count - 1 : index - 1)
  }
  const arrowLeftVisible = useMemo(() => {
    if (isTouchDevice || !overlayVisible) return false
    if (loop) return true
    return !isFirst
  }, [index, count, loop, isFirst])

  return (
    <StyledArrowLeft visible={arrowLeftVisible} onClick={prev} className={className}>
      <ArrowLeftIcon />
    </StyledArrowLeft>
  )
}

export const SlideArrowRight: FC<SlideItemProps> = ({
  index,
  images,
  loop,
  onIndexChange,
  overlayVisible,
  className,
}) => {
  const count = images.length

  const isLast = index === count - 1

  const next = () => {
    onIndexChange(isLast ? 0 : index + 1)
  }
  const arrowRightVisible = useMemo(() => {
    if (isTouchDevice || !overlayVisible) return false
    if (loop) return true
    return !isLast
  }, [isLast, isTouchDevice, loop, overlayVisible])

  return (
    <StyledArrowRight visible={arrowRightVisible} onClick={next} className={className}>
      <ArrowRightIcon />
    </StyledArrowRight>
  )
}

export const SlideCountText: FC<SlideItemProps> = ({ index, images, className }) => {
  const count = images.length
  return (
    <div
      tw="absolute bottom-5 left-2 sm:left-3 md:left-4 lg:left-5 flex justify-center items-center z-30 text-white"
      className={className}
    >
      <label tw="px-2 py-0.5 text-lg sm:px-2.5 sm:py-1 sm:text-xl opacity-100 sm:opacity-90 md:opacity-75 hover:opacity-100 bg-gray-800/90 sm:bg-gray-800/60 md:bg-gray-800/30 disabled:cursor-not-allowed disabled:text-gray-600 rounded-md cursor-default my-0 mx-0 transition-opacity ease-linear delay-200">{`${
        index + 1
      }/${count}`}</label>
    </div>
  )
}

export const SlideDownload: FC<SlideItemProps> = ({ loading, images, index, className }) => {
  const handleDownload = () => {
    const { src } = images[index]
    if (!src) return
    download(src)
  }
  return (
    <div
      tw="absolute bottom-5 right-2 sm:right-3 md:right-4 lg:right-5 flex justify-center items-center z-30 text-white gap-2"
      className={className}
    >
      <button
        disabled={loading}
        onClick={handleDownload}
        tw="p-2 text-lg sm:p-2.5 sm:text-xl opacity-100 sm:opacity-90 md:opacity-75 hover:opacity-100 bg-gray-800/90 sm:bg-gray-800/60 md:bg-gray-800/30  cursor-pointer disabled:cursor-not-allowed disabled:text-gray-600 disabled:hover:bg-transparent m-0 rounded-md transition-opacity ease-linear delay-200"
      >
        <DownloadIcon />
      </button>
    </div>
  )
}

export const SlideToolbarItemDefaultComponent: Record<
  SlideToolbarKeys,
  React.FC<OverlayRenderProps>
> = {
  arrowLeft: SlideArrowLeft,
  arrowRight: SlideArrowRight,
  countText: SlideCountText,
  download: SlideDownload,
}

export const SlideToolbar: FC<SlideToolbarProps> = ({
  children,
  items = ['arrowLeft', 'arrowRight', 'countText', 'download'],
  ...props
}) => {
  if (children) return children as any

  return (
    <>
      {items.map(key => {
        const Component = SlideToolbarItemDefaultComponent[key]
        if (Component) return <Component {...props} />
        return null
      })}
    </>
  )
}
