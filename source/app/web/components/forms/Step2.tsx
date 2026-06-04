import React, { useState } from 'react'
import useFormStore from 'store/store'

interface Props {
  handleNextStep: () => void
  handlePreviousStep: () => void
}



import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { UserAuth } from 'context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';

export default function Step2({ handleNextStep, handlePreviousStep }: Props) {
  const [description, setDescription] = useState('')
  const [AssignmentFilePath, setAssignmentFilePath] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const { user } = UserAuth();
  const userId = user?.userId;
  const [uploadFiles, setUploadFiles] = useState({ AssignmentFile: null, back: null });
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState({ AssignmentFile: null, back: null });

  const setData = useFormStore((state) => state.setStep2Data)

  const handleNext = async (event: any) => {
    event.preventDefault();
    let hasError = false;
    setUploading(true);

    try {
      const storage = getStorage();
      const AssignmentFilePath = `assignmentFiles/${userId}_${new Date().getTime()}`;
      const AssignmentFileRef = ref(storage, AssignmentFilePath);

      // Upload the file directly without using Promise.all
      await uploadBytesResumable(AssignmentFileRef, uploadFiles.AssignmentFile);

      const AssignmentFileDownloadURL = await getDownloadURL(AssignmentFileRef);
      toast.success('File uploaded successfully.');
    } catch (error) {
      console.error('Error during file upload:', error);
      toast.error('Upload failed, please try again.');
    } finally {
      setUploading(false);
    }

    if (!description) {
      setDescriptionError('* This field is required');
      hasError = true;
    } else if (description.length < 25) {
      setDescriptionError('Must be at least 25 characters');
      hasError = true;
    } else {
      setDescriptionError('');
    }

    if (hasError) {
      return;
    }

    setData(description);
    handleNextStep();
  };

  const handlePrevious = () => {
    handlePreviousStep()
  }


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, side) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFiles((prevFiles) => ({ ...prevFiles, [side]: droppedFile }));
    setAssignmentFilePath(`assignmentFiles/${userId}_${new Date().getTime()}`);
  };

  const handleFileChange = (e, side) => {
    const file = e.target.files[0];
    setUploadFiles((prevUploadFiles) => ({ ...prevUploadFiles, [side]: file }));
    setAssignmentFilePath(`assignmentFiles/${userId}_${new Date().getTime()}`);
  };

  return (
    <div className="w-full">
      <div className="p-3 shadow-lg rounded-lg">
        <p className="mb-1 text-xs font-medium uppercase text-green-950 md:text-sm">
          Step 2/3
        </p>
        <p className="text-3xl font-bold text-green-950">Provide more details</p>
        <form className="mt-6 flex flex-col gap-4 md:mt-8">
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-2 text-lg font-medium text-gray-700"
            >
              What are the details?
            </label>
            <textarea
              placeholder="Write a summary of the key details"
              onChange={(e) => setDescription(e.target.value)}
              className={`h-32 w-full rounded-lg border-1bg-gray-50 p-2
              font-medium outline-none focus:border-blue-500`}
            />
            {descriptionError && (
              <span className="text-red-500">{descriptionError}</span>
            )}
          </div>
          <label
            htmlFor="description"
            className="mb-2 text-lg font-medium text-gray-700"
          >
            Assignment Files
          </label>
          <div
            className="drop-container h-40 flex align-center items-center justify-center rounded-md bg-gray-100 border-dashed border-2 border-sky-500 "
            onDrop={(e) => handleDrop(e, 'AssignmentFile')}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={(e) => handleFileChange(e, 'AssignmentFile')}
            />
            <p>Drag and drop a file here or click to select</p>
            {files.AssignmentFile && (
              <div>
                <p>Selected File: {files.AssignmentFile.name}</p>
                <p>File Type: {files.AssignmentFile.type}</p>
              </div>
            )}
          </div>
          <div className="mt-10 flex flex-row space-x-3 font-semibold">
            <button
              className="flex-1 rounded-xl bg-blue-100 py-2 text-center text-blue-800"
              onClick={handlePrevious}
            >
              Back
            </button>
            <button
              className="flex-1 rounded-xl bg-green-900 py-2 text-center text-white"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
