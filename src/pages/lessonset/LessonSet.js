import SetHeader from "../../components/setheader/SetHeader";
import ItemGroup from "../../components/itemgroup/ItemGroup";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LessonSet() {
    const [folderLessons, setFolderLessons] = useState(null);
    let button_title = "New set";
    let params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/folders/" + params.folderId + "/lessons")
        .then((res) => {
            let data = res.data;
            setFolderLessons(data);
        })
    }, []);

    let header = "";
    let lessons = [];

    if (folderLessons != null) {
        header = folderLessons.folder.name;
        lessons = folderLessons.lessons;
    }

    const handlerLessonClicked = (lessonId) => {
        navigate("/folders/" + params.folderId + "/lessons/" + lessonId);
        console.log("/folders/" + params.folderId + "/lessons/" + lessonId);
    }

    return (
        <>
            <SetHeader header={header} button_title={button_title}/>
            <ItemGroup item_list={lessons} clicked={handlerLessonClicked} />
        </>
    );
}