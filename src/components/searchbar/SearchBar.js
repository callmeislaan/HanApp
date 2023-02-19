import Search from "../search/Search"
import Button from "../button/Button"
import './SearchBar.css'

export default function SearchBar(props) {
    let button_title = props.button_title;
    return (
        <div className="SearchBar">
            <Search />
            <Button button_title={button_title} />
        </div>
    );
}