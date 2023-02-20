import './App.css'
import LessonDetail from './pages/lessondetail/LessonDetail';
import FolderSet from './pages/folderset/Folder';
import LessonSet from './pages/lessonset/LessonSet';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [header, setHeader] = useState("Han's bookmark");
  const [folder, setFolder] = useState({ id: 0, name: "", description: "", backgroundColor: "white" });
  const [lesson, setLesson] = useState({ id: 0, name: "", description: "", backgroundColor: "white" });

  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/folders")
    .then((res) => {
      let data = res.data;
      setFolders(data);
    })
  }, []);


  const onFolderItemClicked = (id) => {
    axios.get("http://localhost:8080/api/")
    alert(id);
  }

  const onLessonItemClicked = (id) => {
    alert(id);
  }

  let view = <FolderSet data={folders} clicked={onFolderItemClicked} />;

  const handlerFolderClick = (folderId) => {
    // let lessones = [
    //   { id: 1, name: "lesson name 1 i4o", description: "descriptioin 1", backgroundColor: "#000" },
    //   { id: 2, name: "lesson name 2 i4o", description: "descriptioin 1", backgroundColor: "#000" },
    //   { id: 3, name: "lesson name 3 i4o", description: "descriptioin 1", backgroundColor: "#000" },
    // ]
    // setHeader(folder.name);
    // view = <LessonSet header={header} data={lessones} clicked={onLessonItemClicked} />;
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
