import './comicsList.scss';
import { useRef , useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
        const [comicsList,setComicsList] = useState([]),
              [newLoading,setNewLoading] = useState(false),
              [offset,setOffset] = useState(319),
              [ended,setEnded] = useState(false)
    
    const {error,getAllComics,clearError} =  useMarvelService()
    
    
    const comicsLoaded = (newComicsList) => {
        let ended = false
        if(newComicsList.length < 8 || offset == 1553) {
        ended = true
            setEnded(ended)
        }
        setComicsList([...comicsList,...newComicsList])
        setOffset(offset => offset + 9) 
        setNewLoading(false)
        setEnded(ended)
      }
    
    
    useEffect(() => {
   
     requestComics(offset)
    },[])
    
    
    const comicsLoading = () => {
         setNewLoading(true)
    }
    
    
    const requestComics = (offset) => {
        clearError()
        comicsLoading()
        getAllComics(offset)
        .then(comicsLoaded)
       
       
    }
    
   
    const renderItems = (arr) => {
        const items = arr.map((comics,i) => {
           return (
            <li className="comics__item"
            key = {i}>
            <Link to = {`/comics/${comics.id}`}>
                <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{comics.name}</div>
                <div className="comics__item-price">{comics.price}</div>
            </Link>
        </li>
           )
       })
       return (
           <ul className="comics__grid">
               {items}
           </ul>
       )
       
       }

      const comics = renderItems(comicsList)   
      const content = !error ? comics : null;
      const errorMessage = error ? <ErrorMessage/>: null
      const button = newLoading && !error? <Spinner/> : <Button  
                                                newLoading = {newLoading} 
                                                offset = {offset} 
                                                requestComics = {requestComics}/> 
    return (
      
        <div className="comics__list">
            <>
            {content}
            {errorMessage}
            </>
            {ended ? null: button}
        </div>
    )

}
const Button = (props) => {
    const {newLoading, offset, requestComics} = props
    return (
        <button className="button button__main button__long"
        onClick={() => requestComics(offset)}
        disabled = {newLoading}>
            <div className="inner">load more</div>
        </button> 
    )
}



export default ComicsList;