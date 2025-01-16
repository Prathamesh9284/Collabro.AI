"use client"

import React, { useEffect } from 'react'
import Header from './_components/Header'
import WorkspaceList from './_components/WorkspaceList'
import { useAuth, useUser } from '@clerk/nextjs';

function Dashboard() {
  
  const {user}=useUser();
    const {orgId}=useAuth();

    console.log("user :",user);
    console.log("orgId :",orgId);
    console.log("userId : ",user?.id);


    // Saving organization Id to Local Storage
      useEffect(() => {
          localStorage.setItem("orgId",orgId);
      }, [orgId])

  return (
    <div>
     
      <Header/>

      <WorkspaceList/>
    </div>
  )
}

export default Dashboard