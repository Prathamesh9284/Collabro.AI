

"use client"
import React, { useState } from "react"
import { createPortal } from "react-dom"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import ColumnContainer from "./ColumnContainer"
import TaskCard from "./TaskCard"
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"

export default function KanbanBoard({ columns, setColumns, tasks, setTasks }) {
  const [activeColumn, setActiveColumn] = useState(null)
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  )

  const columnIds = columns.map((col) => col.id)

  return (
    <div className="flex flex-col items-center space-y-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-4">
          <SortableContext items={columnIds}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
              />
            ))}
          </SortableContext>

          {/* <Button
            variant="outline"
            onClick={createColumn}
            className="h-[60px] w-[350px] flex items-center justify-center gap-2"
          >
            <IconPlus /> Add Column
          </Button> */}
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <div className="w-[350px] h-[250px] bg-gray-200 rounded-md opacity-50 flex items-center justify-center">
                {activeColumn.title}
              </div>
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )

  function handleDragStart(event) {
    const { current } = event.active.data
    if (!current) return
    if (current.type === "Column") setActiveColumn(current.column)
    else if (current.type === "Task") setActiveTask(current.task)
  }

  function handleDragEnd(event) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const activeType = active.data.current?.type
    if (activeType === "Column") {
      const oldIndex = columns.findIndex((c) => c.id === active.id)
      const newIndex = columns.findIndex((c) => c.id === over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((prev) => arrayMove(prev, oldIndex, newIndex))
      }
    } else if (activeType === "Task") {
      const activeTaskObj = tasks.find((t) => t.id === active.id)
      const overTaskObj = tasks.find((t) => t.id === over.id) || { columnId: over.id }
      if (!activeTaskObj || !overTaskObj) return
      if (activeTaskObj.columnId !== overTaskObj.columnId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === active.id ? { ...t, columnId: overTaskObj.columnId } : t
          )
        )
      }
    }
  }

  function handleDragOver(event) {
    const { active, over } = event
    if (!over) return
    const activeType = active.data.current?.type
    const overType = over.data.current?.type
    console.log(activeType, overType);
    if (activeType === "Task" && overType === "Task") {
      const activeTaskObj = tasks.find((t) => t.id === active.id)
      const overTaskObj = tasks.find((t) => t.id === over.id)
      if (activeTaskObj && overTaskObj && activeTaskObj.columnId !== overTaskObj.columnId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeTaskObj.id ? { ...t, columnId: overTaskObj.columnId } : t
          )
        )
      }
    }
  }

  function createColumn() {
    const newCol = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    }
    setColumns((prev) => [...prev, newCol])
  }

  function deleteColumn(id) {
    setColumns((prev) => prev.filter((col) => col.id !== id))
    setTasks((prev) => prev.filter((task) => task.columnId !== id))
  }

  function updateColumn(id, newTitle) {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, title: newTitle } : col))
    )
  }

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: "New Task",
    }
    setTasks((prev) => [...prev, newTask])
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  function updateTask(id, newContent) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, content: newContent } : t))
    )
  }

  function generateId() {
    return Date.now().toString() + "-" + Math.floor(Math.random() * 10000)
  }
}








// // KanbanBoard.jsx
// import React from "react";
// import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import ColumnContainer from "./ColumnContainer";

