/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function GET() {

    await prisma.todo.deleteMany() //PURGAR LA BD
    await prisma.user.deleteMany() //PURGAR LA BD

    const user = await prisma.user.create({
        data: {
            email: 'testing@gmail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin'],
            todos: {
                create: [
                    {
                        title: 'Learn how to use Prisma with Next.js',
                    },
                    {
                        title: 'Mock todo'
                    },
                    {
                        title: 'Mock todo'
                    },
                    {
                        title: 'Mock todo'
                    },
                    {
                        title: 'Mock todo'
                    },
                    {
                        title: 'Mock todo',
                        done: true
                    }
                ]
            }


        }
    })

    return NextResponse.json({ message: 'TODO DB BACK TO SEED STATE!' })
}