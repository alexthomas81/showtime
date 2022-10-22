// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Column from "./column";

// CreateStudent Component
const Create = () => {
    const [formValues, setFormValues] =
        useState({ name: '', email: '', rollno: '' })
    // onSubmit handler
    const onSubmit = studentObject => {
        axios.post(
            'http://localhost:4000/students/create-student',
            studentObject)
            .then(res => {
                if (res.status === 200)
                    alert('Student successfully created')
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    }

    // Return student form
    return (
        <Column initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Create Student
        </Column>
    )
}

// Export CreateStudent Component
export default Create
