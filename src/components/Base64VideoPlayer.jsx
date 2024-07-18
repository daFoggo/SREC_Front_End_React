import React, { useEffect, useRef } from 'react';

const Base64VideoPlayer = ({ base64String, play }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (base64String) {
      const mimeType = 'video/mp4';

      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      const videoUrl = URL.createObjectURL(blob);

      videoRef.current.src = videoUrl;

      return () => {    
        URL.revokeObjectURL(videoUrl);
      };
    }
  }, [base64String]);

  useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [play]);

  return (
    <video 
      ref={videoRef} 
      width="100%" 
      playsInline 
      style={{pointerEvents: 'none', borderRadius: '.5rem'}}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default Base64VideoPlayer;