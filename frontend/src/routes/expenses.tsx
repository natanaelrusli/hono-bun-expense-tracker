import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

async function getAllExpenses() {
  const result = await api.expenses.$get();
  if (!result.ok) {
    throw new Error("server error");
  }

  const data = await result.json();

  const keys = data.expenses.length > 0 ? Object.keys(data?.expenses[0]) : [];

  return { ...data, keys };
}

async function getTotalSpent() {
  const result = await api.expenses["total-spent"].$get();
  if (!result.ok) {
    throw new Error("server error");
  }

  const data = await result.json();

  return data;
}

function Expenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  const {
    isPending: totalSpentIsPending,
    data: totalSpent,
    error: totalSpentError,
  } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occured" + error.message;

  if (totalSpentError) return "An error has occured" + totalSpentError.message;

  return (
    <div className='w-6/12 min-w-[500px] max-md:w-full mx-auto p-2'>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableHead className='text-right' key={i}>
                    <Skeleton className='w-full h-4' />
                  </TableHead>
                ))
            : data?.keys.map((key, i) => {
                if (i === data?.keys.length - 1) {
                  return (
                    <TableHead className='text-right' key={key}>
                      {key.toUpperCase()}
                    </TableHead>
                  );
                } else {
                  return <TableHead key={key}>{key.toUpperCase()}</TableHead>;
                }
              })}
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className='font-medium'>
                      <Skeleton className='h-4' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4' />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Skeleton className='h-4' />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className='font-medium'>{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className='text-right'>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          {!totalSpentIsPending ? (
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className='text-right'>{totalSpent.total}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={2}>
                <Skeleton />
              </TableCell>
              <TableCell className='text-right'>
                <Skeleton />
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
}
