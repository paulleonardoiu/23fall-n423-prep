import React from 'react';
import { useRouter } from 'next/router';
import { Button, Loader, Image } from 'semantic-ui-react';
import Link from 'next/link';
import styles from '@/styles/Cat.module.css';

export default function CatPage(){
    const [catInfo, setCatInfo] = React.useState({loading: true });
    const router = useRouter();

    React.useEffect(function(){
        if(catInfo.id !== router.query.name && router.query.name){
            console.log('Load in cat details');
            fetch(`https://api.thecatapi.com/v1/images/${router.query.name}`)
            .then(r => r.json())
            .then(function (r){
                console.log(r);
                setCatInfo(r);
            })
            .catch((e)=>setCatInfo({loading: false, name: router.query.name}))
        }
    })

    return(
        <>
        <Loader active={catInfo.loading || catInfo.id != router.query.name}/>
        {
            catInfo.id ? (
                <>

                    <div className={styles.siteContainer}>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <Image className={styles.catImg} width={1000} src={catInfo.url}/>
                                <h2>{catInfo.breeds[0].name}</h2>
                                <h2>Weight: {catInfo.breeds[0].weight.metric} kg or {catInfo.breeds[0].weight.imperial} lbs</h2>
                                <p>{catInfo.breeds[0].description}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                {isNaN(catInfo.id)
                ? <h2>Searching for Cat</h2>
                : <h2>Cat Not Found</h2>
                }
                </>
            )
        }
        </>
    )
}