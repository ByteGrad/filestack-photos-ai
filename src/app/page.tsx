"use client";

import { PickerOverlay } from "filestack-react";
import Image from "next/image";
import { useState } from "react";

const DEFAULT_POLICY =
  "eyJjYWxsIjpbInBpY2siLCJyZWFkIiwic3RhdCIsIndyaXRlIiwid3JpdGVVcmwiLCJzdG9yZSIsImNvbnZlcnQiLCJyZW1vdmUiLCJleGlmIiwicnVuV29ya2Zsb3ciXSwiZXhwaXJ5IjoxNzM1NTk2MDAwfQ==";
const DEFAULT_SIGNATURE =
  "c7de51c5e52ce37bbc65d156608205b67b15989f254fc698d04686df99fe24b8";
const FILESTACK_BASE_URL = `https://cdn.filestackcontent.com/${process.env.NEXT_PUBLIC_FILESTACK_API_KEY}/security=p:${DEFAULT_POLICY},s:${DEFAULT_SIGNATURE}`;

export default function Home() {
  const [showPicker, setShowPicker] = useState(false);
  const [uploadedFileHandle, setUploadedFileHandle] = useState("");

  return (
    <main className="flex flex-col justify-start pt-20 items-center flex-1">
      <div className="bg-zinc-800 w-full h-[300px] absolute top-0 z-[-1]" />

      <h1 className="text-5xl font-bold mb-8 text-white">
        Enhance your images here
      </h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={() => setShowPicker(true)}
      >
        Upload image for image enhancement
      </button>

      <div className="flex items-center gap-x-16 mt-32 mb-12 text-center">
        <div>
          <h2 className="text-2xl font-semibold mt-10 mb-2">Original</h2>
          {uploadedFileHandle && (
            <Image
              src={`${FILESTACK_BASE_URL}/${uploadedFileHandle}`}
              alt="Uploaded file"
              width={650}
              height={233}
            />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-10 mb-2">Result</h2>
          {uploadedFileHandle && (
            <Image
              src={`${FILESTACK_BASE_URL}/enhance=preset:auto/${uploadedFileHandle}`}
              alt="Uploaded file"
              width={650}
              height={233}
            />
          )}
        </div>
      </div>

      {showPicker && (
        <PickerOverlay
          apikey={process.env.NEXT_PUBLIC_FILESTACK_API_KEY!}
          clientOptions={{
            security: {
              policy: DEFAULT_POLICY,
              signature: DEFAULT_SIGNATURE,
            },
          }}
          pickerOptions={{
            accept: ["image/*"],
            onClose: () => setShowPicker(false),
            onUploadDone: (res) => {
              console.log(res.filesUploaded);
              setUploadedFileHandle(res.filesUploaded[0].handle);
              setShowPicker(false);
            },
          }}
        />
      )}
    </main>
  );
}
