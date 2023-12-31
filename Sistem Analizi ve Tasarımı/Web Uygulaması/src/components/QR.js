import React, { useRef, useEffect, useState } from 'react';

function App() {
  const video = useRef(null);
  const canvas = useRef(null);
  const [barcode, setBarcode] = useState(null);

  const openCam = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
      .then(stream => {
        video.current.srcObject = stream;
        video.current.play();

        const ctx = canvas.current.getContext('2d');

        setInterval(() => {
          canvas.current.width = video.current.videoWidth;
          canvas.current.height = video.current.videoHeight;
          ctx.drawImage(video.current, 0, 0, video.current.videoWidth, video.current.videoHeight);

          // You can add your custom image processing or other logic here

        }, 100);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <button onClick={openCam}>Kamerayı Aç</button>
      <div>
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas} />
      </div>
      {barcode && (
        <div>
          Bulunan barkod: {barcode}
        </div>
      )}
    </>
  );
}

export default App;
