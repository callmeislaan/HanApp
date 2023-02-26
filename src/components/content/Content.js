import './Content.css'
import './Insert.css'

import { useEffect, useRef, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import Popup from 'reactjs-popup';
import Button from '../button/Button'
import axios from 'axios';
import parse, { domToReact } from 'html-react-parser';
import jsxToString from 'jsx-to-string';
import ReactDOMServer from 'react-dom/server';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { compose } from '@reduxjs/toolkit';

export default function Content(props) {

    const [content, setContent] = useState("");
    const [popup, setPopup] = useState(false);
    const [selection, setSelection] = useState("");
    const formRef = useRef(null);

    let map_value = props.keyValues;

    useEffect(() => {
        setContent(wordsHoverAssigned(props.content, map_value));
    }, []);

    const handlerOnDoubleClick = (data) => {
        setSelection(data.trim());
        setPopup(true);
    }

    const wordsHoverAssigned = (content) => {
        let localContent = content;
        let index = 0;
        map_value.forEach(element => {
            let key = element.transKey.trim();
            let pattern = key;
            let replacePattern = key;
            let value = element.transValue.trim();
            let replaced = (keyindex) => {
                let repleacedValue =
                    <span key={keyindex} id="replace" repleacepattern={replacePattern} value={value} clickkey={key}>
                        {replacePattern}
                    </span>
                return reactElementToJSXString(repleacedValue);
            }

            localContent = reactStringReplace(localContent, pattern, (i) => replaced(key + i + index++));
        });

        const options = {
            replace: ({ attribs }) => {
                if (attribs && attribs.id === 'replace') {
                    console.log(attribs);
                    return <>
                        <span key={attribs.key} className="KeyContent tooltip" onClick={() => handlerOnDoubleClick(attribs.clickkey)}>
                            {console.log(attribs.repleacepattern)}
                            {attribs.repleacepattern}
                            <span className='tooltiptext'>{attribs.value}</span>
                        </span>
                    </>
                }
            }
        }
        if (typeof localContent === 'string') {
            return parse(localContent, options);
        }
        return parse(localContent.join(""), options);
    }

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

        axios.post("http://hanappapp:8080/api/lesson-key-value", inputRef)
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
        let httpUri = "http://hanappapp:8080/api/lessons/" + props.lessonId + "/key?key=" + selection;
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
            setSelection(selected.trim());
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


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text.trim();
}
