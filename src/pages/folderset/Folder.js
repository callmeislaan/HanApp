import SetHeader from "../../components/setheader/SetHeader";
import ItemGroup from "../../components/itemgroup/ItemGroup";
import axios from "axios";
import { setCurrentFolder } from "./FolderSlice"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Popup from "reactjs-popup";
import Form from "../../components/Form/Form";

export default function FolderSet() {

    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [popup, setPopup] = useState(false);
    const formRef = useRef(null);

    let header = "Han's bookmark";
    let button_title = "New folder";

    useEffect(() => {
        axios.get("http://34.143.219.221:8080/api/folders")
            .then((res) => {
                let data = res.data;
                setFolders(data);
            })
    }, []);

    const handlerFolderClick = (folderId) => {
        let currentFolder = folders.find((folder) => { return folder.id == folderId });
        dispatch(setCurrentFolder(currentFolder));
        navigate("/folders/" + folderId + "/lessons");
        console.log("folder Id: " + folderId);
    }

    const handlerNewFolderClick = () => {
        setPopup(true);
    }

    const handlerCancel = (event) => {
        setPopup(false);
    }

    const handlerSubmit = (event) => {

        let name = formRef.current.name.value;

        let inputRef = {
            "name": name
        };

        axios.post("http://34.143.219.221:8080/api/folders", inputRef)
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            })
        event.preventDefault();
        setPopup(false);
    }

    const PopupShow = () => {
        return (
            <Popup open={popup} closeOnDocumentClick={false} closeOnEscape={false}>
                <Form title="Create new folder" handlerCancel={handlerCancel} handlerSubmit={handlerSubmit} formRef={formRef}/>
            </Popup>
        );
    };

    return (
        <>
            <PopupShow />
            <SetHeader header={header} button_title={button_title} clicked={handlerNewFolderClick} />
            <ItemGroup item_list={folders} clicked={handlerFolderClick} />
        </>
    );
}