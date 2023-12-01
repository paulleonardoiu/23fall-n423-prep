import React from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';
import CatImage from '@/components/CatImage';
import useAppState from '@/useHooks/useAppState';
import styles from '@/styles/Cat.module.css';

export default function Home(){
  // const [catImages, setCatImages] = React.useState([]);
  const appState = useAppState();
  const [catDetails, setCatDetails] = React.useState('');

  console.log(appState);

  function getCatImages(){
    fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg,png&format=json&has_breeds=true&order=RANDOM&limit=10')
    .then(r=> r.json())
    .then(r=>{
      appState.updateAppState({catImages: r});
    })
    .catch((e)=>{
      console.warn(e);
    })
  }

  function saveCatImage(selectedCat){
    appState.updateAppState({ favoriteCats: appState.favoriteCats.concat(selectedCat)})
  }


  return (
    <>
      <div className={styles.siteContainer}>
        <div className={styles.container}>
          <h1>Home</h1>
          <Grid className={styles.grid} columns='1'>
            <Grid.Column>
               <Header className={styles.center} as='h1'>Random Cats</Header>
            </Grid.Column>
            <Button className={styles.center} content='Reload Cats' icon='sync' color='blue' onClick={getCatImages}/>
            <Grid.Row columns='5'>
              {appState.catImages.map((catImage) => {
                return <CatImage id={catImage.id} key={catImage.id} src={catImage.url} onClick={() => saveCatImage(catImage)}>
                </CatImage>
              })}
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </>
  );
}