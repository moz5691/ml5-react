import React from 'react';

function Home() {
  return (
    <div className="App">
      <h2>Image Classification</h2>
      <img
        src="https://www.rug.nl/research/bernoulli/groups/autonomus-perceptive-systems/plaatjes-pdf/modified_alexnet.png"
        alt="classification"
      />

      <h2>YOLO Object Detection</h2>
      <img
        src="https://i0.wp.com/analyticsweek.com/wp-content/uploads/2019/11/object_tracker_gif.gif?fit=600%2C338&ssl=1"
        alt="yolo"
      />

      <span>
        <p>Image Sources</p>
        <a href="https://www.rug.nl/research/bernoulli/groups/autonomus-perceptive-systems/plaatjes-pdf/modified_alexnet.png">
          www.rug.nl
        </a>
        <a href="https://i0.wp.com/analyticsweek.com/wp-content/uploads/2019/11/object_tracker_gif.gif?fit=600%2C338&ssl=1">
          i0.wp.com
        </a>
      </span>
    </div>
  );
}

export default Home;
