import React, { useState } from "react";
import { AiFillCamera } from "react-icons/ai";

function CameraComp() {
  const [source, setSource] = useState(null);

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  return (
    <div>
      <h1>사진 업로드</h1>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
        style={{ display: "none" }}
      />
      <label
        htmlFor="icon-button-file"
        style={{
          padding: "6px 25px",
          backgroundColor: "#FF6600",
          borderRadius: "4px",
          color: "white",
          cursor: "pointer",
        }}
      >
        <AiFillCamera />
      </label>

      {source && <img src={source} alt="animal" width="200" />}
    </div>
  );
}

export default CameraComp;
