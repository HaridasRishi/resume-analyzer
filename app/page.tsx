'use client';

import { useState } from 'react';
import UploadBox from './components/UploadBox';

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">AI Resume Analyzer</h1>
      <UploadBox onUpload={setResult} />

      {result && (
        <div className="mt-6 p-4 border">
          <h2 className="text-xl font-semibold">Analysis</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
