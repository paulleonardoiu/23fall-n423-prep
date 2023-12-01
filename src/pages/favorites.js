import React from 'react';
import useAppState from '@/useHooks/useAppState';
import { Grid, Button, Header } from 'semantic-ui-react';
import CatImage from '@/components/CatImage';
import styles from '@/styles/Cat.module.css';


export default function Favorites(){
    const appState = useAppState();

    console.log(appState);

    function changeName(){
        const titles = ['Person', 'Actual', 'Radiant'];
        const randomTitleIndex = Math.floor(Math.random() * titles.length);

        appState.updateAppState({user: `Paul the ${titles[randomTitleIndex]}`})
    }

    return (
        <>
        <div className={styles.siteContainer}>
            <div className={styles.container}>
                <Grid className={styles.grid} columns={1}>
                    <Grid.Column>
                        <Header className={styles.center} as='h1'>{appState.user}'s Favorites</Header>
                    </Grid.Column>
                    <Button className={styles.center} content='Change Name' color='purple' icon='sync' onClick={changeName}/>
                    <Grid.Row columns={5}>
                        {appState.favoriteCats.map((cat)=>{
                            return <CatImage id={cat.id} key={cat.id} src={cat.url}/>
                        })}
                    </Grid.Row>
                </Grid>
            </div>
        </div>

            
        </>
    );
}