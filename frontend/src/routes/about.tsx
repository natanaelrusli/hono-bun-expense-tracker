import { Button } from '@/components/ui/button'
import BottomBarLayout from '@/layout/bottom-bar-layout'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => (
    <BottomBarLayout
      bottomBar={
        <Link to='/create-expense'>
          <Button className='h-full w-full'>Create Expense Record</Button>
        </Link>
      }
    >
      <div className='h-full bg-slate-400'></div>
      <div className='h-full bg-slate-400'></div>
    </BottomBarLayout>
  ),
})
