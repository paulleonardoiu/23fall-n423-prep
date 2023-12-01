import React from 'react';
import { Popup, Button, Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import useAppState from '@/useHooks/useAppState';
import styles from '@/styles/Cat.module.css';


export default function CatImage({ id, src, children, onClick}){
  const appState = useAppState();

    return(
        <>
            <div className={styles.container}>
                <Grid.Column>
                    <Popup
                    trigger={<Image className={styles.selectableCat}src={src}/>}
                    on='click'
                    content={(<>
                    <Button color='green' icon='heart' content={children || 'Save'} onClick={onClick}/>
                    <Button as={Link} href={`/cats/${id}`}color='blue' icon='eye' content={'View'} onClick={()=>{console.log(id)}
                    }/>
                    </>)}
                    />            
                </Grid.Column>
            </div>
        </>
    )
}