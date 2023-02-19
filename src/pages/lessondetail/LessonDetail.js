import Header from "../../components/header/Header"
import Content from "../../components/content/Content";
import './LessonDetail.css'

export default function LessonDetail(props) {
    let content = "In the code below the tooltip highlight the whole text relative to it. How can I highlight only word, In the code below the tooltip highlight the whole text relative to it. How can I highlight only word";
    return (
        <div className="LessonDetail">
            <Header header="Lesson1" />
            <Content content={content} />
        </div>
    );
}