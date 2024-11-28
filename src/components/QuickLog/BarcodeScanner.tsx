import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BarcodeScanner({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-0 left-0 p-2 text-white bg-gray-900 bg-opacity-50 rounded-lg m-4 z-10"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="relative aspect-[3/4] bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-48 border-2 border-white rounded-lg">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
              <p>Center the barcode in the box</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}