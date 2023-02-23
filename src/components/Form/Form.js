import './Form.css'

export default function Form(props) {

    return (
        <div className='FolderForm'>
            <form ref={props.formRef} className="Form" onSubmit={(event) => props.handlerSubmit(event)}>
                <h2>{props.title}</h2>
                <input name="name" className="Input" placeholder="Name" />
                <div className='ButtonGroup'>
                    <input className='Submit' type="submit" value="Submit" />
                    <input className='Cancel' type="button" value="Cancel" onClick={(event) => props.handlerCancel(event)} />
                </div>
            </form>
        </div>
    );
}