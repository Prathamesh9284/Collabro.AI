"use client"
import React, { useState } from 'react'
import Sidebar from '@/app/_components/Sidebar'
import { useUser, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LayoutGrid, AlignLeft } from 'lucide-react'

const RecordPage = () => {
  const { user } = useUser()
  const { orgId } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [fileName, setFileName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)
  const [records, setRecords] = useState([])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fileName || !description || !file) {
      alert('All fields are required!')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.secure_url) {
        const newRecord = {
          fileName,
          description,
          fileUrl: data.secure_url,
        }
        console.log("Title:", fileName)
        console.log("Description:", description)
        console.log("Image URL:", data.secure_url)
        setRecords([...records, newRecord])

        const formData = new FormData();
            formData.append('docname', fileName);
            formData.append('description', description);
            formData.append('link', data.secure_url);
            formData.append('file', file);

            try {
                const response = await fetch('http://127.0.0.1:8000/doc_manager', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('File stored successfully:', data.status);
                } 
            } catch (error) {
                console.error('Error storing file :', error);
            }
  
        setIsOpen(false)
        setFileName('')
        setDescription('')
        setFile(null)
      } else {
        alert('Failed to upload file!')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file!')
    }
  }

  return (
    <>
      <div className='flex'>
      <Sidebar />
      </div>
      <div className='lg:ml-40 sm:mx-5 my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-2xl'>Hello, {user?.fullName} </h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>+</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>Provide the file details below</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">File Name</label>
                  <Input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">File</label>
                  <Input type="file" onChange={handleFileChange} required />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className='mt-10 flex justify-between'>
          <div>
            <h2 className='font-medium text-primary'>Records</h2>
          </div>
          <div className='flex gap-2'>
            <LayoutGrid />
            <AlignLeft />
          </div>
        </div>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {records.map((record, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <h3 className="font-bold">{record.fileName}</h3>
              <p className="text-sm">{record.description}</p>
              <a
                href={record.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-2">View</Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RecordPage