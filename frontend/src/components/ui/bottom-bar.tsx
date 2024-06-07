import { ReactNode } from '@tanstack/react-router'

function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className='h-[80px] border-t border-gray-100 bg-background p-3 shadow-lg'>
      {children}
    </div>
  )
}

export default BottomBar
