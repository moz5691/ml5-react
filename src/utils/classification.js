import * as ml5 from 'ml5';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function classifyImg(id) {
  const image = document.getElementById(id);

  let results = [];
  try {
    const classifier = await ml5.imageClassifier('MobileNet');
    results = await classifier.predict(image);
    await delay(500);
    console.log('results', results);
  } catch (err) {
    console.log(err);
    return err;
  }
  // await delay(2000);
  return results;
}
