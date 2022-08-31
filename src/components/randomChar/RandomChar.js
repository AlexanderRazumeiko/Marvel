import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../services/MarvelService';
import {useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const RandomChar = () => {
   
 const [char,setChar] = useState({})

   useEffect(() => {
     updateCharacter()
    }, []) 

   const {loading,error,getCharacter,clearError} = useMarvelService()


   const charLoaded = (char) => {
       setChar(char)
    }

    const updateCharacter = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
             getCharacter(id)
            .then(charLoaded)
            //.catch(clearError)
            
    }

        const spinner = loading ? <Spinner/>: null;
        const errorMessage = error ? <ErrorMessage/>: null;
        const content = !(loading || error) ?  <View char ={char}/>: null;

        return (
            <div className="randomchar">
               {content}
               {spinner}
               {errorMessage}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                        onClick={updateCharacter}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    
}   

const View = ({char}) => {
    const {name,descr,thumbnail,homepage,wiki} = char;
    let img = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let clazz = "randomchar__img"
    if(img) {
        clazz += "-notFound"
    }
    return (
  <div className="randomchar__block">
  <img src={thumbnail} alt="Random character" className={clazz}/>
    <div className="randomchar__info">
    <p className="randomchar__name">{name}</p>
    <p className="randomchar__descr">
    {descr ? descr.substr(0,150) + '...': 'No information for this Character'}
    </p>
    <div className="randomchar__btns">
        <a href={homepage} className="button button__main">
            <div className="inner">Homepage</div>
        </a>
        <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
        </a>
    </div>
    </div>
    </div>
    )
}

export default RandomChar;