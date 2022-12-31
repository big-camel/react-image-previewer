import React, { FC } from 'react'
import tw from 'twin.macro'
import { OverlayRenderProps } from '../types'
import { download } from '../utils/download'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DownloadIcon,
  OneToOneIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from './Icons'

// 工具栏box样式
const StyledBox = tw.div`bg-gray-800 rounded-md px-2 flex items-center pointer-events-auto`
// 工具栏按钮样式
export const DragStyledItem = tw.button`my-2 mx-1.5 text-xl rounded p-1 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-600 hover:bg-gray-600 disabled:hover:bg-transparent`
// 工具栏文字样式
export const DragStyledLabel = tw(
  DragStyledItem,
)`cursor-default text-lg my-0 mx-0 hover:bg-transparent`
// 工具栏分割线样式
export const DragStyledSplit = tw.div`mx-1.5 h-4 flex items-center justify-center border-l border-gray-600`

export type DragToolbarKeys =
  | 'arrowLeft'
  | 'arrowRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'oneToOne'
  | 'countText'
  | 'scaleCount'
  | 'rotateLeft'
  | 'rotateRight'
  | 'download'
  | 'split'

export interface DragToolbarProps extends OverlayRenderProps {
  items?: DragToolbarItems
  children?: React.ReactNode
  className?: string
}

export interface DragToolbarItem {
  key: DragToolbarKeys | string
  component: React.FC<OverlayRenderProps>
}

export type DragToolbarItems = (DragToolbarItem | DragToolbarKeys)[]

const getScaleStep = (scale: number, isAdd = true) => {
  if (scale < 0.5 || (!isAdd && scale === 0.5)) return 0.05
  if (scale < 1.5 || (!isAdd && scale === 1.5)) return 0.1
  if (scale < 3 || (!isAdd && scale === 3)) return 0.25
  return 0.5
}

export interface DragItemProps extends OverlayRenderProps {
  className?: string
  children?: React.ReactNode
}

export const DragArrowLeft: FC<DragItemProps> = ({
  index,
  onIndexChange,
  images,
  className,
  children,
}) => {
  const count = images.length
  // 当前在第一张
  const isFirst = index === 0

  const prev = () => {
    onIndexChange(isFirst ? count - 1 : index - 1)
  }
  return (
    <DragStyledItem disabled={isFirst} onClick={prev} className={className}>
      {children ?? <ArrowLeftIcon />}
    </DragStyledItem>
  )
}

export const DragCountText: FC<DragItemProps> = ({ index, images, className, children }) => {
  const count = images.length
  return (
    <DragStyledLabel className={className}>{children ?? `${index + 1}/${count}`}</DragStyledLabel>
  )
}

export const DragArrowRight: FC<DragItemProps> = ({
  index,
  onIndexChange,
  images,
  className,
  children,
}) => {
  const count = images.length
  // 当前在最后一张
  const isLast = index === count - 1

  const next = () => {
    onIndexChange(isLast ? 0 : index + 1)
  }
  return (
    <DragStyledItem disabled={isLast} onClick={next} className={className}>
      {children ?? <ArrowRightIcon />}
    </DragStyledItem>
  )
}

export const DragSplit: FC<DragItemProps> = ({ className }) => {
  return <DragStyledSplit className={className} />
}

export const DragZoomOut: FC<DragItemProps> = ({
  scale,
  onScale,
  loading,
  className,
  children,
}) => {
  const handleZoomOut = () => {
    onScale(scale - getScaleStep(scale, false))
  }
  return (
    <DragStyledItem disabled={loading} onClick={handleZoomOut} className={className}>
      {children ?? <ZoomOutIcon />}
    </DragStyledItem>
  )
}

export const DragScaleCount: FC<DragItemProps> = ({ scale, className, children }) => {
  return (
    <DragStyledLabel className={className}>
      {children ?? `${Math.round(scale * 100)}%`}
    </DragStyledLabel>
  )
}

export const DragZoomIn: FC<DragItemProps> = ({ scale, onScale, loading, className, children }) => {
  const handleZoomIn = () => {
    onScale(scale + getScaleStep(scale))
  }
  return (
    <DragStyledItem disabled={loading} onClick={handleZoomIn} className={className}>
      {children ?? <ZoomInIcon />}
    </DragStyledItem>
  )
}

export const DragOneToOne: FC<DragItemProps> = ({ onScale, loading, className, children }) => {
  const handleOneToOne = () => {
    onScale(1)
  }
  return (
    <DragStyledItem disabled={loading} onClick={handleOneToOne} className={className}>
      {children ?? <OneToOneIcon />}
    </DragStyledItem>
  )
}

export const DragDownload: FC<DragItemProps> = ({
  images,
  index,
  loading,
  className,
  children,
}) => {
  const handleDownload = () => {
    const { src } = images[index]
    if (!src) return
    download(src)
  }
  return (
    <DragStyledItem disabled={loading} onClick={handleDownload} className={className}>
      {children ?? <DownloadIcon />}
    </DragStyledItem>
  )
}

export const DragRotateLeft: FC<DragItemProps> = ({
  rotate,
  onRotate,
  loading,
  className,
  children,
}) => {
  const handleRotateLeft = () => {
    onRotate(rotate - 90)
  }
  return (
    <DragStyledItem disabled={loading} onClick={handleRotateLeft} className={className}>
      {children ?? <RotateLeftIcon />}
    </DragStyledItem>
  )
}

export const DragRotateRight: FC<DragItemProps> = ({
  rotate,
  onRotate,
  loading,
  className,
  children,
}) => {
  const handleRotateRight = () => {
    onRotate(rotate + 90)
  }
  return (
    <DragStyledItem disabled={loading} onClick={handleRotateRight} className={className}>
      {children ?? <RotateRightIcon />}
    </DragStyledItem>
  )
}

export const DragToolbarItemDefaultComponent: Record<
  DragToolbarKeys,
  React.FC<OverlayRenderProps>
> = {
  arrowLeft: DragArrowLeft,
  countText: DragCountText,
  arrowRight: DragArrowRight,
  split: DragSplit,
  zoomOut: DragZoomOut,
  scaleCount: DragScaleCount,
  zoomIn: DragZoomIn,
  oneToOne: DragOneToOne,
  download: DragDownload,
  rotateLeft: DragRotateLeft,
  rotateRight: DragRotateRight,
}

export const DragToolbar: FC<DragToolbarProps> = ({
  items = [
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
  ],
  children,
  className,
  ...props
}) => {
  return (
    <div
      css={[
        tw`absolute bottom-0 left-0 right-0 flex justify-center items-center z-30 mt-5 mb-8 text-white pointer-events-none opacity-100 cursor-pointer select-none transition-opacity ease-linear delay-200 hover:opacity-100`,
        !props.overlayVisible && tw`opacity-0`,
      ]}
      className={className}
    >
      <StyledBox>
        {items.map((item, index) => {
          if (typeof item === 'string') {
            const Component = DragToolbarItemDefaultComponent[item]
            if (!Component) return null
            let key: string = item
            if (key === 'split') {
              key = `split-${index}`
            }
            return <Component key={item} {...props} />
          }
          const Component = item.component
          return <Component key={item.key} {...props} />
        })}
      </StyledBox>
      {children}
    </div>
  )
}
