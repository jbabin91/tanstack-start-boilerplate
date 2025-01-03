import * as fs from 'node:fs';

import { createFileRoute, useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';

import { Button } from '@/components/ui/button.tsx';
import { Typography } from '@/components/ui/typography';

const filePath = 'count.txt';

async function readCount() {
  return Number.parseInt(
    await fs.promises.readFile(filePath, 'utf8').catch(() => '0'),
  );
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount();
});

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

export const Route = createFileRoute('/count')({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div className="mt-4 flex flex-col justify-center space-y-4 text-center">
      <Typography.H3>Count: {state}</Typography.H3>
      <div className="flex justify-center gap-2">
        <Button
          onClick={() => {
            updateCount({ data: -1 }).then(() => {
              router.invalidate();
            });
          }}
        >
          -1
        </Button>
        <Button
          onClick={() => {
            updateCount({ data: 1 }).then(() => {
              router.invalidate();
            });
          }}
        >
          +1
        </Button>
      </div>
    </div>
  );
}
