import { ThemeProvider, useTheme } from "@/hooks/ThemeProvider";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <ThemeProvider storageKey='vite-ui-theme'>
      <main>
        <NavBar />
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </ThemeProvider>
  );
}

function NavBar() {
  const { setTheme, theme } = useTheme();

  return (
    <div className='p-4 flex mx-auto max-w-[1024px] justify-between'>
      <div className='flex gap-5'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>{" "}
        <Link to='/about' className='[&.active]:font-bold'>
          About
        </Link>
        <Link to='/expenses' className='[&.active]:font-bold'>
          Expenses
        </Link>
      </div>
      <div className='flex gap-3'>
        <Link to='/create-expense' className='[&.active]:font-bold'>
          Create Expense
        </Link>
        <button
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          Dark Mode
        </button>
      </div>
    </div>
  );
}
