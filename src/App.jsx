import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";

import { drawHand } from "./utilities";

import "./App.css";

export default function App() {
  const webcamRef = useRef();
  const canvasRef = useRef();

  const runHandPose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded");

    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 50);
  };

  const detect = async (net) => {
    // check if data is available
    if (webcamRef?.current?.video?.readyState !== 4) return;

    // Get video properties
    const video = webcamRef.current.video;

    // Set video height and width
    video.width = video.videoWidth;
    video.height = video.videoHeight;

    // Set canvas height and width
    canvasRef.current.width = video.width;
    canvasRef.current.height = video.height;

    // Make detections
    const hand = await net.estimateHands(video);
    console.log("hand loaded: ", hand);

    // Draw mesh
    const ctx = canvasRef.current.getContext("2d");
    drawHand(hand, ctx);
  };

  runHandPose();

  return (
    <div className="App">
      <header>
        <Webcam className="webcam" ref={webcamRef} />
        <canvas className="canvas" ref={canvasRef} />
      </header>
    </div>
  );
}
