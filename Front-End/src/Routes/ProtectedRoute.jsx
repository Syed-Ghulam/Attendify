import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../config/api";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/users/check-auth`,
                    {
                        credentials: "include"
                    }
                );

                setAuthenticated(response.ok);

            } catch {

                setAuthenticated(false);

            } finally {

                setLoading(false);

            }

        };

        checkAuth();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;