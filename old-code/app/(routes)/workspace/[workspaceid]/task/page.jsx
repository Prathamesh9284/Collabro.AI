// "use client"
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const TaskManagementPage = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button>Create New Task</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create a New Task</DialogTitle>
//             <DialogDescription>
//               Fill in the details below to create a new task for your team.
//             </DialogDescription>
//           </DialogHeader>
//           <form className="space-y-4">
//             {/* Task Name */}
//             <div>
//               <label className="block text-sm font-medium">Task Name</label>
//               <Input type="text" placeholder="Enter task name" />
//             </div>

//             {/* Task Description */}
//             <div>
//               <label className="block text-sm font-medium">Task Description</label>
//               <Textarea placeholder="Enter task description" />
//             </div>

//             {/* No. of Days to Go */}
//             <div>
//               <label className="block text-sm font-medium">No. of Days to Go</label>
//               <Input type="number" placeholder="Enter number of days" />
//             </div>

//             {/* Priority */}
//             <div>
//               <label className="block text-sm font-medium">Priority</label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select priority" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="low">Low</SelectItem>
//                   <SelectItem value="medium">Medium</SelectItem>
//                   <SelectItem value="high">High</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Assignee Name */}
//             <div>
//               <label className="block text-sm font-medium">Assignee Name</label>
//               <Input type="text" placeholder="Enter assignee name" />
//             </div>

//             <Button className="w-full" type="submit">
//               Submit
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TaskManagementPage;


// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import KanbanBoard from "../../_components/KanbanBoard";

// const TaskManagementPage = () => {
//   const [open, setOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [columns, setColumns] = useState([
//     { id: "work-in-progress", title: "Work in Progress" },
//     { id: "under-review", title: "Under Review" },
//     { id: "completed", title: "Completed" },
//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const taskDetails = {
//       id: Date.now().toString(),
//       name: formData.get("name"),
//       description: formData.get("description"),
//       daysToGo: formData.get("daysToGo"),
//       priority: formData.get("priority"),
//       assignee: formData.get("assignee"),
//       columnId: "work-in-progress", // Add to the "Work in Progress" column
//     };

//     const newTask = {
//       ...taskDetails,
//       content: (
//         <div>
//           <h3 className="font-bold">{taskDetails.name}</h3>
//           <p className="text-sm">{taskDetails.description}</p>
//           <div className="flex gap-2 mt-2">
//             <Badge>{taskDetails.priority}</Badge>
//             <Badge>{taskDetails.assignee}</Badge>
//             <Badge>{`${taskDetails.daysToGo} days left`}</Badge>
//           </div>
//         </div>
//       ),
//     };

