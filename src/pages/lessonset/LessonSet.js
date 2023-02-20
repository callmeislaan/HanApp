import SetHeader from "../../components/setheader/SetHeader";
import ItemGroup from "../../components/itemgroup/ItemGroup";

export default function LessonSet(props) {
    let header = props.header;
    let button_title = "New set";

    const data = props.data;

    return (
        <>
            <SetHeader header={header} button_title={button_title} {...props}/>
            <ItemGroup item_list={data} {...props} />
        </>
    );
}