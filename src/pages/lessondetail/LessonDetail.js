import Header from "../../components/header/Header"
import Content from "../../components/content/Content";
import './LessonDetail.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

export default function LessonDetail() {

    const [data, setData] = useState(null);

    let params = useParams();

    let { folderId, lessonId } = params;

    useEffect(() => {
        axios.get("http://localhost:8080/api/lessons/" + lessonId)
            .then((res) => {
                let data = res.data;
                setData(data);
            })
    }, []);

    return (
        <div className="LessonDetail">
            {data ?
                <>
                    <Header header={data.name} />
                    <Content content={data.content} keyValues={data.keyValues} lessonId={data.id} />
                </> 
                : <Loading />}
        </div>
    );
}