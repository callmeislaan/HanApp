import './Item.css'

export default function Item(props) {
    let item = props.item;
    let item_name = item.name;
    let item_description = item.description;
    let item_background_color = item.backgroundColor;
    let item_id = item.id;
    return (
        <>
            <li className="Item" color={item_background_color}>
                <button className="ItemName" onClick={() => props.clicked(item_id)}>{item_name}</button>
            </li>
        </>
    );
}