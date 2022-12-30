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

export const DragToolbarItemDefaultComponent: Record<
  DragToolbarKeys,
  React.FC<OverlayRenderProps>
> = {
  arrowLeft: ({ index, onIndexChange, images }: OverlayRenderProps) => {
    const count = images.length
    // 当前在第一张
    const isFirst = index === 0

    const prev = () => {
      onIndexChange(isFirst ? count - 1 : index - 1)
    }
    return (
      <DragStyledItem disabled={isFirst} onClick={prev}>
        <ArrowLeftIcon />
      </DragStyledItem>
    )
  },
  countText: ({ index, images }: OverlayRenderProps) => {
    const count = images.length
    return <DragStyledLabel>{`${index + 1}/${count}`}</DragStyledLabel>
  },
  arrowRight: ({ index, onIndexChange, images }: OverlayRenderProps) => {
    const count = images.length
    // 当前在最后一张
    const isLast = index === count - 1

    const next = () => {
      onIndexChange(isLast ? 0 : index + 1)
    }
    return (
      <DragStyledItem disabled={isLast} onClick={next}>
        <ArrowRightIcon />
      </DragStyledItem>
    )
  },
  split: DragStyledSplit,
  zoomOut: ({ scale, onScale, loading }: OverlayRenderProps) => {
    const handleZoomOut = () => {
      onScale(scale - getScaleStep(scale, false))
    }
    return (
      <DragStyledItem disabled={loading} onClick={handleZoomOut}>
        <ZoomOutIcon />
      </DragStyledItem>
    )
  },
  scaleCount: ({ scale }: OverlayRenderProps) => {
    return <DragStyledLabel>{`${Math.round(scale * 100)}%`}</DragStyledLabel>
  },
  zoomIn: ({ scale, onScale, loading }: OverlayRenderProps) => {
    const handleZoomIn = () => {
      onScale(scale + getScaleStep(scale))
    }
    return (
      <DragStyledItem disabled={loading} onClick={handleZoomIn}>
        <ZoomInIcon />
      </DragStyledItem>
    )
  },
  oneToOne: ({ onScale, loading }: OverlayRenderProps) => {
    const handleOneToOne = () => {
      onScale(1)
    }
    return (
      <DragStyledItem disabled={loading} onClick={handleOneToOne}>
        <OneToOneIcon />
      </DragStyledItem>
    )
  },
  download: ({ images, index, loading }: OverlayRenderProps) => {
    const handleDownload = () => {
      const { src } = images[index]
      if (!src) return
      download(src)
    }
    return (
      <DragStyledItem disabled={loading} onClick={handleDownload}>
        <DownloadIcon />
      </DragStyledItem>
    )
  },
  rotateLeft: ({ rotate, onRotate, loading }: OverlayRenderProps) => {
    const handleRotateLeft = () => {
      onRotate(rotate - 90)
    }
    return (
      <DragStyledItem disabled={loading} onClick={handleRotateLeft}>
        <RotateLeftIcon />
      </DragStyledItem>
    )
  },
  rotateRight: ({ rotate, onRotate, loading }: OverlayRenderProps) => {
    const handleRotateRight = () => {
      onRotate(rotate + 90)
    }
    return (
      <DragStyledItem disabled={loading} onClick={handleRotateRight}>
        <RotateRightIcon />
      </DragStyledItem>
    )
  },
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
        {items.map(item => {
          if (typeof item === 'string') {
            const Component = DragToolbarItemDefaultComponent[item]
            if (!Component) return null
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
