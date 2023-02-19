import Header from "../header/Header";
import SearchBar from "../searchbar/SearchBar";
import './SetHeader.css'

export default function SetHeader(props) {
    return (
        <div className="SetHeader">
            <Header {...props} />
            <SearchBar {...props} />
        </div>
    );
}