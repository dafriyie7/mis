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
\`\`\`json
{
  "name": "Laptop",
  "description": "A high-end gaming laptop",
  "category": "65fab12345def6789abcd001",
  "brand": "Dell",
  "images": ["https://example.com/laptop.jpg"],
  "location": "65fab56789cdef0123abc002",
  "priceData": {
    "amount": 5000,
    "currency": "GHC"
  }
}
\`\`\`

---

### Update a Product
- **Method:** PUT
- **URL:** \`/products/:id\`
- **Example:** \`/api/products/65fabc1234567890abcde123\`
- **Request Body (Partial Update Supported):**
\`\`\`json
{
  "name": "Updated Laptop",
  "priceData": {
    "amount": 5500,
    "currency": "GHC"
  }
}
\`\`\`

---

### Delete a Product
- **Method:** DELETE
- **URL:** \`/products/:id\`
- **Example:** \`/api/products/65fabc1234567890abcde123\`
 `;

  res.send(apiDocs);
};
