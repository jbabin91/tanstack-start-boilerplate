import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';

import { Typography } from '@/components/ui/typography';
import { db } from '@/lib/db';

export const getTodos = createServerFn().handler(async () => {
  const todos = await db.query.todoTable.findMany();
  return todos;
});

export const todosQueryOptions = () =>
  queryOptions({
    queryFn: () => getTodos(),
    queryKey: ['todos'],
  });

export const Route = createFileRoute('/_app/todos')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(todosQueryOptions());
  },
});

function RouteComponent() {
  const todosQuery = useSuspenseQuery(todosQueryOptions());

  return (
    <div className="mt-4 flex flex-col justify-center space-y-4 text-center">
      <Typography.H1>Todos</Typography.H1>
      {todosQuery.data ? (
        <ul className="space-y-2">
          {todosQuery.data.map((todo) => (
            <li key={todo.id} className="flex justify-center">
              <Typography.P>
                {todo.title} <span>{todo.completed ? 'true' : 'false'}</span>
              </Typography.P>
            </li>
          ))}
        </ul>
      ) : (
        <Typography.H3>Loading...</Typography.H3>
      )}
    </div>
  );
}
