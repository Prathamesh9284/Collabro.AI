// "use client";
// import { buttonVariants } from "@/components/ui/button";
// import MagicCard from "@/components/ui/magic-card";
// import { useUser } from "@clerk/nextjs";
// import { BrainIcon, HeartPulseIcon, NotepadTextIcon } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import Sidebar from "@/app/_components/Sidebar";
// import { Progress } from "@/components/ui/progress"
// import { useEffect } from "react";
// import {Clerk} from "@clerk/clerk-react";

// import Cards from "@/components/dashboard/Charts/Cards/Cards";


// const DashboardPage = () => {
//     const { user } = useUser();

//     const dbUser = user;

//     const userImage = dbUser?.imageUrl;

//     useEffect(() => {
//         const fetchData = async () => {
//             const wid = localStorage.getItem('workspaceId');
//             const formData = new FormData();
//             formData.append('wid', wid);

//             try {
//                 const response = await fetch('http://127.0.0.1:8000/data_retriver', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (response.ok) {
//                     const responseData = await response.json();
//                     console.log("Fetched tasks:", responseData);
//                 } 
//             } catch (error) {
//                 console.error('Error storing file :', error);
//             }
//         };

//         fetchData();

       

//     }, []);
//     return (
//         <div className="flex flex-col lg:flex-row w-full">
//             <Sidebar />
//             <div className="lg:ml-72 md:ml-72 sm:m-10 flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 w-full gap-6 p-4 lg:p-8">
//                 <div className="flex flex-col md:col-span-1 xl:col-span-4 gap-6 w-full">
//                     <div className="flex flex-col items-center justify-center w-full border border-border/60 rounded-xl py-6 md:py-8">
//                         <div className="w-20 h-20 mx-auto">
//                             <Image
//                                 src={userImage}
//                                 alt={dbUser?.firstName}
//                                 width={1024}
//                                 height={1024}
//                                 className="rounded-full w-full h-full"
//                             />
//                         </div>
//                         <h4 className="text-lg font-medium mt-4 text-center">
//                             {dbUser?.firstName} {dbUser?.lastName}
//                         </h4>
//                         <Link
//                             href="/dashboard/account/settings"
//                             className={buttonVariants({ size: "sm", className: "mt-4" })}
//                         >
//                             Update Profile
//                         </Link>
//                     </div>

//             <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-6">
//                         <MagicCard
//                             color="rgba(239,68,68,.08)"
//                             className="border-2 border-red-100 w-full"
//                         >
//                             <Link
//                                 href="/dashboard/health-status"
//                                 className="flex items-center justify-between w-full bg-background group p-4"
//                             >
//                                 <div className="space-y-0.5">
//                                     <h5 className="font-medium font-heading text-red-500">
//                                         Your health status
//                                     </h5>
//                                     <p className="text-xs text-neutral-600">
//                                         Evaluate your health status
//                                     </p>
//                                 </div>
//                                 <HeartPulseIcon
//                                     strokeWidth={1.8}
//                                     className="w-8 h-8 text-red-500 group-hover:scale-105 transition transform"
//                                 />
//                             </Link>
//                         </MagicCard>

//                         <MagicCard
//                             color="rgba(217,70,239,.1)"
//                             className="border-2 border-fuchsia-100 w-full"
//                         >
//                             <Link
//                                 href="/dashboard/ai"
//                                 className="flex items-center justify-between w-full group p-4"
//                             >
//                                 <div className="space-y-0.5">
//                                     <h5 className="font-medium font-heading text-fuchsia-500">
//                                         Virtual assistant
//                                     </h5>
//                                     <p className="text-xs text-neutral-600">
//                                         Chat with our AI bot
//                                     </p>
//                                 </div>
//                                 <div className="flex">
//                                     <BrainIcon
//                                         strokeWidth={1.8}
//                                         className="w-8 h-8 text-fuchsia-500 group-hover:scale-105 transition transform"
//                                     />
//                                 </div>
//                             </Link>
//                         </MagicCard>

//                         <MagicCard
//                             color="rgba(99,102,241,.08)"
//                             className="border-2 border-indigo-100 w-full"
//                         >
//                             <Link
//                                 href="/dashboard/health-tips"
//                                 className="flex items-center justify-between w-full bg-background group p-4"
//                             >
//                                 <div className="space-y-0.5">
//                                     <h5 className="font-medium font-heading text-indigo-500">
//                                         Health tips
//                                     </h5>
//                                     <p className="text-xs text-neutral-600">
//                                         Get health tips and advice
//                                     </p>
//                                 </div>
//                                 <NotepadTextIcon className="w-8 h-8 text-indigo-500 group-hover:scale-105 transition transform" />
//                             </Link>
//                         </MagicCard>

