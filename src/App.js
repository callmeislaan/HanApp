import './App.css'
import LessonDetail from './pages/lessondetail/LessonDetail';
import FolderSet from './pages/folderset/Folder';
import LessonSet from './pages/lessonset/LessonSet';
import { useState } from 'react';

function App() {

  
  const [header, setHeader] = useState("Han's bookmark");
  const [folder, setFolder] = useState({id: 0, name: "", description: "", backgroundColor: ""});
  
  let folders = [
    {id: 1, name: "folder name 1 i4o", description: "descriptioin 1", backgroundColor: "#000"},
    {id: 2, name: "folder name 1 i4o", description: "descriptioin 1", backgroundColor: "#000"},
    {id: 3, name: "folder name 1 i4o", description: "descriptioin 1", backgroundColor: "#000"},
  ]

  let view = <FolderSet data={folders}/>;

  const handlerFolderClick = (folderId) => {
    let lessones = [
      {id: 1, name: "lesson name 1 i4o", description: "descriptioin 1", backgroundColor: "#000"},
      {id: 2, name: "lesson name 2 i4o", description: "descriptioin 1", backgroundColor: "#000"},
      {id: 3, name: "lesson name 3 i4o", description: "descriptioin 1", backgroundColor: "#000"},
  ]
    setHeader(folder.name);
    view = <LessonSet header={header} data={lessones}/>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {view}

      </header>
    </div>
  );
}

export default App;
