// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Column from "./column";

// EditStudent Component
const Edit = (props) => {
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        rollno: "",
    });

    //onSubmit handler
    const onSubmit = (studentObject) => {
        axios
            .put("http://localhost:4000/students/update-student/" + id, studentObject)
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully updated");
                    props.history.push("/student-list");
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    // Load data from server and reinitialize student form
    useEffect(() => {
        axios
            .get("http://localhost:4000/students/update-student/" + id)
            .then((res) => {
                const { name, email, rollno } = res.data;
                setFormValues({ name, email, rollno });
            })
            .catch((err) => console.log(err));
    }, []);

    // Return student form
    return (
        <Column
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Student
        </Column>
    );
};

// Export EditStudent Component
export default Edit;