//     setTasks((prev) => [...prev, newTask]);
//     setOpen(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button>Create New Task</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create a New Task</DialogTitle>
//             <DialogDescription>
//               Fill in the details below to create a new task for your team.
//             </DialogDescription>
//           </DialogHeader>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium">Task Name</label>
//               <Input name="name" type="text" placeholder="Enter task name" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Task Description</label>
//               <Textarea name="description" placeholder="Enter task description" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">No. of Days to Go</label>
//               <Input name="daysToGo" type="number" placeholder="Enter number of days" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Priority</label>
//               <Select name="priority">
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select priority" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="low">Low</SelectItem>
//                   <SelectItem value="medium">Medium</SelectItem>
//                   <SelectItem value="high">High</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Assignee Name</label>
//               <Input name="assignee" type="text" placeholder="Enter assignee name" required />
//             </div>
//             <Button className="w-full" type="submit">
//               Submit
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {tasks.length > 0 && (
//         <KanbanBoard columns={columns} tasks={tasks} setTasks={setTasks} />
//       )}
//     </div>
//   );
// };

// export default TaskManagementPage;


// "use client"
// import React from "react"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import KanbanBoard from "../../_components/KanbanBoard"
// import { useRouter } from "next/navigation"

// const TaskManagementPage = () => {
//   const router = useRouter()
//   const state = router.query

//   return (
//     <div className="container mx-auto p-6 flex justify-center items-center h-screen">
//       <KanbanBoard state={state} />
//     </div>
//   )
// }

// export default TaskManagementPage






"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import KanbanBoard from "../../_components/KanbanBoard";

const TaskManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const columns = [
    { id: "work-in-progress", title: "Work in Progress" },
    { id: "under-review", title: "Under Review" },
    { id: "completed", title: "Completed" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const taskDetails = {
      id: Date.now().toString(),
      name: formData.get("name"),
      description: formData.get("description"),
      daysToGo: formData.get("daysToGo"),
      priority: formData.get("priority"),
      assignee: formData.get("assignee"),
      columnId: "work-in-progress", // Default column
    };

    const newTask = {
      ...taskDetails,
      content: (
        <div>
          <h3 className="font-bold">{taskDetails.name}</h3>
          <p className="text-sm">{taskDetails.description}</p>
          <div className="flex gap-2 mt-2">
            <Badge>{taskDetails.priority}</Badge>
            <Badge>{taskDetails.assignee}</Badge>
            <Badge>{`${taskDetails.daysToGo} days left`}</Badge>
          </div>
        </div>
      ),
    };

    setTasks((prev) => [...prev, newTask]);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create New Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Task</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new task for your team.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Task Name</label>
              <Input name="name" type="text" placeholder="Enter task name" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Task Description</label>
              <Textarea name="description" placeholder="Enter task description" required />
            </div>
            <div>
              <label className="block text-sm font-medium">No. of Days to Go</label>
              <Input name="daysToGo" type="number" placeholder="Enter number of days" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <Select name="priority">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium">Assignee Name</label>
              <Input name="assignee" type="text" placeholder="Enter assignee name" required />
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {tasks.length > 0 && (
        <div className="mt-6 w-full">
          <KanbanBoard columns={columns} tasks={tasks} setTasks={setTasks} />
        </div>
      )}
    </div>
  );
};

export default TaskManagementPage;


// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import KanbanBoard from "../../_components/KanbanBoard";

// export default function TaskManagementPage() {
//   const [open, setOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [columns] = useState([
//     { id: "to-do", title: "To Do" },
//     { id: "in-progress", title: "In Progress" },
//     { id: "done", title: "Done" },
//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const taskDetails = {
//       id: Date.now().toString(),
//       name: formData.get("name"),
//       description: formData.get("description"),
//       daysToGo: formData.get("daysToGo"),
//       priority: formData.get("priority"),
//       assignee: formData.get("assignee"),
//       columnId: "to-do", // Default column
//     };

//     setTasks((prev) => [...prev, taskDetails]);
//     setOpen(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button>Create New Task</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create a New Task</DialogTitle>
//             <DialogDescription>
//               Fill in the details below to create a new task for your team.
//             </DialogDescription>
//           </DialogHeader>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium">Task Name</label>
//               <Input name="name" type="text" placeholder="Enter task name" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Task Description</label>
//               <Textarea name="description" placeholder="Enter task description" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">No. of Days to Go</label>
//               <Input name="daysToGo" type="number" placeholder="Enter number of days" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Priority</label>
//               <Select name="priority" required>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select priority" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="low">Low</SelectItem>
//                   <SelectItem value="medium">Medium</SelectItem>
//                   <SelectItem value="high">High</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Assignee Name</label>
//               <Input name="assignee" type="text" placeholder="Enter assignee name" required />
//             </div>
//             <Button className="w-full" type="submit">
//               Submit
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {tasks.length > 0 ? (
//         <KanbanBoard columns={columns} tasks={tasks} setTasks={setTasks} />
//       ) : (
//         <div className="flex flex-col items-center">
//           <p className="mt-4 text-gray-600">
//             No tasks available. Click "Create New Task" to add one.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
