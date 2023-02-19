import Item from "../Item/Item";
import './ItemGroup.css'

export default function ItemGroup(props) {

    let item_list = props.item_list;

    let item_group = [];

    item_list.forEach(item => {
        item_group.push(<Item key={item.id} item={item} props={...props}/>);
    });

    return (
        <ul>
            {item_group}
        </ul>
    );
}