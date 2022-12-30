import React, { forwardRef } from 'react'
import { createPortal } from 'react-dom'

export interface ISliderPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: HTMLElement
}

export type SlidePortalRef = React.ElementRef<'div'>

const SlidePortal = forwardRef<SlidePortalRef, ISliderPortalProps>(
  ({ container = document.body, ...rest }, ref) => {
    return createPortal(
      <div
        ref={ref}
        tw="fixed top-0 left-0 w-full h-full z-50 overflow-hidden touch-none"
        {...rest}
      />,
      container,
    )
  },
)

SlidePortal.displayName = 'SlidePortal'

export default SlidePortal
