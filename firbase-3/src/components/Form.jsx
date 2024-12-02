import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { database } from "../FireBase/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [formData, setFormData] = useState({
        task: "",
        priority: "",
        startDate: "",
        endDate: "",
        notice: "",
    });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEditData();
        }
    }, [id]);

    const getEditData = async () => {
        try {
            const docRef = doc(database, "toDo", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFormData(docSnap.data());
            } else {
                toast.error("No such document!");
                console.error("No such document!");
            }
        } catch (error) {
            toast.error("Error fetching document: " + error.message);
            console.error("Error fetching document:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateData();
        } else {
            await addData();
        }
    };

    const addData = async () => {
        try {
            const docRef = await addDoc(collection(database, "toDo"), formData);
            toast.success("Task added successfully!");
            console.log("Document added with ID:", docRef.id);
        } catch (error) {
            toast.error("Error adding task: " + error.message);
            console.error("Error adding document:", error.message);
        }
    };

    const updateData = async () => {
        try {
            const docRef = doc(database, "toDo", id);
            await updateDoc(docRef, formData);
            toast.success("Task updated successfully!");
            console.log("Document updated successfully!");
        } catch (error) {
            toast.error("Error updating task: " + error.message);
            console.error("Error updating document:", error.message);
        }
    };

    return (
        <div className="container mt-4 bg-dark text-light p-5 rounded">
            <h2 className="mb-4 text-center">{id ? "Edit" : "User"} Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="task" className="form-label">
                        Task Name
                    </label>
                    <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="task"
                        name="task"
                        value={formData.task}
                        onChange={handleChange}
                        placeholder="Enter your Task"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">
                        Priority
                    </label>
                    <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        placeholder="High || Medium || Low"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                        Start Date
                    </label>
                    <input
                        type="date"
                        className="form-control bg-secondary text-light"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                        End Date
                    </label>
                    <input
                        type="date"
                        className="form-control bg-secondary text-light"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="notice" className="form-label">
                        Notice
                    </label>
                    <textarea
                        rows={3}
                        className="form-control bg-secondary text-light"
                        id="notice"
                        name="notice"
                        value={formData.notice}
                        onChange={handleChange}
                        placeholder="Enter your Message"
                    ></textarea>
                </div>
                <div className="d-flex justify-content-evenly">
                    <button type="submit" className="btn btn-primary">
                        {id ? "Edit" : "Submit"}
                    </button>
                    <Link to="/show">
                        <button type="button" className="btn btn-primary">
                            Show
                        </button>
                    </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Form;
