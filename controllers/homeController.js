export const viewHome = (req, res) => {
    res.json({
      "product endpoints": {
        getAllProducts: "https://mis-7l7a.onrender.com/api/products",
        getProductById: "https://mis-7l7a.onrender.com/api/products/:id",
        createProduct: "https://mis-7l7a.onrender.com/api/products",
        updateProduct: "https://mis-7l7a.onrender.com/api/products/:id",
        deleteProduct: "https://mis-7l7a.onrender.com/api/products/:id",
      },
    });
}