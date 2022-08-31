import './singleChar.scss';
import useMarvelService from '../services/MarvelService';
import { useParams, Link } from 'react-router-dom';
import {useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/ErrorMessage';
        
const SingleChar = () => {
    const {charId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [charId])

    const updateComic = () => {
        clearError();
        getCharacter(charId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {name, descr, thumbnail} = comic;

    return (
    <div className="single-comic">
          <img src={thumbnail} alt={name} className="single-comic__char-img"/>
       <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{descr}</p>
       </div>
    </div>
    )
    

}
   
export default SingleChar;