//                         <MagicCard
//                             color="rgba(0, 255, 0, 0.08)"
//                             className="border-2 border-green-100 w-full"
//                         >
//                             <Link
//                                 href="/dashboard/summary"
//                                 className="flex items-center justify-between w-full bg-background group p-4"
//                             >
//                                 <div className="space-y-0.5">
//                                     <h5 className="font-medium font-heading text-green-500">
//                                         Summary
//                                     </h5>
//                                     <p className="text-xs text-neutral-600">
//                                         Get health tips and advice
//                                     </p>
//                                 </div>
//                                 <NotepadTextIcon className="w-8 h-8 text-green-500 group-hover:scale-105 transition transform" />
//                             </Link>
//                         </MagicCard>
//                     </div>

//                 </div>
//                 <div className="flex flex-col md:col-span-1 xl:col-span-8 gap-8 w-full">
//                     <Cards />
                    
//                     Progress Bar
//                     <div className="flex flex-col items-center justify-center w-full border border-border/60 rounded-xl py-6 md:py-8">
//                         <Progress value={33} className="m-5 w-4/5"/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;



"use client";

import React, { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import MagicCard from "@/components/ui/magic-card";
import { useUser } from "@clerk/nextjs";
// import { BrainIcon, HeartPulseIcon, NotepadTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/app/_components/Sidebar";
import { Progress } from "@/components/ui/progress";
import Cards from "@/components/dashboard/Charts/Cards/Cards";
import { UilClipboardAlt, UilCheckCircle, UilSpinner } from "@iconscout/react-unicons";
import { BrainIcon, HeartPulseIcon, NotepadTextIcon, ListTodo, Bot, Video } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const DashboardPage = () => {

 
      const { user } = useUser();

    const dbUser = user;

    const userImage = dbUser?.imageUrl;

  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (user) {
      
      const fetchData = async () => {
        const wid = localStorage.getItem('workspaceId');
        
        if (!wid) {
          setFetchError("Workspace ID not found in localStorage.");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('wid', wid);

        try {
          const response = await fetch('http://127.0.0.1:8000/data_retriver', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("Fetched tasks:", responseData);

            const statusCounts = responseData.status;
            const totalTasks = Object.values(statusCounts).reduce((a, b) => a + b, 0);

            if (totalTasks === 0) {
              setCardsData([]);
              setFetchError("No tasks found.");
            } else {
              // Calculate percentages
              const processedCardsData = Object.entries(statusCounts).map(([status, count]) => {
                const percentage = ((count / totalTasks) * 100).toFixed(2);
                return {
                  title: formatStatusTitle(status),
                  color: getStatusColor(status),
                  barValue: parseFloat(percentage),
                  value: `${percentage}%`,
                  png: getStatusIcon(status),
                  series: [], // Add relevant series data if needed
                };
              });

              setCardsData(processedCardsData);
            }
          } else {
            setFetchError(`Failed to fetch tasks. Status Code: ${response.status}`);
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
          setFetchError("An error occurred while fetching tasks.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  // Helper function to format status titles
  const formatStatusTitle = (status) => {
    switch (status) {
      case "under-review":
        return "Under Review";
      case "completed":
        return "Completed";
      case "work-in-progress":
        return "In Progress";
      default:
        return status;
    }
  };

  // Helper function to get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "under-review":
        return {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        };
      case "completed":
        return {
          backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",
        };
      case "work-in-progress":
        return {
          backGround: "linear-gradient(180deg, rgb(248, 212, 154) 0%, rgb(255 202 113) 100%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",
        };
      default:
        return {
          backGround: "linear-gradient(180deg, #EEEEEE 0%, #DDDDDD 100%)",
          boxShadow: "0px 10px 20px 0px rgba(238, 238, 238, 0.5)",
        };
    }
  };

  // Helper function to get icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "under-review":
        return <UilClipboardAlt size="32" color="#FFBF00" />;
      case "completed":
        return <UilCheckCircle size="32" color="#4CAF50" />;
      case "work-in-progress":
        return <UilSpinner size="32" color="#2196F3" />;
      default:
        return <UilClipboardAlt size="32" color="#888888" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <Sidebar />
      <div className="lg:ml-72 md:ml-72 sm:m-10 flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 w-full gap-6 p-4 lg:p-8">
        <div className="flex flex-col md:col-span-1 xl:col-span-4 gap-6 w-full">
          <div className="flex flex-col items-center justify-center w-full border border-border/60 rounded-xl py-6 md:py-8">
            <div className="w-20 h-20 mx-auto">
              <Image
                src={userImage}
                alt={dbUser?.firstName || "User"}
                width={1024}
                height={1024}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <h4 className="text-lg font-medium mt-4 text-center">
              {user?.firstName} {user?.lastName}
            </h4>
            <Link
              href="http://localhost:3000/newdashboard"
              className={buttonVariants({ size: "sm", className: "mt-4" })}
            >
              Update Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-6">
            {/* Existing MagicCards */}
            <MagicCard
              color="rgba(239,68,68,.08)"
              className="border-2 border-red-100 w-full"
            >
              <Link
                href="http://localhost:3000/task"
                className="flex items-center justify-between w-full bg-background group p-4"
              >
                <div className="space-y-0.5">
                  <h5 className="font-medium font-heading text-red-500">
                    Task Management
                  </h5>
                  <p className="text-xs text-neutral-600">
                  Organize and track tasks efficiently for your projects.
                  </p>
                </div>
                <ListTodo
                  strokeWidth={1.8}
                  className="w-8 h-8 text-red-500 group-hover:scale-105 transition transform"
                />
              </Link>
            </MagicCard>

            <MagicCard
              color="rgba(217,70,239,.1)"
              className="border-2 border-fuchsia-100 w-full"
            >
              <Link
                href="http://localhost:3000/agent"
                className="flex items-center justify-between w-full group p-4"
              >
                <div className="space-y-0.5">
                  <h5 className="font-medium font-heading text-fuchsia-500">
                    AI Agent
                  </h5>
                  <p className="text-xs text-neutral-600">
                  Leverage AI to streamline your workflow and tasks.
                  </p>
                </div>
                <Bot
                  strokeWidth={1.8}
                  className="w-8 h-8 text-fuchsia-500 group-hover:scale-105 transition transform"
                />
              </Link>
            </MagicCard>

            <MagicCard
              color="rgba(99,102,241,.08)"
              className="border-2 border-indigo-100 w-full"
            >
              <Link
                href="http://localhost:3001"
                className="flex items-center justify-between w-full bg-background group p-4"
              >
                <div className="space-y-0.5">
                  <h5 className="font-medium font-heading text-indigo-500">
                    Video Conferening
                  </h5>
                  <p className="text-xs text-neutral-600">
                  Connect with team members remotely through video calls.
                  </p>
                </div>
                <Video className="w-8 h-8 text-indigo-500 group-hover:scale-105 transition transform" />
              </Link>
            </MagicCard>

            <MagicCard
              color="rgba(0, 255, 0, 0.08)"
              className="border-2 border-green-100 w-full"
            >
              <Link
                href="http://localhost:3000/records"
                className="flex items-center justify-between w-full bg-background group p-4"
              >
                <div className="space-y-0.5">
                  <h5 className="font-medium font-heading text-green-500">
                    Resources
                  </h5>
                  <p className="text-xs text-neutral-600">
                  Access a collection of valuable resources for your team.
                  </p>
                </div>
                <NotepadTextIcon className="w-8 h-8 text-green-500 group-hover:scale-105 transition transform" />
              </Link>
            </MagicCard>
          </div>
        </div>

        <div className="flex flex-col md:col-span-1 xl:col-span-8 gap-8 w-full">
          {/* Pass the dynamic cardsData to the Cards component */}
          {loading ? (
            <div className="flex justify-center items-center">
              <p className="text-lg">Loading cards...</p>
            </div>
          ) : fetchError ? (
            <div className="flex justify-center items-center">
              <p className="text-red-500">{fetchError}</p>
            </div>
          ) : (
            <Cards cardsData={cardsData} />
          )}

          {/* Progress Bar */}
          <p className="font-bold">Overall progress 🚀</p>
          <div className="flex flex-col items-center justify-center w-full border border-border/60 rounded-xl py-6 md:py-8">
            <Progress value={33} className="m-5 w-4/5" /> 
            <p className="font-bold">33%</p>
          </div>

          <div> 
            <p className="font-bold">Organization Status</p>
            <Table>
                    <TableCaption>A list of your team members.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Members</TableHead>
    
                        <TableHead className="text-right">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">kgp23062004@gmail.com</TableCell>

                        <TableCell className="text-right">Admin</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">karanpg2306@gmail.com</TableCell>

                        <TableCell className="text-right">Member</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">karan.22210793@viit.ac.in</TableCell>

                        <TableCell className="text-right">Member</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

          </div>



        </div>  
      </div>
    </div>
  );
};

export default DashboardPage;