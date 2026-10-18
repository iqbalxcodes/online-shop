export async function getProducts() {
    const response = await fetch("http://localhost:5000/api/products");

    if (!response.ok) {
        throw new Error("Gagal mengambil produk");
    }
    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }

        throw new Error("Gagal mengambil produk");
    }
    return response.json();
}