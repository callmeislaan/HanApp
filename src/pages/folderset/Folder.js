import SetHeader from "../../components/setheader/SetHeader";
import ItemGroup from "../../components/itemgroup/ItemGroup";

export default function FolderSet(props) {
    let header = "Han's bookmark";
    let button_title = "New folder";

    const data = props.data;

    return (
        <>
            <SetHeader header={header} button_title={button_title} />
            <ItemGroup item_list={data} {...props}/>
        </>
    );
}