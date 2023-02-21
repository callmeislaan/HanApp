import './Content.css'
import './Insert.css'

import { useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import Popup from 'reactjs-popup';
import Button from '../button/Button'

export default function Content(props) {

    const [content, setContent] = useState("");
    const [popup, setPopup] = useState(false);
    const [selection, setSelection] = useState("");

    let map_value = props.keyValues;

    useEffect(() => {
        setContent(wordsHoverAssigned(props.content, map_value));
    }, []);

    const onCancelHanlder = () => {
        setSelection("");
        setPopup(false);
    }

    const onInsertHandler = () => {
        alert("Insert");
    }

    const PopupShow = () => {
        let button_title = "Insert";
        return (
            <Popup open={popup} closeOnDocumentClick={false} closeOnEscape={false}>
                <div className="Insert">
                    <form>
                        <div className='Selection'>{selection}</div>
                        <textarea placeholder="Value" />
                        <Button button_title="Insert" clicked={onInsertHandler} />
                        <Button button_title="Cancel" clicked={onCancelHanlder} />
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

function wordsHoverAssigned(content, map_value) {
    let index = 0;
    map_value.forEach(element => {
        let key = element.transKey.trim();
        let pattern = " " + key + " ";
        let replaced = (keyindex) => <span key={keyindex} className="KeyContent">{pattern}</span>;
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
