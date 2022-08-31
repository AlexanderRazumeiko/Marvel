import './charInfo.scss';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import {useState , useEffect} from 'react';
import useMarvelService from '../services/MarvelService';


const CharInfo = (props) => {
    const [char,setChar] = useState(null);
    const {loading,getCharacter,error,setProcess,process,clearError} =  useMarvelService()

    useEffect(()=> {
        updateCharacter()
    }, [props.selectedChar]) 
        
   const updateCharacter = () => {
        const {selectedChar} = props;
        if(!selectedChar) {
            return;
        }
        clearError()
        getCharacter(selectedChar)
        .then(charLoaded)
        .then(() => setProcess('confirming'))
    }

    const charLoaded = (char) => {
        setChar(char)
    }
     
    const setContent = (process,char) => {
        switch(process) {
            case 'loading':
              return <Spinner/>
              break;
            case 'confirming':
              return <View char = {char}/>
              break;
            case 'error':
              return <ErrorMessage/>
              break;
            case 'waiting':
              return <Skeleton/>
              break;
            default:
              return 'Пошёл нахуй' 
        }   
    }
        
     return (

    <div className="char__info">
     {setContent(process,char)}
    </div>
    )
    
   
}

const View = ({char})  => {
const {name,homepage,wiki,descr,comics,thumbnail} = char;
 return (
    <>
    <div className="char__basics">
    <img src={thumbnail} alt="abyss"/>
    <div>
        <div className="char__info-name">{name}</div>
        <div className="char__btns">
            <a href={homepage} className="button button__main">
                <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
            </a>
        </div>
    </div>
</div>
<div className="char__descr">
   {descr}
</div>
<div className="char__comics">Comics:</div>
<ul className="char__comics-list">
{comics.length > 0 ? null: 'No comics'}  
{comics.map((item,i) => {
    if(i >10) {
        return;
    }
    return (
    <li className="char__comics-item"
    key = {i}>
        {item.name}
    </li>   
    )
})}
</ul>
</>
)
   
}

export default CharInfo;