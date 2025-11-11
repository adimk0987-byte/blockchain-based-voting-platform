import React from "react";
import Webcam from "react-webcam";

const Camera = () => {
  const webcamRef = React.useRef(null);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>My Camera</h2>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "10px",
          border: "2px solid #444",
        }}
      />
    </div>
  );
};

export default Camera;
