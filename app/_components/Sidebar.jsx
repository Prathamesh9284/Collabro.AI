// "use client";
// import Logo from './Logo';
// import { Bell } from 'lucide-react'
// import React from 'react'
// import Link from 'next/link'

// function Sidebar() {
//   return (
//     <div className='h-screen w-full md:w-72 fixed bg-blue-50 p-5 shadow-md'>
//       <div className='flex justify-between items-center'>
//         <Logo />
//         <Bell className='md:hidden block' />
//       </div>
//       <hr className='my-5' />
//       <div className='mb-5 items-center'>
//         <Link href='/task'>
//             <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Task Management</h2>
//         </Link>
//         <Link href='/dashboard'>
//           <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Video Conferencing</h2>
//         </Link>
//         <Link href='/dashboard'>
//           <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Fun Games</h2>
//         </Link>
//         <Link href='/dashboard'>
//           <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Virtual Office</h2>
//         </Link>
//         <Link href='/dashboard'>
//           <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Project Dashboard</h2>
//         </Link>
//         <Link href='/dashboard'>
//           <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>AI Agent</h2>
//         </Link>
//         <Link href='/dashboard'>
//           <h2 className='font-medium my-4 hover:bg-gray-200 p-2 rounded-lg'>Recorded Meetings</h2>
//         </Link>
//       </div>
//       <hr className='my-5' />
//       <div>
//         <h2 className='font-medium'>Workspace Name</h2>
//       </div>
//     </div>
//   )
// }

// export default Sidebar



"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const wid = localStorage.getItem("workspaceId");

  console.log("wid is",wid);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Small Devices */}
      <div className="flex items-center justify-between md:hidden  bg-blue-50 p-5 shadow-md fixed w-full z-50">
        <Logo />
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="text-gray-700">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed h-screen w-72 bg-blue-50 p-5 shadow-md z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="flex justify-between items-center mb-5">
          <Logo />
        </div>
        <hr className="my-5" />
        <div className="mb-5 items-center">
        <Link href="/newdashboard">
            <h2 className="font-medium my-4 hover:bg-gray-200 p-2 rounded-lg">
              Dashboard
            </h2>
          </Link>
          <Link href="/task">
            <h2 className="font-medium my-4 hover:bg-gray-200 p-2 rounded-lg">
              Task Management
            </h2>
          </Link>
          <Link href="http://localhost:3001">
            <h2 className="font-medium my-4 hover:bg-gray-200 p-2 rounded-lg">
              Video Conferencing
            </h2>
          </Link>
          <Link href={`/workspace/${wid}/c409ca56-dae4-4b64-80c7-7893a734cbf7`}>
            <h2 className="font-medium my-4 hover:bg-gray-200 p-2 rounded-lg">
              Documents
            </h2>
          </Link>
          <Link href="/games">
            <h2 className="font-medium my-4 hover:bg-gray-200 p-2 rounded-lg">
              Fun Games
            </h2>
          </Link>
          <Link href="/records">
            <h2 className="font-medium my-4 hover:bg-gray-200 p-2 rounded-lg">
              Resources
            </h2>
          </Link>
          <Link href="/agent">
            <h2 className="font-medium my-4 hover:bg-gray-200 p-2 rounded-lg">
              AI Agent
            </h2>
          </Link>
        </div>
        <hr className="my-5" />
        <div>
          <h2 className="font-medium">Workspace Name</h2>
        </div>
      </div>

      {/* Overlay for Small Devices */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
}

export default Sidebar;
