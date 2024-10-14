import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import introVideo from "../../assets/IntroVideo.mp4";

const VideoIntro = ({ onEnd }) => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  useEffect(() => {
    if (isVideoEnded) {
      onEnd();  // Call the onEnd prop to hide the video and navigate
    }
  }, [isVideoEnded, onEnd]);

  return (
    <div className="video-intro">
      <video 
        src={introVideo} 
        onEnded={handleVideoEnd} 
        controls={false} 
        autoPlay 
        className="intro-video"
      />
    </div>
  );
};

export default VideoIntro;
