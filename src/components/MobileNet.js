import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { DropzoneDialog } from 'material-ui-dropzone';

import classifyImg from '../utils/classification';
import formatAsPercentage from '../utils/formatAsPercentage';
import ProgressBar from './ProgressBar';

import img1 from '../assets/images/boat.jpg';
import img2 from '../assets/images/willsmith.jpg';
import img3 from '../assets/images/pengu.jpg';
import img4 from '../assets/images/unknown.jpg';
import img5 from '../assets/images/monarch.png';
import img6 from '../assets/images/fruits.png';
import img7 from '../assets/images/peppers.png';
import img8 from '../assets/images/tulips.png';
import img9 from '../assets/images/dock.png';
import img10 from '../assets/images/dog2.jpeg';
import img11 from '../assets/images/coke.jpg';
import img12 from '../assets/images/cat1.png';

const imageList = [
  { image: img1, title: 'Boat' },
  { image: img2, title: 'Will Smith' },
  { image: img3, title: 'Penguin' },
  { image: img4, title: 'Indri' },
  { image: img5, title: 'Monach' },
  { image: img6, title: 'Fruits' },
  { image: img7, title: 'Peppers' },
  { image: img8, title: 'Tulips' },
  { image: img9, title: 'Dock' },
  { image: img10, title: 'Dog' },
  { image: img11, title: 'Coke' },
  { image: img12, title: 'Cat' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '10px',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 600,
    overflowY: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
  list: {
    width: '100%',
    maxWidth: 400,
    textAlign: 'left',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MobileNet() {
  const classes = useStyles();

  const [selected, setSelected] = useState();
  const [predicts, setPredicts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageToRender, setImageToRender] = useState();

  console.log(imageList);

  useEffect(() => {
    setLoading(false);
  }, [predicts]);

  async function onSelect(id) {
    if (id) {
      setLoading(true);
      const results = await classifyImg(id);

      console.log('awaited result', results);

      setPredicts(results);
    }
  }

  return (
    <div className="App">
      <h3>Select or upload an image.</h3>
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList} cols={4}>
          {imageList.map((image, i) => (
            <GridListTile key={i} cols={1}>
              <img
                src={image.image}
                alt={image.title}
                id={image.title}
                // width="120"
                // height="100"

                onClick={() => {
                  setSelected(image.title);
                  setLoading(true);
                  setImageToRender(image.image);
                }}
              />
            </GridListTile>
          ))}
        </GridList>
        {/* <h2>Selected image is {selected}</h2> */}

        <Button
          onClick={() => onSelect(selected)}
          varient="contained"
          color="primary"
          size="large"
          disabled={!selected}
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Predict
        </Button>
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => setOpen(true)}
        >
          Add Image
        </Button>

        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText={'cancel'}
          submitButtonText={'submit'}
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}
          onSave={(files) => {
            console.log('Files:', files);
            setImageToRender(URL.createObjectURL(files[0]));
            onSelect('uploaded-image');
            setOpen(false);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </div>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {imageToRender && (
                <img
                  src={imageToRender}
                  id="uploaded-image"
                  width="300"
                  height="300"
                  alt="uploaded image"
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {loading ? (
                  <ProgressBar />
                ) : (
                  <div className={classes.list}>
                    <List>
                      {predicts.map((predict, i) => (
                        <ListItemText key={i}>
                          {predict.label}{' '}
                          {formatAsPercentage(predict.confidence)}
                        </ListItemText>
                      ))}
                    </List>
                  </div>
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MobileNet;
