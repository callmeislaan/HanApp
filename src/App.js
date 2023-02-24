import './App.css'
import LessonDetail from './pages/lessondetail/LessonDetail';
import FolderSet from './pages/folderset/Folder';
import LessonSet from './pages/lessonset/LessonSet';
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className='App-header'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<FolderSet/>}/>
            <Route path="folders" element={<Outlet/>}>
              <Route index element={<FolderSet />}/>
              <Route path=":folderId/lessons" element={<Outlet />} >
                <Route index element={<LessonSet />} />
                <Route path=":lessonId" element={<LessonDetail />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
