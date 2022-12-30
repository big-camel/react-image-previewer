import { FC } from 'react'
import tw from 'twin.macro'
import { CloseIcon } from './Icons'

export interface CloseButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean
}

export const CloseButton: FC<CloseButtonProps> = ({ visible = true, ...props }) => {
  return (
    <div
      css={[
        tw`absolute top-5 right-2 sm:right-3 md:right-4 lg:right-5 p-2 text-lg sm:p-2.5 sm:text-xl opacity-100 sm:opacity-90 md:opacity-75 hover:opacity-100 z-50 text-white cursor-pointer transition-opacity ease-out delay-200`,
        !visible && tw`opacity-0`,
      ]}
      {...props}
    >
      <CloseIcon />
    </div>
  )
}
