import React, { useState, useEffect, useRef } from 'react';
import Video from './components/Video';
import './App.css';
import * as ml5 from 'ml5';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const maxIteration = 100;
let iteration = 0;
let yolo;
let objects = [];
let video;
let yoloStart = false;

function App2() {
  const [yoloData, setYoloData] = useState([]);

  async function yoloClassification() {
    video = document.getElementById('video');
    console.log(video);
    yolo = await ml5.YOLO('video', modelLoaded);
    // delay(2000);

    function modelLoaded() {
      console.log('model ready');
      yoloStart = true;
      detect();
    }
  }

  async function detect() {
    iteration = iteration + 1;
    console.log('current iter', iteration);
    // if (iteration > maxIteration) return;

    console.log('yoloStart', yoloStart);
    if (!yoloStart) {
      console.log('yoloStart', yoloStart);
      return;
    }
    // add delay to avoid burning CPU.
    await delay(250);
    await yolo.detect(video, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      objects = results;
      setYoloData(objects);

      if (objects) {
        // draw();
        console.log(objects);
      }

      detect();
    });
  }

  return (
    <div className="App">
      <div className="img-overlay-wrap">
        <Video yoloData={yoloData} />
        <button
          onClick={() => {
            yoloClassification();
          }}
        >
          YOLO START
        </button>
        <button onClick={() => (yoloStart = false)}>YOLO STOP</button>
      </div>
      {yoloData.map((yolo, i) => {
        return (
          <div>
            <p>Confidence: {yolo.confidence}</p>
            <p>Label: {yolo.label}</p>
            <p>x: {yolo.x}</p>
            <p>y: {yolo.y}</p>
            <p>width: {yolo.width}</p>
            <p>height: {yolo.height}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App2;
