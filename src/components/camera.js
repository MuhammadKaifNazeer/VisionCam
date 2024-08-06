"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, Video, Images } from "lucide-react";

function CameraComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsDialogOpen(true); // Open dialog after capture
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = "image.png"; // Or any desired name
    link.click();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="object-cover w-full h-full" // Covers entire screen
      />
      <div className="fixed bottom-10 right-[50%] translate-x-[50%] flex items-center justify-center gap-4 ">
        <button
          type="button"
          className="text-black hover:text-blue-500 transition duration-200 bg-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          <Video size="20" />
        </button>
        <button
          type="button"
          onClick={capture}
          className="text-black hover:text-blue-500 transition duration-200 bg-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          <Camera size="30" />
        </button>
        <button
          type="button"
          className="text-black hover:text-blue-500 transition duration-200 bg-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          <Images size="20" />
        </button>
      </div>
      {capturedImage &&
        isDialogOpen && ( // Only show dialog if captured and open
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center">
            <div className="bg-white rounded-lg p-4 shadow-md max-w-3xl">
              <img
                src={capturedImage}
                alt="Captured image"
                className="rounded-lg mb-4 max-h-[20rem]"
              />
              <div className="flex justify-between gap-2">
                <button
                  onClick={closeDialog}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 transition duration-200 rounded-md w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={downloadImage}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white transition duration-200 rounded-md w-full"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default CameraComponent;
