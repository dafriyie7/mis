export const viewHome = (req, res) => {
  const apiDocs = `
# Market Intelligence System API

## Base URL
\`https://mis-7l7a.onrender.com/api\`

## Products Endpoints

### Get All Products
- **Method:** GET
- **URL:** \`/products\`
- **Query Parameters:**
  - \`category\`: Filter by category
  - \`location\`: Filter by location
  - \`keyword\`: Search for products by name

**Example Request:**
\`\`\`
GET /api/products?category=electronics&location=Accra
\`\`\`

---

### Get Product by ID
- **Method:** GET
- **URL:** \`/products/:id\`
- **Example:** \`/api/products/65fabc1234567890abcde123\`

---

### Create a New Product
- **Method:** POST
- **URL:** \`/products\`
- **Request Body (JSON):**
}
\`\`\`

---

### Update a Product
- **Method:** PUT
- **URL:** \`/products/:id\`
- **Example:** \`/api/products/65fabc1234567890abcde123\`
- **Request Body (Partial Update Supported):**
}
\`\`\`

---

### Delete a Product
- **Method:** DELETE
- **URL:** \`/products/:id\`
- **Example:** \`/api/products/65fabc1234567890abcde123\`

---`;

  res.send(apiDocs);
};
