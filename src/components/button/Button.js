import './Button.css'

export default function Button(props) {
    let button_title = props.button_title;
    return (
        <button className='Button' onClick={props.clicked}>{button_title}</button>
    );

}