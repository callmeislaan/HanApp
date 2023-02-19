import './Header.css'

export default function Header(props) {
    let header = props.header;

    return (
        <>
            <h1 className="HeaderTitle">{header}</h1>
        </>
    );
}