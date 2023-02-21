import SetHeader from "../../components/setheader/SetHeader";
import ItemGroup from "../../components/itemgroup/ItemGroup";
import axios from "axios";
import { setCurrentFolder } from "./FolderSlice"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function FolderSet() {

    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let header = "Han's bookmark";
    let button_title = "New folder";

    useEffect(() => {
        axios.get("http://localhost:8080/api/folders")
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

    return (
        <>
            <SetHeader header={header} button_title={button_title} />
            <ItemGroup item_list={folders} clicked={handlerFolderClick}/>
        </>
    );
}