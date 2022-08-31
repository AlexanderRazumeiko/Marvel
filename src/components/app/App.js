import AppHeader from '../appHeader/AppHeader'
import {Routes,BrowserRouter as Router,Route} from 'react-router-dom'
import {MainPage,ComicsPage} from '../pages'
import SingleComic from '../singleComic/SingleComic'
import SingleChar from '../singleChar/SingleChar'
const  App = () => { 
  return (

  
    <Router>
    <div className="app">
          <AppHeader/>
      <main>
        <Routes>
        <Route path = "/" element={<MainPage/>}/>
        <Route path = "/comics" element={<ComicsPage/>}/>
        <Route path = "/comics/:comicId" element={<SingleComic/>}/>
        <Route path = "/characters/:charId" element={<SingleChar/>}/>
        </Routes>
      </main>
    </div>
  </Router>
   
  )
}

export default App;