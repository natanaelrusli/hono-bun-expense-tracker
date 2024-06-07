import { ThemeProvider, useTheme } from '@/hooks/ThemeProvider'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <ThemeProvider storageKey='vite-ui-theme'>
      <div className='h-screen w-screen bg-blue-100'>
        <main className='mx-auto flex h-screen max-h-screen w-full max-w-[500px] flex-col overflow-auto bg-background shadow-lg'>
          <nav>
            <NavBar />
          </nav>

          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  )
}

function NavBar() {
  const { setTheme, theme } = useTheme()

  return (
    <div className='mx-auto flex h-full max-w-[1024px] justify-between border-b border-gray-100 p-4 shadow-md'>
      <div className='flex gap-5'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>{' '}
        <Link to='/about' className='[&.active]:font-bold'>
          About
        </Link>
        <Link to='/expenses' className='[&.active]:font-bold'>
          Expenses
        </Link>
      </div>
      <div className='flex gap-3 max-md:hidden'>
        <Link to='/create-expense' className='[&.active]:font-bold'>
          Create Expense
        </Link>
        <button
          onClick={() =>
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }
        >
          Dark Mode
        </button>
      </div>
    </div>
  )
}
