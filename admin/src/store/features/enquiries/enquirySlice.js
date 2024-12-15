import { createSlice } from "@reduxjs/toolkit";

const enquirySlice = createSlice({
    name: "enquiries",
    initialState: {
        data: [], // List of all enquiries
        selectedEnquiry: null, // Details of a single enquiry
    },
    reducers: {
        // Set all enquiries
        setEnquiries: (state, action) => {
            state.data = action.payload;
        },
        // Set a single enquiry
        setSingleEnquiry: (state, action) => {
            state.selectedEnquiry = action.payload;
        },
        // Delete an enquiry
        deleteEnquiry: (state, action) => {
            state.data = state.data.filter(
                (enquiry) => enquiry._id !== action.payload
            );
        },
        // Update status of an enquiry
        updateEnquiryStatus: (state, action) => {
            const { id, status } = action.payload;
            const enquiry = state.data.find((enquiry) => enquiry._id === id);
            if (enquiry) {
                enquiry.status = status;
            }
        },
    },
});

export const {
    setEnquiries,
    setSingleEnquiry,
    deleteEnquiry,
    updateEnquiryStatus,
} = enquirySlice.actions;

export default enquirySlice.reducer;
