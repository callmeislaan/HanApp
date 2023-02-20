import './Button.css'

export default function Button(props) {
    let button_title = props.button_title;
    return (
        <button className='Button'>{button_title}</button>
    );

}