import SetHeader from "../../components/setheader/SetHeader";
import ItemGroup from "../../components/itemgroup/ItemGroup";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import Form from "../../components/lessonform/Form";

export default function LessonSet() {
    const [folderLessons, setFolderLessons] = useState(null);
    let button_title = "New set";
    let params = useParams();
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);
    const [inputs, setInputs] = useState({"folderId": params.folderId});
    const formRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        axios.get("http://34.143.219.221:8080/api/folders/" + params.folderId + "/lessons")
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

    const handlerNewLessonClick = () => {
        setPopup(true);
    }

    const handlerCancel = (event) => {
        setPopup(false);
    }

    const handlerSubmit = (event) => {
        let name = formRef.current.name.value;
        // let content = formRef.current.content.value;
        let content = editorRef.current.getContent();

        let inputRef = {
            "folderId": params.folderId,
            "name": name,
            "content": content
        };

        axios.post("http://34.143.219.221:8080/api/lessons", inputRef)
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            })
        event.preventDefault();
        setPopup(false);
    }

    const handlerChange = (event) => {
        event.preventDefault();
        console.log(event.target.name);
        console.log(event.target.value);
        setInputs({
            [event.target.name]: event.target.value
        });
        event.target.name.focus();
    }

    const PopupShow = () => {
        return (
            <Popup open={popup} closeOnDocumentClick={false} closeOnEscape={false}>
                <Form title="Create new lesson" handlerCancel={handlerCancel} handlerSubmit={handlerSubmit} handlerChange={handlerChange} inputs={inputs}
                formRef={formRef} editorRef={editorRef}/>
            </Popup>
        );
    };


    return (
        <>
            <SetHeader header={header} button_title={button_title} clicked={handlerNewLessonClick}/>
            <ItemGroup item_list={lessons} clicked={handlerLessonClicked} />
            <PopupShow />
        </>
    );
}