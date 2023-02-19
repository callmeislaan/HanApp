import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './Search.css'


export default function Search() {
    return (
        <div className='Search'>
            <form>
                <input placeholder="Search" /><button className='Icon'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
        </div>
    );
}