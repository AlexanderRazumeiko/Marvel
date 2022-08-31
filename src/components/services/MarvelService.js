import {useHttp} from '../hooks/http.hook'



const  useMarvelService = () => { 
  const {request,loading,error,clearError,process,setProcess} = useHttp();
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = '1590f9e63af1c79e8c48c2399cd4226e'
  const _apiOffset = 319
  

 const getAllCharacters = async (offset = _apiOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`)
    return res.data.results.map(_transformCharacter)
 }

 const getCharacter = async (id) => { 
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
    return _transformCharacter(res.data.results[0])
}

const getCharacterByName = async (name) => {
   const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
   return res.data.results.map(_transformCharacter);
}

const getAllComics = async (offset = _apiOffset) => {
   const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`)
   return res.data.results.map(_transformComics)
}

const getComics = async (id) => {
   const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
   return _transformComics(res.data.results[0])
}

const _transformCharacter = (char) => {
 
return {
      name: char.name,
      descr: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
}

}

const _transformComics = (comics) => {
   return {
       id: comics.id,
       title: comics.title,
       description: comics.description || 'There is no description',
       pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
       thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
       language: comics.textObjects.language || 'en-us',
       price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
   }
}

return {getAllCharacters,
   getCharacter,
   getCharacterByName, 
   getComics,getAllComics,
   loading,
   error,
   clearError,
   process,
   setProcess}
}

export default useMarvelService;