import React, { useState, useEffect, useRef } from 'react';
import Video from '../utils/Video';
import * as ml5 from 'ml5';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const maxIteration = 100;
let iteration = 0;
let yolo;
let objects = [];
let video;
let yoloStart = false;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Yolo() {
  const classes = useStyles();

  const [yoloData, setYoloData] = useState([]);
  const [showToggle, setShowToggle] = useState(false);

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
    // add delay to reduce CPU load, however, YOLO performance is degraded.
    // await delay(250);
    await yolo.detect(video, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      objects = results;
      setYoloData(objects);

      if (objects) {
        console.log(objects);
      }

      detect();
    });
  }

  return (
    <div className="App">
      <div className="img-overlay-wrap">
        <Video yoloData={yoloData} />
        <div className={classes.root}>
          <Button
            onClick={() => {
              yoloClassification();
            }}
            color="primary"
            variant="outlined"
            disabled={yoloStart}
          >
            YOLO START
          </Button>
          <Button
            onClick={() => (yoloStart = false)}
            color="secondary"
            variant="outlined"
            disabled={!yoloStart}
          >
            YOLO STOP
          </Button>
          <Button
            onClick={() => setShowToggle(!showToggle)}
            color="default"
            variant="outlined"
          >
            {!showToggle ? 'Show Detail' : 'Hide Detail'}
          </Button>
        </div>
      </div>
      {showToggle &&
        yoloData.map((yolo, i) => {
          return (
            <div key={i} style={{ textAlign: 'center' }}>
              <p>Confidence: {yolo.confidence}</p>
              <p>Label: {yolo.label}</p>
              <p>x: {yolo.x}</p>
              <p>y: {yolo.y}</p>
              <p>width: {yolo.width}</p>
              <p>height: {yolo.height}</p>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default Yolo;
