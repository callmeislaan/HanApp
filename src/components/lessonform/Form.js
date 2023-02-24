import { useState } from 'react';
import './Form.css'
import Tiny from '../tity/Tiny';

export default function Form(props) {

    return (
        <form ref={props.formRef} className="Form" onSubmit={(event) => props.handlerSubmit(event)}>
            <h2>{props.title}</h2>
            <input value={props.inputs.name} name="name" className="Input" placeholder="Name"/>
            <Tiny editorRef={props.editorRef} className="Textare" {...props}/>
            <div className='ButtonGroup'>
                <input className='Submit' type="submit" value="Submit" />
                <input className='Cancel' type="button" value="Cancel" onClick={(event) => props.handlerCancel(event)}/>
            </div>
        </form>
    );
}