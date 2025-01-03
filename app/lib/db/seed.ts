import { seed } from 'drizzle-seed';

import { db } from '@/lib/db';
import { todoTable } from '@/lib/db/schema';

async function main() {
  await seed(db, { todos: todoTable });
}

await main();
