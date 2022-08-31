
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import SearchCharacterForm from '../searchCharacterForm/SearchCharacter'

import {useState } from "react";


const MainPage = () => {
   const [selectedChar,setSelectedChar] = useState(null)

   function onCharSelected(id){
        setSelectedChar(id)
    }


    return (
        <>
        <RandomChar/>    
        <div className="char__content">
       
          <ErrorBoundary>
            <CharList onCharSelected = {onCharSelected}/>
          </ErrorBoundary>
          <div>
          <ErrorBoundary>
            <CharInfo selectedChar = {selectedChar}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchCharacterForm/>
          </ErrorBoundary>
        </div>
        </div>
          <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;