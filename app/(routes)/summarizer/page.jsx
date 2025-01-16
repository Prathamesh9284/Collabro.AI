
"use client";
import React, { useState } from "react";
import {
  IconChevronRight,
  IconFileUpload,
  IconProgress,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import FileUploadModal from "@/components/custom/file-upload-modal-2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

function SingleRecordDetails() {
  const { state } = useRouter();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(
    (state && state.analysisResult) || "",
  );
  const [filename, setFilename] = useState("");
  const [filetype, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("State:", state);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setFileType(file.type);
    setFilename(file.name);
    setFile(file);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      const base64Data = await readFileAsBase64(file);

      const imageParts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: filetype,
          },
        },
      ];

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Extract the text from the file and give me the text please`;


      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      setAnalysisResult(text);

      console.log("Analysis result:", text);

      const updatedRecord = await updateRecord({
        documentID: state.id,
        analysisResult: text,
        kanbanRecords: "",
      });
      setUploadSuccess(true);
      setIsModalOpen(false); // Close the modal after a successful upload
      setFilename("");
      setFile(null);
      setFileType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div>
        <Header />
    <div className="flex lg:mx-20  md:mx-20 sm:mx-10 flex-wrap gap-[26px] justify-center items-center">
      <button
        type="button"
        onClick={handleOpenModal}
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
      >
        <IconFileUpload className="text-orange-400" />
        Upload Reports
      </button>
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileChange={handleFileChange}
        onFileUpload={handleFileUpload}
        uploading={uploading}
        uploadSuccess={uploadSuccess}
        filename={filename}
      />
      <div className="w-full">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-xl border border-orange-300 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
                <div className="border-b border-orange-200 px-6 py-4 dark:border-neutral-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  AI-Driven Text Extractor
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                  A tailored document analysis leveraging advanced AI insights.
                  </p>
                </div>
                <div className="flex w-full flex-col px-6 py-4 text-white">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Analysis Result
                    </h2>
                    {/* <div className="space-y-2 text-gray-700">
                      <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    </div> */}
                    <div className="space-y-2 text-gray-700 break-words overflow-auto max-h-[300px]">
                      <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 border-orange-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      <span className="font-semibold text-gray-800 dark:text-neutral-200"></span>{" "}
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex gap-x-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SingleRecordDetails;