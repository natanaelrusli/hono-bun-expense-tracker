import { ReactNode } from '@tanstack/react-router'

const BottomBarLayout = ({
  children,
  bottomBar,
}: {
  children: ReactNode
  bottomBar?: ReactNode
}) => {
  return (
    <>
      <div className='flex-1 overflow-auto p-3'>{children}</div>
      {bottomBar && (
        <div className='h-[80px] border-t border-gray-200 p-3'>{bottomBar}</div>
      )}
    </>
  )
}

export default BottomBarLayout
