import React, { useState } from 'react';
import Video from './components/Video';
import classifyImg from './utils/classification';
import './App.css';
import * as ml5 from 'ml5';

import img1 from './assets/images/boat.jpg';
import img3 from './assets/images/willsmith.jpg';
import img4 from './assets/images/pengu.jpg';
import img5 from './assets/images/unknown.jpg';
import img6 from './assets/images/monarch.png';
import img7 from './assets/images/fruits.png';
import img8 from './assets/images/mountain.png';
import img9 from './assets/images/peppers.png';
import img10 from './assets/images/tulips.png';
import img11 from './assets/images/boat.png';
import img13 from './assets/images/dog2.jpeg';
import img14 from './assets/images/coke.jpg';
import img15 from './assets/images/cat1.png';
const imageList = [
  img1,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img13,
  img14,
  img15,
];

function App() {
  const [selected, setSelected] = useState();
  const [predicts, setPredicts] = useState([]);

  console.log(imageList);

  async function onSelect(id) {
    const results = await classifyImg(id);

    console.log('awaited result', results);
    setPredicts(results);
  }

  // if (!imageList) {
  //   return null;
  // }

  return (
    <div className="App">
      <div>
        {imageList.map((image, i) => (
          <img
            key={i}
            src={image}
            id={image}
            onClick={() => setSelected(image)}
            alt="images"
            width="200"
            height="200"
          />
        ))}
        <p>Selected image is {selected}</p>
        <button onClick={() => onSelect(selected)}>Predict</button>
      </div>

      <div>
        {predicts &&
          predicts.map((predict, i) => (
            <li key={i}>
              {predict.label} {(predict.confidence * 100).toFixed(2)}%
            </li>
          ))}
      </div>
      <Video />
    </div>
  );
}

export default App;
