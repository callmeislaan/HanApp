import './Content.css'
import './Insert.css'

import { useEffect, useRef, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import Popup from 'reactjs-popup';
import Button from '../button/Button'
import axios from 'axios';

export default function Content(props) {

    const [content, setContent] = useState("");
    const [popup, setPopup] = useState(false);
    const [selection, setSelection] = useState("");
    const formRef = useRef(null);

    let map_value = props.keyValues;


    const handlerOnDoubleClick = (data) => {
        console.log(data);
        setSelection(data.key);
        setPopup(true);
    }

    useEffect(() => {
        setContent(wordsHoverAssigned(props.content, map_value, handlerOnDoubleClick));
    }, []);

    const onCancelHanlder = () => {
        setSelection("");
        setPopup(false);
    }

    const onInsertHandler = () => {

        let inputRef = {
            "lessonId": props.lessonId,
            "transKey": selection.trim(),
            "transValue": formRef.current.transValue.value.trim()
        };

        axios.post("http://localhost:8080/api/lesson-key-value", inputRef)
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            })
        setPopup(false);
    }

    const handlerSubmit = (event) => {
        event.preventDefault();
    }

    const onDeleteHandler = (event) => {
        let httpUri = "http://localhost:8080/api/lessons/" + props.lessonId + "/key?key=" + selection;
        axios.delete(httpUri)
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            })
        setPopup(false);
    }

    const PopupShow = () => {
        let showValue = map_value.find(map => map.transKey == selection);
        let showTransValue = "";
        if (showValue) {
            showTransValue = showValue.transValue;
        }
        return (
            <Popup open={popup} closeOnDocumentClick={false} closeOnEscape={false}>
                <div className="Insert">
                    <form ref={formRef} onSubmit={(event) => handlerSubmit(event)}>
                        <div className='Selection'>{selection}</div>
                        <textarea placeholder={showValue} name='transValue' defaultValue={showTransValue} />
                        <div className='ButtonGroup'>
                            <Button button_title="Insert" clicked={onInsertHandler} />
                            <Button button_title="Delete" clicked={onDeleteHandler} />
                            <Button button_title="Cancel" clicked={onCancelHanlder} />
                        </div>
                    </form>
                </div>
            </Popup>
        );
    };

    let onKeyDownHandler = (event) => {
        event.preventDefault();
        let selected = getSelectionText();
        if (selected != "") {
            setSelection(selected);
            setPopup(true);
        }

    }

    return (
        <div className="Content" onContextMenu={onKeyDownHandler}>
            <PopupShow />
            {content}
        </div>
    );
}



function wordsHoverAssigned(content, map_value, handlerOnDoubleClick) {
    let index = 0;
    content = " " + content + " ";
    map_value.forEach(element => {
        let key = element.transKey.trim();
        let pattern = " " + key + " ";
        let replacePattern = " " + key + " ";
        let value = element.transValue.trim();
        let replaced = (keyindex) => <>
            {' '}
            <span key={keyindex} onDoubleClick={() => handlerOnDoubleClick({ key })}  className="KeyContent tooltip">
                {replacePattern}
                <span className='tooltiptext'>{value}</span>
            </span>
            {' '}
        </>
        content = reactStringReplace(content, pattern, (i) => replaced(key + i + index++));
    });
    return content;
}


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
