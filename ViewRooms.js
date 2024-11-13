
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./ViewRooms.css"; // Import your CSS file
import { FaDollarSign, FaSearch } from "react-icons/fa";

// Sample room data
const sampleRooms = [
    {
        id: 1,
        name: "Deluxe Room",
        price: 120,
        type: "Deluxe",
        image: "https://image-tc.galaxy.tf/wijpeg-afu0zj5rhmyyirzditj3g96mk/deluxe-room-king-1-2000px.jpg",
        description: "A spacious room with luxury amenities.",
    },
    {
        id: 2,
        name: "Standard Room",
        price: 80,
        type: "Standard",
        image: "https://images.trvl-media.com/lodging/4000000/3490000/3484400/3484306/38c83249.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        description: "Comfortable room with essential amenities.",
    },
    {
        id: 3,
        name: "Suite",
        price: 200,
        type: "Suite",
        image: "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/yangon/accommodation/hotel/suite/royalsuite/180712-49-2000-acc-yangon-hotel.jpg.thumb.768.768.jpg",
        description: "A luxurious suite with a stunning view.",
    },
    {
        id: 4,
        name: "Economy Room",
        price: 60,
        type: "Economy",
        image: "https://seabreezebeachresorts.co.in/wp-content/uploads/2022/04/BF-Standard-1.jpg",
        description: "A budget-friendly option for travelers.",
    },
];

function ViewRooms() {
    const navigate = useNavigate(); // Initialize navigate for routing
    const [rooms, setRooms] = useState(sampleRooms);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([0, 300]);

    const filteredRooms = rooms.filter((room) => {
        const matchesSearchTerm = room.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const isWithinPriceRange =
            room.price >= priceRange[0] && room.price <= priceRange[1];
        return matchesSearchTerm && isWithinPriceRange;
    });

   
    const handleBookNow = (room) => {
       
        navigate('/book-room', { state: { room } }); 
    };

    return (
        <div className="view-rooms">
            <h2>Available Rooms</h2>

            <div className="search-filter">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="price-range">
                    <label>Price Range:</label>
                    <input
                        type="number"
                        min="0"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        min="0"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        placeholder="Max"
                    />
                    <FaDollarSign className="price-icon" />
                </div>
            </div>

            <div className="rooms-list">
                {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                        <div className="room-card" key={room.id}>
                            <img src={room.image} alt={room.name} className="room-image" />
                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <p>{room.description}</p>
                                <p className="room-price">${room.price} per night</p>
                                <button className="btn" onClick={() => handleBookNow(room)}>Book Now</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rooms available matching your criteria.</p>
                )}
            </div>
        </div>
    );
}

export default ViewRooms;
