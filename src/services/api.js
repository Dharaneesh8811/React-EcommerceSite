export async function getProducts() {
  try {
    const response = await fetch(
       "https://dummyjson.com/products?limit=200"
    );

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${id}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}