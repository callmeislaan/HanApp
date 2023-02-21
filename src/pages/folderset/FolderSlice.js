import { createSlice } from "@reduxjs/toolkit";

export const FolderSlice = createSlice({
    name: "Folder",
    initialState: {
        currentFolder: null
    },
    reducers: {
        setCurrentFolder: (state, action) => {
            state.currentFolder = action.payload;
        } 
    }
})

export const {setCurrentFolder} = FolderSlice.actions
export default FolderSlice.reducer