// const KanbanBoard = ({ columns, tasks, setTasks }) => {
//   const sensors = useSensors(useSensor(PointerSensor));

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       setTasks((prevTasks) => {
//         const activeTask = prevTasks.find((task) => task.id === active.id);
//         if (activeTask) {
//           activeTask.columnId = over.id;
//           return [...prevTasks];
//         }
//         return prevTasks;
//       });
//     }
//   };

//   return (
//     <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
//       <div className="flex gap-4 overflow-auto">
//         <SortableContext items={columns.map((col) => col.id)}>
//           {columns.map((col) => (
//             <ColumnContainer
//               key={col.id}
//               column={col}
//               tasks={tasks.filter((task) => task.columnId === col.id)}
//             />
//           ))}
//         </SortableContext>
//       </div>
//     </DndContext>
//   );
// };

// export default KanbanBoard;


// "use client"
// import React, { useMemo, useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import {
//   DndContext,
//   DragOverlay,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import ColumnContainer from "./ColumnContainer";
// import TaskCard from "./TaskCard";
// import { IconPlus } from "@tabler/icons-react";

// function KanbanBoard({ state }) {
//   const [columns, setColumns] = useState([
//     { id: 1, title: "To Do" },
//     { id: 2, title: "In Progress" },
//     { id: 3, title: "Done" },
//   ]);

//   const [tasks, setTasks] = useState([
//     { id: 1, columnId: 1, content: "Task 1" },
//     { id: 2, columnId: 2, content: "Task 2" },
//     { id: 3, columnId: 3, content: "Task 3" },
//   ]);

//   const [activeColumn, setActiveColumn] = useState(null);
//   const [activeTask, setActiveTask] = useState(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
//   );

//   const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

//   return (
//     <div className="mt-5 flex flex-col items-center">
//       <DndContext
//         sensors={sensors}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//         onDragOver={handleDragOver}
//       >
//         <div className="flex gap-4">
//           <SortableContext items={columnsId}>
//             {columns.map((col) => (
//               <ColumnContainer
//                 key={col.id}
//                 column={col}
//                 tasks={tasks.filter((task) => task.columnId === col.id)}
//                 createTask={createTask}
//                 deleteTask={deleteTask}
//                 updateTask={updateTask}
//                 deleteColumn={deleteColumn}
//                 updateColumn={updateColumn}
//               />
//             ))}
//           </SortableContext>
//           <button
//             onClick={createColumn}
//             className="flex h-[60px] w-[350px] items-center justify-center gap-2 rounded-lg border-2 bg-gray-200 hover:ring-2 hover:ring-green-500"
//           >
//             <IconPlus /> Add Column
//           </button>
//         </div>

//         {createPortal(
//           <DragOverlay>
//             {activeColumn && (
//               <div className="w-[350px] h-[500px] bg-gray-200 opacity-50">
//                 {activeColumn.title}
//               </div>
//             )}
//             {activeTask && <TaskCard task={activeTask} />}
//           </DragOverlay>,
//           document.body
//         )}
//       </DndContext>
//     </div>
//   );

//   function handleDragStart(event) {
//     const { current } = event.active.data;
//     if (current.type === "Column") setActiveColumn(current.column);
//     if (current.type === "Task") setActiveTask(current.task);
//   }

//   function handleDragEnd(event) {
//     setActiveColumn(null);
//     setActiveTask(null);
//     const { active, over } = event;
//     if (!over) return;

//     if (active.data.current.type === "Column") {
//       setColumns((cols) => {
//         const oldIndex = cols.findIndex((c) => c.id === active.id);
//         const newIndex = cols.findIndex((c) => c.id === over.id);
//         return arrayMove(cols, oldIndex, newIndex);
//       });
//     } else if (active.data.current.type === "Task") {
//       const activeTask = tasks.find((t) => t.id === active.id);
//       const overTask = tasks.find((t) => t.id === over.id) || { columnId: over.id };

//       if (activeTask.columnId !== overTask.columnId) {
//         setTasks((tasks) => {
//           const updatedTasks = tasks.map((task) =>
//             task.id === activeTask.id
//               ? { ...task, columnId: overTask.columnId }
//               : task
//           );
//           return updatedTasks;
//         });
//       }
//     }
//   }

//   function handleDragOver(event) {
//     const { active, over } = event;
//     if (!over) return;
//     const activeType = active.data.current?.type;
//     const overType = over.data.current?.type;

//     if (activeType === "Task" && overType === "Task") {
//       const activeTask = tasks.find((t) => t.id === active.id);
//       const overTask = tasks.find((t) => t.id === over.id);
//       if (activeTask.columnId !== overTask.columnId) {
//         setTasks((tasks) =>
//           tasks.map((t) =>
//             t.id === activeTask.id ? { ...t, columnId: overTask.columnId } : t
//           )
//         );
//       }
//     }
//   }

//   function createColumn() {
//     setColumns([...columns, { id: generateId(), title: `Column ${columns.length + 1}` }]);
//   }

//   function deleteColumn(id) {
//     setColumns(columns.filter((col) => col.id !== id));
//     setTasks(tasks.filter((task) => task.columnId !== id));
//   }

//   function updateColumn(id, title) {
//     setColumns(
//       columns.map((col) => (col.id === id ? { ...col, title } : col))
//     );
//   }

//   function createTask(columnId) {
//     setTasks([...tasks, { id: generateId(), columnId, content: "New Task" }]);
//   }

//   function deleteTask(id) {
//     setTasks(tasks.filter((task) => task.id !== id));
//   }

//   function updateTask(id, content) {
//     setTasks(
//       tasks.map((task) => (task.id === id ? { ...task, content } : task))
//     );
//   }

//   function generateId() {
//     return Math.floor(Math.random() * 10000);
//   }
// }

// export default KanbanBoard;


// "use client"
// import React, { useMemo, useState } from "react"
// import { createPortal } from "react-dom"
// import {
//   DndContext,
//   DragOverlay,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core"
// import { SortableContext, arrayMove } from "@dnd-kit/sortable"
// import ColumnContainer from "./ColumnContainer"
// import TaskCard from "./TaskCard"
// import { IconPlus } from "@tabler/icons-react"
// import { Button } from "@/components/ui/button"

// function KanbanBoard({ state }) {
//   const [columns, setColumns] = useState([
//     { id: 1, title: "To Do" },
//     { id: 2, title: "In Progress" },
//     { id: 3, title: "Done" },
//   ])

//   const [tasks, setTasks] = useState([
//     { id: 1, columnId: 1, content: "Task 1" },
//     { id: 2, columnId: 2, content: "Task 2" },
//     { id: 3, columnId: 3, content: "Task 3" },
//   ])

//   const [activeColumn, setActiveColumn] = useState(null)
//   const [activeTask, setActiveTask] = useState(null)

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
//   )

//   const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <DndContext
//         sensors={sensors}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//         onDragOver={handleDragOver}
//       >
//         <div className="flex gap-4">
//           <SortableContext items={columnsId}>
//             {columns.map((col) => (
//               <ColumnContainer
//                 key={col.id}
//                 column={col}
//                 tasks={tasks.filter((task) => task.columnId === col.id)}
//                 createTask={createTask}
//                 deleteTask={deleteTask}
//                 updateTask={updateTask}
//                 deleteColumn={deleteColumn}
//                 updateColumn={updateColumn}
//               />
//             ))}
//           </SortableContext>

//           <Button
//             variant="outline"
//             onClick={createColumn}
//             className="h-[60px] w-[350px] flex items-center justify-center gap-2"
//           >
//             <IconPlus /> Add Column
//           </Button>
//         </div>

//         {createPortal(
//           <DragOverlay>
//             {activeColumn && (
//               <div className="w-[350px] h-[250px] bg-gray-200 rounded-md opacity-50 flex items-center justify-center">
//                 {activeColumn.title}
//               </div>
//             )}
//             {activeTask && <TaskCard task={activeTask} />}
//           </DragOverlay>,
//           document.body
//         )}
//       </DndContext>
//     </div>
//   )

//   function handleDragStart(event) {
//     const { current } = event.active.data
//     if (current.type === "Column") setActiveColumn(current.column)
//     if (current.type === "Task") setActiveTask(current.task)
//   }

//   function handleDragEnd(event) {
//     setActiveColumn(null)
//     setActiveTask(null)
//     const { active, over } = event
//     if (!over) return

//     if (active.data.current.type === "Column") {
//       setColumns((cols) => {
//         const oldIndex = cols.findIndex((c) => c.id === active.id)
//         const newIndex = cols.findIndex((c) => c.id === over.id)
//         return arrayMove(cols, oldIndex, newIndex)
//       })
//     } else if (active.data.current.type === "Task") {
//       const activeTask = tasks.find((t) => t.id === active.id)
//       const overTask = tasks.find((t) => t.id === over.id) || { columnId: over.id }
//       if (activeTask.columnId !== overTask.columnId) {
//         setTasks((tasks) =>
//           tasks.map((task) =>
//             task.id === activeTask.id ? { ...task, columnId: overTask.columnId } : task
//           )
//         )
//       }
//     }
//   }

//   function handleDragOver(event) {
//     const { active, over } = event
//     if (!over) return
//     const activeType = active.data.current?.type
//     const overType = over.data.current?.type
//     if (activeType === "Task" && overType === "Task") {
//       const activeTask = tasks.find((t) => t.id === active.id)
//       const overTask = tasks.find((t) => t.id === over.id)
//       if (activeTask?.columnId !== overTask?.columnId) {
//         setTasks((tasks) =>
//           tasks.map((t) =>
//             t.id === activeTask.id ? { ...t, columnId: overTask.columnId } : t
//           )
//         )
//       }
//     }
//   }

//   function createColumn() {
//     setColumns([
//       ...columns,
//       { id: generateId(), title: `Column ${columns.length + 1}` },
//     ])
//   }

//   function deleteColumn(id) {
//     setColumns(columns.filter((col) => col.id !== id))
//     setTasks(tasks.filter((task) => task.columnId !== id))
//   }

//   function updateColumn(id, title) {
//     setColumns(columns.map((col) => (col.id === id ? { ...col, title } : col)))
//   }

//   function createTask(columnId) {
//     setTasks([...tasks, { id: generateId(), columnId, content: "New Task" }])
//   }

//   function deleteTask(id) {
//     setTasks(tasks.filter((task) => task.id !== id))
//   }

//   function updateTask(id, content) {
//     setTasks(tasks.map((t) => (t.id === id ? { ...t, content } : t)))
//   }

//   function generateId() {
//     return Math.floor(Math.random() * 100000)
//   }
// }

// export default KanbanBoard


// "use client"
// import React from "react"
// import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
// import { SortableContext } from "@dnd-kit/sortable"
// import ColumnContainer from "./ColumnContainer"

// export default function KanbanBoard({ columns, tasks, setTasks }) {
//   const sensors = useSensors(useSensor(PointerSensor))

//   const handleDragEnd = (event) => {
//     const { active, over } = event
//     if (!over) return
//     if (active.data.current.type === "Task") {
//       const taskId = active.id
//       const newColumnId = over.id
//       setTasks((prev) =>
//         prev.map((task) =>
//           task.id === taskId ? { ...task, columnId: newColumnId } : task
//         )
//       )
//     }
//   }

//   return (
//     <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
//       <div className="flex gap-6 p-4">
//         <SortableContext items={columns.map((c) => c.id)}>
//           {columns.map((col) => {
//             const columnTasks = tasks.filter((t) => t.columnId === col.id)
//             return (
//               <ColumnContainer
//                 key={col.id}
//                 column={col}
//                 tasks={columnTasks}
//                 createTask={createTask}
//                 deleteTask={deleteTask}
//                 updateTask={updateTask}
//                 deleteColumn={() => {}}
//                 updateColumn={() => {}}
//               />
//             )
//           })}
//         </SortableContext>
//       </div>
//     </DndContext>
//   )

//   function createTask(columnId) {
//     const newTask = {
//       id: Date.now().toString(),
//       columnId,
//       content: "New Task",
//     }
//     setTasks((prev) => [...prev, newTask])
//   }

//   function deleteTask(id) {
//     setTasks((prev) => prev.filter((t) => t.id !== id))
//   }

//   function updateTask(id, newContent) {
//     setTasks((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, content: newContent } : t))
//     )
//   }
// }




// "use client"
// import React, { useState } from "react"
// import { createPortal } from "react-dom"
// import {
//   DndContext,
//   DragOverlay,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core"
// import { SortableContext, arrayMove } from "@dnd-kit/sortable"
// import ColumnContainer from "./ColumnContainer"
// import TaskCard from "./TaskCard"
// import { Button } from "@/components/ui/button"
// import { IconPlus } from "@tabler/icons-react"

// /**
//  * Combines the old drag-and-drop functionality (column + task reorder)
//  * with the new approach of receiving columns/tasks/setTasks as props.
//  *
//  * Note:
//  * 1) Call <KanbanBoard columns={columns} setColumns={setColumns} tasks={tasks} setTasks={setTasks} />
//  *    from your page or parent component, so that columns and tasks live in parent state.
//  * 2) This example includes column creation, deletion, renaming, and task creation, deletion, with drag reorder.
//  */
// export default function KanbanBoard({ columns, setColumns, tasks, setTasks }) {
//   const [activeColumn, setActiveColumn] = useState(null)
//   const [activeTask, setActiveTask] = useState(null)

//   const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }))

//   // We need the array of column IDs (for reordering columns):
//   const columnIds = columns.map((col) => col.id)

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <DndContext
//         sensors={sensors}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//         onDragOver={handleDragOver}
//       >
//         <div className="flex gap-4">
//           {/* SortableContext for columns */}
//           <SortableContext items={columnIds}>
//             {columns.map((col) => (
//               <ColumnContainer
//                 key={col.id}
//                 column={col}
//                 tasks={tasks.filter((task) => task.columnId === col.id)}
//                 createTask={createTask}
//                 deleteTask={deleteTask}
//                 updateTask={updateTask}
//                 deleteColumn={deleteColumn}
//                 updateColumn={updateColumn}
//               />
//             ))}
//           </SortableContext>

//           {/* For adding a new column */}
//           <Button
//             variant="outline"
//             onClick={createColumn}
//             className="h-[60px] w-[350px] flex items-center justify-center gap-2"
//           >
//             <IconPlus /> Add Column
//           </Button>
//         </div>

//         {createPortal(
//           <DragOverlay>
//             {activeColumn && (
//               <div className="w-[350px] h-[250px] bg-gray-200 rounded-md opacity-50 flex items-center justify-center">
//                 {activeColumn.title}
//               </div>
//             )}
//             {activeTask && <TaskCard task={activeTask} />}
//           </DragOverlay>,
//           document.body
//         )}
//       </DndContext>
//     </div>
//   )

//   function handleDragStart(event) {
//     const { current } = event.active.data
//     if (!current) return
//     if (current.type === "Column") setActiveColumn(current.column)
//     else if (current.type === "Task") setActiveTask(current.task)
//   }

//   function handleDragEnd(event) {
//     setActiveColumn(null)
//     setActiveTask(null)
//     const { active, over } = event
//     if (!over) return

//     const activeType = active.data.current?.type
//     if (activeType === "Column") {
//       // Reorder columns
//       const oldIndex = columns.findIndex((c) => c.id === active.id)
//       const newIndex = columns.findIndex((c) => c.id === over.id)
//       if (oldIndex !== -1 && newIndex !== -1) {
//         setColumns((prev) => arrayMove(prev, oldIndex, newIndex))
//       }
//     } else if (activeType === "Task") {
//       // Move or reorder tasks
//       const activeTaskObj = tasks.find((t) => t.id === active.id)
//       const overTaskObj = tasks.find((t) => t.id === over.id) || { columnId: over.id }
//       if (!activeTaskObj || !overTaskObj) return
//       if (activeTaskObj.columnId !== overTaskObj.columnId) {
//         setTasks((prev) =>
//           prev.map((t) =>
//             t.id === active.id ? { ...t, columnId: overTaskObj.columnId } : t
//           )
//         )
//       }
//     }
//   }

//   function handleDragOver(event) {
//     const { active, over } = event
//     if (!over) return

//     const activeType = active.data.current?.type
//     const overType = over.data.current?.type
//     if (activeType === "Task" && overType === "Task") {
//       const activeTaskObj = tasks.find((t) => t.id === active.id)
//       const overTaskObj = tasks.find((t) => t.id === over.id)
//       if (activeTaskObj && overTaskObj && activeTaskObj.columnId !== overTaskObj.columnId) {
//         // Move active task to the new column
//         setTasks((prev) =>
//           prev.map((t) =>
//             t.id === activeTaskObj.id ? { ...t, columnId: overTaskObj.columnId } : t
//           )
//         )
//       }
//     }
//   }

//   function createColumn() {
//     const newCol = { id: generateId(), title: `Column ${columns.length + 1}` }
//     setColumns((prev) => [...prev, newCol])
//   }

//   function deleteColumn(id) {
//     setColumns((prev) => prev.filter((col) => col.id !== id))
//     setTasks((prev) => prev.filter((task) => task.columnId !== id))
//   }

//   // function updateColumn(id, newTitle) {
//   //   setColumns((prev) =>
//   //     prev.map((col) => (col.id === id ? { ...col, title: newTitle } : col))
//   //   )
//   // }

//   function updateColumn(id, title) {
//     setActiveColumn(columns.map((col) => (col.id === id ? { ...col, title } : col)))
//   }


//   function createTask(columnId) {
//     const newTask = {
//       id: generateId(),
//       columnId,
//       content: "New Task",
//     }
//     setTasks((prev) => [...prev, newTask])
//   }

//   function deleteTask(taskId) {
//     setTasks((prev) => prev.filter((t) => t.id !== taskId))
//   }

//   function updateTask(id, newContent) {
//     setTasks((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, content: newContent } : t))
//     )
//   }

//   function generateId() {
//     return Date.now().toString() + "-" + Math.floor(Math.random() * 10000)
//   }
// }



