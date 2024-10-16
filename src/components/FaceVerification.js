import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const FaceVerification = () => {
  const webcamRef = useRef(null);
  const [verificationResult, setVerificationResult] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    sendToFaceVerificationAPI(imageSrc);
  }, [webcamRef]);

  const sendToFaceVerificationAPI = (imageSrc) => {
    // API call to your backend
    axios
      .post("/api/verify-face", { image: imageSrc })
      .then((response) => {
        if (response.data.verified) {
          setVerificationResult("Face verified successfully!");
        } else {
          setVerificationResult("Face verification failed.");
        }
      })
      .catch((error) => {
        console.error("Error verifying face:", error);
      });
  };

  return (
    <div>
      <h2>Face Verification</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
      />
      <button onClick={capture}>Verify Face</button>
      <p>{verificationResult}</p>
    </div>
  );
};

export default FaceVerification;
