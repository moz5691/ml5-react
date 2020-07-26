import React, { useRef, useEffect } from 'react';

/**
 * Just a component that I use for recording myself during video tutorials.
 */
const width = 600;
const height = 450;

const formatAsPercentage = (x) => `${Math.round(x * 100)}%`;

const Video = ({ yoloData }) => {
  const videoRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      });
  }, []);
  return (
    <>
      <video
        ref={videoRef}
        style={{ transform: 'scale(-1, 1)' }}
        width={width}
        height={height}
        id="video"
        style={{ zIndex: -1 }}
      />
      {yoloData.map((yolo, i) => (
        <div key={i}>
          <svg className="canvas" width="600" height="450">
            <rect
              x={yolo.normalized.x * width}
              y={yolo.normalized.y * height}
              width={yolo.normalized.width * width}
              height={yolo.normalized.height * height}
              style={{
                fill: 'blue',
                stroke: 'pink',
                strokeWidth: 3,
                fillOpacity: 0.1,
                strokeOpacity: 0.9,
              }}
            />
            <text
              x={yolo.normalized.x * width + 20}
              y={(yolo.normalized.y + yolo.normalized.height / 2) * height}
              fill="white"
              // font-family="Arial, Helvetica, sans-serif"
              // font-size="24"
            >
              {yolo.label} -- {formatAsPercentage(yolo.confidence)}
            </text>
          </svg>
        </div>
      ))}

      {/* <svg id="canvas" width="600" height="450">
        {yoloData &&
          yoloData.map((yolo, i) => (
            <>
              <rect
                x={yolo.normalized.x * width}
                y={yolo.normalized.y * height}
                width={yolo.normalized.width * width}
                height={yolo.normalized.height * height}
                style={{
                  fill: 'blue',
                  stroke: 'pink',
                  strokeWidth: 3,
                  fillOpacity: 0.1,
                  strokeOpacity: 0.9,
                }}
              />
              <text
                x={yolo.normalized.x * width + 20}
                y={(yolo.normalized.y + yolo.normalized.height / 2) * height}
                fill="white"
                font-family="Arial, Helvetica, sans-serif"
                font-size="24"
              >
                {yolo.label} -- {formatAsPercentage(yolo.confidence)}
              </text>
            </>
          ))}
      </svg> */}
    </>
  );
};

export default Video;
