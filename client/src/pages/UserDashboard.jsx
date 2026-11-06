import { useEffect, useState } from "react";
import api from "../api/axios";

function UserDashboard() {
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    // GET CARDS
    // const fetchCards = async () => {
    //     try {
    //         const response = await api.get("/cards/my");
    //         setCards(response.data.cards);
    //     } catch (error) {
    //         console.log(error.response?.data?.message);
    //     }
    // };

    const fetchCards = async () => {
    try {
        const response = await api.get("/cards/my");

        console.log("FULL RESPONSE:", response.data);

        setCards(response.data.cards);

    } catch (error) {
        console.log(error.response?.data?.message);
    }
};

    useEffect(() => {
        fetchCards();
    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // CREATE / UPDATE CARD
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                await api.patch(`/cards/${editingId}`, formData);
                alert("Card updated successfully");
            } else {
                await api.post("/cards", formData);
                alert("Card created successfully");
            }

            setFormData({
                name: "",
                email: "",
                image: ""
            });

            setEditingId(null);
            fetchCards();

        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // EDIT CARD
    const handleEdit = (card) => {
        setFormData({
            name: card.name,
            email: card.email,
            image: card.image || ""
        });

        setEditingId(card._id);
    };

    // DELETE CARD
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this card?");

        if (!confirmDelete) return;

        try {
            await api.delete(`/cards/${id}`);
            alert("Card deleted successfully");
            fetchCards();
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div style={{ padding: "30px" }}>

            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div>
                    <h1>Welcome, {user?.name}</h1>
                    <p>User Dashboard</p>
                </div>

                <div>
                    <button onClick={() => window.location.href = "/history"}>
                        History
                    </button>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <hr style={{ margin: "25px 0" }} />

            {/* CARD FORM */}

            <h2>{editingId ? "Edit Card" : "Create New Card"}</h2>

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "400px",
                marginTop: "20px"
            }}>

                <input
                    type="text"
                    name="name"
                    placeholder="Card Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Card Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading
                        ? "Please wait..."
                        : editingId
                        ? "Update Card"
                        : "Create Card"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setFormData({
                                name: "",
                                email: "",
                                image: ""
                            });
                        }}
                    >
                        Cancel Edit
                    </button>
                )}

            </form>

            <hr style={{ margin: "30px 0" }} />

            {/* CARD LIST */}

            <h2>My Cards ({cards.length})</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px"
            }}>

                {cards.map((card) => (
                    <div
                        key={card._id}
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "10px"
                        }}
                    >
                        {card.image && (
                            <img
                                src={card.image}
                                alt={card.name}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover"
                                }}
                            />
                        )}

                        <h3>{card.name}</h3>
                        <p>{card.email}</p>

                        <button onClick={() => handleEdit(card)}>
                            Edit
                        </button>

                        <button onClick={() => handleDelete(card._id)}>
                            Delete
                        </button>
                    </div>
                ))}

                {cards.length === 0 && (
                    <p>No cards found. Create your first card!</p>
                )}

            </div>

        </div>
    );
}

export default UserDashboard;