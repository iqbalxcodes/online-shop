
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Silakan login terlebih dahulu.");
            return;
        }

        fetch("http://localhost:5000/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Gagal mengambil data profil."
                    );
                }

                return data;
            })
            .then((data) => setUser(data))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <main>
            <h1>Profil Pengguna</h1>

            {error && <p>{error}</p>}

            {!user && !error && <p>Memuat profil...</p>}

            {user && (
                <div>
                    <p>Nama: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </main>
    );
}
