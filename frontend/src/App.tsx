import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "./lib/api";

async function getTotalSpent() {
  const result = await api.expenses["total-spent"].$get();
  if (!result.ok) {
    throw new Error("server error");
  }

  const data = await result.json();

  return data;
}

function App() {
  const { isPending, data, error } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occured" + error.message;

  return (
    <Card className='w-[350px] m-auto my-12'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{!isPending ? data.total : "Loading..."}</CardContent>
    </Card>
  );
}

export default App;
