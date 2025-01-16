// "use client";
// import { useState } from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { IconTrash, IconEdit, IconCheck } from "@tabler/icons-react";

// function TaskCard({ task, deleteTask, updateTask }) {
//   const [mouseIsOver, setMouseIsOver] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [taskContent, setTaskContent] = useState(task.content);

//   const {
//     setNodeRef,
//     attributes,
//     listeners,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({
//     id: task.id,
//     data: {
//       type: "Task",
//       task,
//     },
//   });

//   const style = {
//     transition,
//     transform: CSS.Transform.toString(transform),
//     opacity: isDragging ? 0.5 : 1,
//     cursor: editMode ? "text" : "grab",
//   };

//   const toggleEditMode = () => {
//     if (editMode) {
//       updateTask(task.id, taskContent); // Save changes
//     }
//     setEditMode((prev) => !prev);
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className={`relative flex flex-col min-h-[100px] rounded-lg p-3 bg-white shadow-md hover:shadow-lg transition ${
//         isDragging ? "opacity-50" : ""
//       }`}
//       onMouseEnter={() => setMouseIsOver(true)}
//       onMouseLeave={() => setMouseIsOver(false)}
//     >
//       {editMode ? (
//         <textarea
//           className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={taskContent}
//           autoFocus
//           placeholder="Edit task content..."
//           onChange={(e) => setTaskContent(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               toggleEditMode();
//             }
//           }}
//         />
//       ) : (
//         <p className="flex-grow overflow-hidden text-ellipsis whitespace-pre-wrap">
//           {task.content}
//         </p>
//       )}

//       <div className="flex justify-between items-center mt-2">
//         <div className="flex gap-2">
//           <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//             Priority: {task.priority}
//           </span>
//           <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
//             {task.daysToGo} days left
//           </span>
//           <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//             Assignee: {task.assignee}
//           </span>
//         </div>
//         <div className="flex gap-2">
//           {editMode ? (
//             <button
//               onClick={toggleEditMode}
//               className="p-1 rounded bg-green-500 text-white hover:bg-green-600"
//               title="Save changes"
//             >
//               <IconCheck size={16} />
//             </button>
//           ) : (
//             <button
//               onClick={toggleEditMode}
//               className="p-1 rounded bg-gray-500 text-white hover:bg-gray-600"
//               title="Edit task"
//             >
//               <IconEdit size={16} />
//             </button>
//           )}
//           <button
//             onClick={() => deleteTask(task.id)}
//             className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
//             title="Delete task"
//           >
//             <IconTrash size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TaskCard;


// // import React from "react";
// // import KanbanBoard from "../_components/KanbanBoard";
// // import { useLocation } from "react-router-dom";

// // const ScreeningSchedule = () => {
// //   const state = useLocation();
// //   return (
// //     <div className="w-full overflow-scroll">
// //       <KanbanBoard state={state} />
// //     </div>
// //   );
// // };

// // export default ScreeningSchedule;



"use client"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IconTrash, IconEdit, IconCheck } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [taskContent, setTaskContent] = useState(task.content)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: task.id,
      data: { type: "Task", task },
    })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: editMode ? "text" : "grab",
  }

  const toggleEditMode = () => {
    if (editMode) {
      updateTask(task.id, taskContent)
    }
    setEditMode((prev) => !prev)
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative p-2 ${isDragging ? "opacity-50" : ""}`}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <CardContent className="flex flex-col space-y-2">
        {editMode ? (
          <Textarea
            value={taskContent}
            autoFocus
            onChange={(e) => setTaskContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                toggleEditMode()
              }
            }}
          />
        ) : (
          <p className="whitespace-pre-wrap">{task.content}</p>
        )}

        <div className="flex items-center justify-between">
          <Button size="icon" variant="outline" onClick={toggleEditMode}>
            {editMode ? <IconCheck size={16} /> : <IconEdit size={16} />}
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => deleteTask(task.id)}
          >
            <IconTrash size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard