export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { TodosGrid } from '@/app/modules/todos';
import { NewTodo } from '@/app/modules/todos/components/newTodo/NewTodo';
import { getUserServerSession } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Todos Page',
  description: 'Todos Page',
};

export default async function ServerTodosPage() {

  const userSession = await getUserServerSession();

  if (!userSession) redirect('/api/auth/signin');

  const user = await prisma.user.findUnique({ where: { email: userSession?.email ?? '' } });

  const todos = await prisma.todo.findMany({ where: { userId: user?.id } });


  return (
    <div className='flex flex-col items-center w-full gap-6'>
      <div className='w-full'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}