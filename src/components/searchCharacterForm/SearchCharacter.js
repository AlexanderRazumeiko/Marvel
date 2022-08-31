import './SearchCharacter.scss'
import {Form, Formik, ErrorMessage as ErrorMessageField, Field} from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import useMarvelService from '../services/MarvelService'
import {Link} from 'react-router-dom'

const SearchCharacerForm = () => {
const [char,setChar] = useState(null)
const {error, getCharacterByName,clearError} =  useMarvelService()

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name)
        .then(onCharLoaded);
  }


  const results = !char ? null: char.length > 0 ?  <div className="char__search-wrapper">
    <div className="char__search-success">There is! Visit {char[0].name} page?</div>
      <Link to={`/characters/${char[0].id}`} className="button button__secondary">
       <div className="inner">To page</div>
      </Link>
    </div> : 
    <div className="char__search-error">
    The character was not found. Check the name and try again
    </div>; 


    return (    
      <div className="char__search-form">
        <Formik
         initialValues={{
            charName: ''
        }}
        validationSchema = {Yup.object({
            charName:Yup.string()
                .required('Field is required')   
        })}
        onSubmit = {({charName}) => {
         updateChar(charName)
        }}>
          <Form>
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                  <Field
                    id="charName" 
                    name='charName' 
                    type='text' 
                    placeholder="Enter name"/>
                   <button 
                     type='submit' 
                     className="button button__main">
                  <div className="inner">find</div>
                   </button>
                  </div>
            <ErrorMessageField name="charName" component="div" className="char__search-error"/>
         </Form>
        </Formik>
        {results}
       </div>
       
    )
}

export default SearchCharacerForm;