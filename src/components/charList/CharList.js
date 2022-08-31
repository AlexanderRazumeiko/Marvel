import './charList.scss';
import { useRef , useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';



const CharList = (props) =>  {
    const [charList,setCharList] = useState([]),
          [newLoading,setNewLoading] = useState(false),
          [offset,setOffset] = useState(319),
          [ended,setEnded] = useState(false)

const {loading,error,getAllCharacters,clearError} =  useMarvelService()


useEffect(() => {
    requestCharacters(offset)
   },[])

const requestCharacters = (offset) => {
    charLoading()
    getAllCharacters(offset)
    .then(charLoaded)
    .catch(clearError) 
}


const charLoaded = (newCharList) => {
    let ended = false
    if(newCharList.length < 9 || offset == 1553) {
    ended = true
        setEnded(ended)
    }
    setCharList([...charList,...newCharList])
    setOffset(offset => offset + 9) 
    setNewLoading(false)
    setEnded(ended)
  }





const charLoading = () => {
     setNewLoading(true)
}





const itemsRef = useRef([]);

const onFocus = (id) => {
    itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
    itemsRef.current[id].classList.add('char__item_selected');
    itemsRef.current[id].focus();
    
}

const renderItems = (arr) => {
 const items = arr.map((char,i) => {
    return (
    <div
        className="char__item">
        <li className="char__item" 
        tabIndex={0}
        ref={(el) => itemsRef.current[i] = el}
        key = {i}
        onClick = {() => {
            props.onCharSelected(char.id)
            onFocus(i)}}>
          <img src={char.thumbnail} alt="abyss"/>
            <div className="char__name">{char.name}</div>
        </li> 
    </div>
  
   
    )
})
return (
    <ul className="char__grid">
            {items}
    </ul>
)

}

    const items = renderItems(charList)   
     // const spinner = loading ? <Spinner/>: null;

     
      const content = !error ? items : null;
      const errorMessage = error ? <ErrorMessage/>: null
      const button = newLoading && !error? <Spinner/> : <Button  
                                                newLoading = {newLoading} 
                                                offset = {offset} 
                                                requestCharacters = {requestCharacters}/>
      return (
        
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                    {errorMessage}
                </ul>
        
                {ended ? null: button}
            </div>
       
        )
    
   
}

const Button = (props) => {
    const {newLoading, offset, requestCharacters} = props
    return (
        <button className="button button__main button__long"
        onClick={() => requestCharacters(offset)}
        disabled = {newLoading}>
            <div className="inner">load more</div>
        </button> 
    )
}


export default CharList;