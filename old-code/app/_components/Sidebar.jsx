"use client";
import Logo from './Logo';
import { Bell } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function Sidebar() {
  return (
    <div className='h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <Logo />
      </div>
      <hr className='my-5' />
      <div className='mb-5 items-center'>
        <Link href='/task'>
            <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Task Management</h2>
        </Link>
        <Link href='/dashboard'>
          <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Video Conferencing</h2>
        </Link>
        <Link href='/dashboard'>
          <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Fun Games</h2>
        </Link>
        <Link href='/dashboard'>
          <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Virtual Office</h2>
        </Link>
        <Link href='/dashboard'>
          <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Project Dashboard</h2>
        </Link>
        <Link href='/dashboard'>
          <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>AI Agent</h2>
        </Link>
        <Link href='/dashboard'>
          <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Recorded Meetings</h2>
        </Link>
      </div>
      <hr className='my-5' />
      <div>
        <h2 className='font-medium'>Workspace Name</h2>
      </div>
    </div>
  )
}

export default Sidebar