import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CardHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    const fetchHistory = async () => {
        try {
            const endpoint = isAdmin
                ? "/admin/history"
                : "/cards/history";

            const response = await api.get(endpoint);

            setHistory(response.data.history);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to fetch history"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div style={{ padding: "30px" }}>

            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div>
                    <h1>Card History</h1>
                    <p>
                        {isAdmin
                            ? "All users activity"
                            : "Your card activity"}
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate(isAdmin ? "/admin" : "/dashboard")
                    }
                >
                    Back to Dashboard
                </button>
            </header>

            <hr style={{ margin: "25px 0" }} />

            <h2>Total Activities: {history.length}</h2>

            {loading ? (
                <p>Loading history...</p>
            ) : history.length === 0 ? (
                <p>No history available.</p>
            ) : (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "20px"
                }}>

                    {history.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                background: "white",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "1px solid #ddd"
                            }}
                        >
                            <h3>{item.action}</h3>

                            <p>
                                Card: {item.snapshot?.name || "Unknown"}
                            </p>

                            <p>
                                Email: {item.snapshot?.email || "Unknown"}
                            </p>

                            {isAdmin && (
                                <p>
                                    Performed By:{" "}
                                    {item.performedBy?.name || "Unknown"}
                                </p>
                            )}

                            <p>
                                Date:{" "}
                                {new Date(item.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default CardHistory;