import { configureStore } from "@reduxjs/toolkit";
import FolderSlice from "./pages/folderset/FolderSlice";

export default configureStore({
    reducer: {
        folder: FolderSlice
    },
})