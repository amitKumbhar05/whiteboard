import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("Userinfo")) {
            navigate('/room')
        }
    }, [])


    const onformChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const onformSubmit = (event) => {
        event.preventDefault();
        // http://localhost:5000/api/login
        axios.post("https://whiteboard-backend-c4ys.onrender.com/api/login", formData)
            .then((res) => {
                Swal.fire({
                    title: 'Success !',
                    text: 'Logged in successfully',
                    icon: 'success'
                })
                localStorage.setItem("Userinfo", JSON.stringify(res.data.data));
                navigate('/room')
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
                <form onSubmit={onformSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={onformChange}
                            value={formData.email}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={onformChange}
                            value={formData.password}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
