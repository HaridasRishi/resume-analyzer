'use client';

import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

export default function UploadBox({ onUpload }: any) {
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    onUpload(data);
    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop,
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-10 text-center cursor-pointer">
      <input {...getInputProps()} />
      {loading ? 'Analyzing...' : 'Drag & Drop Resume (PDF)'}
    </div>
  );
}
