import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Joinroom() {
    const [formData, setFormData] = useState({ RoomID: "" });
    const navigate = useNavigate()

    const onformChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const onformSubmit = (event) => {
        event.preventDefault();
        navigate(`/canvas/${formData.RoomID}`);
        console.log(formData);
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Join Room</h2>
                <form onSubmit={onformSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            RoomID
                        </label>
                        <input
                            id="RoomID"
                            type="text"
                            name="RoomID"
                            value={formData.RoomID}
                            onChange={onformChange}
                            placeholder="Enter RoomID..."
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div> */}
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Join room
                    </button>
                </form>
            </div>
        </div>
    );
}
