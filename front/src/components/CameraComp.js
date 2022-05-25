import React, { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 680,
  height: 720,
  facingMode: "environment",
};

function CameraComp() {
  const [image, setImage] = useState(null);

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={680}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>

      {image && <img src={image} alt="taken" width="300" />}
    </>
  );
}

export default CameraComp;
