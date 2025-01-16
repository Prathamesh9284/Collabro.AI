// import React from "react";
// import TaskCard from "./TaskCard";

// const ColumnContainer = ({ column, tasks }) => {
//   return (
//     <div className="w-72 bg-gray-100 p-4 rounded-md shadow-md">
//       <h2 className="text-lg font-bold mb-4">{column.title}</h2>
//       <div className="space-y-2">
//         {tasks.map((task) => (
//           <TaskCard key={task.id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ColumnContainer;


// "use client";
// import React from "react";
// import TaskCard from "./TaskCard";

// const ColumnContainer = ({ column, tasks }) => {
//   return (
//     <div className="w-72 bg-gray-100 p-4 rounded-md shadow-md">
//       <h2 className="text-lg font-bold mb-4">{column.title}</h2>
//       <div className="space-y-2">
//         {tasks.map((task) => (
//           <TaskCard key={task.id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ColumnContainer;




// WORKING CORRECTLY

// "use client"
// import React, { useState } from "react"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import TaskCard from "./TaskCard"
// import { IconPlus } from "@tabler/icons-react"

// function ColumnContainer({
//   column,
//   tasks,
//   createTask,
//   deleteColumn,
//   updateColumn,
//   deleteTask,
//   updateTask,
// }) {
//   const [editTitle, setEditTitle] = useState(false)
//   const [colTitle, setColTitle] = useState(column.title)

//   const saveTitle = () => {
//     updateColumn(column.id, colTitle)
//     setEditTitle(false)
//   }

//   return (
//     <Card
//       className="w-[350px] h-auto min-h-[400px] flex flex-col"
//       data={{ type: "Column", column }}
//       id={column.id}
//     >
//       <CardHeader className="flex items-center justify-between">
//         {editTitle ? (
//           <input
//             className="border rounded px-2 py-1 w-[140px]"
//             value={colTitle}
//             onChange={(e) => setColTitle(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") saveTitle()
//             }}
//             autoFocus
//           />
//         ) : (
//           <CardTitle>{column.title}</CardTitle>
//         )}
//         <div className="flex items-center gap-2">
//           {editTitle ? (
//             <Button variant="ghost" size="icon" onClick={saveTitle}>
//               Save
//             </Button>
//           ) : (
//             <Button variant="ghost" size="icon" onClick={() => setEditTitle(true)}>
//               Edit
//             </Button>
//           )}
//           <Button variant="destructive" size="icon" onClick={() => deleteColumn(column.id)}>
//             Del
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent className="flex-1 flex flex-col space-y-2">
//         {tasks.map((task) => (
//           <TaskCard
//             key={task.id}
//             task={task}
//             deleteTask={deleteTask}
//             updateTask={updateTask}
//           />
//         ))}
//         <Button
//           variant="outline"
//           className="mt-2"
//           onClick={() => createTask(column.id)}
//         >
//           <IconPlus size={16} /> Add Task
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }

// export default ColumnContainer


"use client"
import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import TaskCard from "./TaskCard"
import { IconPlus } from "@tabler/icons-react"

function ColumnContainer({
  column,
  tasks,
  createTask,
  deleteColumn,
  updateColumn,
  deleteTask,
  updateTask,
}) {
  const [editTitle, setEditTitle] = useState(false)
  const [colTitle, setColTitle] = useState(column.title)

  const saveTitle = () => {
    updateColumn(column.id, colTitle)
    setEditTitle(false)
  }

  return (
    <Card
      className="w-[350px] h-[60vh] border flex flex-col hover:border-violet-100 hover:bg-violet-50"
      data={{ type: "Column", column }}
      id={column.id}
    >
      <ScrollArea className="flex-1">
      <CardHeader className="flex items-center justify-between">
        {editTitle ? (
          <input
            className="border rounded px-2 py-1 w-[140px]"
            value={colTitle}
            onChange={(e) => setColTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle()
            }}
            autoFocus
          />
        ) : (
          <CardTitle>{column.title}</CardTitle>
        )}
        <div className="flex items-center gap-2">
          {editTitle ? (
            <Button variant="ghost" size="icon" onClick={saveTitle}>
              Save
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setEditTitle(true)}>
              Edit
            </Button>
          )}
          <Button variant="destructive" size="icon" onClick={() => deleteColumn(column.id)}>
            Del
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => createTask(column.id)}
        >
          <IconPlus size={16} /> Add Task
        </Button>
      </CardContent>
      </ScrollArea>
    </Card>
  )
}

export default ColumnContainer