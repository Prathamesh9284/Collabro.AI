
// "use client";
// import React, { useState } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import FileUploadModal from "@/components/custom/file-upload-modal";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { useRouter } from "next/navigation";
// import Header from "@/app/_components/Header";

// function Visuals() {
//   const { state } = useRouter();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [processing, setIsProcessing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(
//     (state && state.analysisResult) || "",
//   );
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   console.log("State:", state);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     console.log("Selected file:", file);
//     setFileType(file.type);
//     setFilename(file.name);
//     setFile(file);
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileUpload = async () => {
//     setUploading(true);
//     setUploadSuccess(false);

//     try {
//       const base64Data = await readFileAsBase64(file);

//       const imageParts = [
//         {
//           inlineData: {
//             data: base64Data,
//             mimeType: filetype,
//           },
//         },
//       ];
//       const formData = new FormData();
//         formData.append('file', file);


//       try {
//         const response = await fetch('http://127.0.0.1:8000/data_visualizer', {
//             method: 'POST',
//             body: formData,
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log('AI agent respone :', data);

//             const result = data.text;
           
//         } 
//     } catch (error) {
//         console.error('Error storing file :', error);
//     } 

//       setUploadSuccess(true);
//       setIsModalOpen(false); // Close the modal after a successful upload
//       setFilename("");
//       setFile(null);
//       setFileType("");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadSuccess(false);
//     } finally {
//       setUploading(false);
//     }
//   };


//   return (
//     <div>
//         <Header />
//     <div className="flex flex-wrap gap-[26px] mx-20">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
//       >
//         <IconFileUpload className="text-orange-400" />
//         Upload Reports
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         uploadSuccess={uploadSuccess}
//         filename={filename}
//       />
      
//     </div>
//     </div>
//   );
// }

// export default Visuals;



"use client"
import React, { useState } from "react"
import { IconFileUpload } from "@tabler/icons-react"
import Header from "@/app/_components/Header"
import FileUploadModal from "@/components/custom/file-upload-modal"
import Modal from "@/components/custom/Modal"

export default function Visuals() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [filetype, setFileType] = useState("")
  const [filename, setFilename] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // State to store AI response (the object of { key: url } pairs)
  const [aiResponse, setAiResponse] = useState({})
  // State for the selected .html file details
  const [selectedHTMLName, setSelectedHTMLName] = useState("")
  const [selectedHTMLUrl, setSelectedHTMLUrl] = useState("")
  const [resultModalOpen, setResultModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleFileChange = (e) => {
    if (!e.target.files?.length) return
    const uploadedFile = e.target.files[0]
    setFile(uploadedFile)
    setFileType(uploadedFile.type)
    setFilename(uploadedFile.name)
  }

  // Example utility for reading file as base64 if needed
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleFileUpload = async () => {
    setUploading(true)
    setUploadSuccess(false)

    try {
      // If your endpoint needs formData or just base64, adapt as needed:
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("http://127.0.0.1:8000/data_visualizer", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("AI agent response:", data)

      // Store the resulting object (e.g., { "cat_var_plots.html": "http://...", ... })
      setAiResponse(data)

      // Mark success and close the upload modal
      setUploadSuccess(true)
      setIsModalOpen(false)
      setFilename("")
      setFile(null)
      setFileType("")
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadSuccess(false)
    } finally {
      setUploading(false)
    }
  }

  // When user clicks a result button, open modal with the .html content
  const handleOpenResultModal = (htmlName, htmlUrl) => {
    setSelectedHTMLName(htmlName)
    setSelectedHTMLUrl(htmlUrl)
    setResultModalOpen(true)
  }

  // Close the result modal
  const handleCloseResultModal = () => {
    setResultModalOpen(false)
    setSelectedHTMLName("")
    setSelectedHTMLUrl("")
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-[26px] mx-20">
        {/* Upload Button */}
        <div>
            <button
            type="button"
            onClick={handleOpenModal}
            className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-violet-300 bg-white px-7 py-4 text-md font-medium text-gray-800 shadow-sm hover:bg-violet-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
            >
            <IconFileUpload className="text-violet-700" />
            Upload Reports
            </button>
        </div>

        {/* Dynamically create a button for each key in AI response */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 justify-center items-center gap-5">
        {Object.entries(aiResponse).map(([htmlName, htmlUrl]) => (
          <button
            key={htmlName}
            type="button"
            onClick={() => handleOpenResultModal(htmlName, htmlUrl)}
            className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-300 bg-white px-7 py-4 text-center justify-center text-sm font-medium text-gray-800 shadow-sm hover:bg-violet-50 hover:border-violet-200"
          >
            {htmlName}
          </button>
        ))}
        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileChange={handleFileChange}
        onFileUpload={handleFileUpload}
        uploading={uploading}
        uploadSuccess={uploadSuccess}
        filename={filename}
      />

      {/* Result Modal for displaying the selected .html file */}
      <Modal
        title={selectedHTMLName}
        isOpen={resultModalOpen}
        onClose={handleCloseResultModal}
        onAction={handleCloseResultModal}
        actionLabel="Close"
      >
        {/* Show the interactive HTML in an iframe if it supports cross-domain embedding */}
        <iframe
          src={selectedHTMLUrl}
          title={selectedHTMLName}
          className="w-full h-[500px] border-0"
        />
      </Modal>
    </div>
  )
}