export const viewHome = (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Market Intelligence API Docs</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px auto; padding: 20px; max-width: 800px; }
      h1, h2, h3 { color: #333; }
      pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
      code { font-family: monospace; color: #d63384; }
      hr { border: 1px solid #ddd; margin: 20px 0; }
      ul { padding-left: 20px; }
      p { margin: 5px 0; }
    </style>
  </head>
  <body>
    <h1>Market Intelligence System API</h1>
    <h2>Base URL</h2>
    <code>https://mis-7l7a.onrender.com/api</code>

    <hr>

    <h2>Products Endpoints</h2>

    <h3>Get All Products</h3>
    <p><strong>Method:</strong> GET</p>
    <p><strong>URL:</strong> <code>/api/products</code></p>
    <p><strong>Query Parameters:</strong></p>
    <ul>
      <li><code>category</code>: Filter by category</li>
      <li><code>location</code>: Filter by location</li>
      <li><code>keyword</code>: Search for products by name</li>
    </ul>
    <pre><code>GET /api/products?category=electronics&location=Accra</code></pre>

    <h3>Get Product by ID</h3>
    <p><strong>Method:</strong> GET</p>
    <p><strong>URL:</strong> <code>/api/products/:id</code></p>
    <p><strong>Example:</strong> <code>/api/products/65fabc1234567890abcde123</code></p>

    <h3>Create a New Product</h3>
    <p><strong>Method:</strong> POST</p>
    <p><strong>URL:</strong> <code>/api/products</code></p>
    <p><strong>Request Body (JSON):</strong></p>
    <pre><code>{
      "name": "Sample Product",
      "description": "A sample description",
      "category": "65fab...",
      "brand": "Brand Name",
      "images": ["image1.jpg", "image2.jpg"],
      "location": "65fab...",
      "priceData": {
        "amount": 100,
        "currency": "GHC"
      }
    }</code></pre>

    <h3>Update a Product</h3>
    <p><strong>Method:</strong> PUT</p>
    <p><strong>URL:</strong> <code>/api/products/:id</code></p>
    <p><strong>Request Body (Partial Update Supported):</strong></p>
    <pre><code>{
      "name": "Updated Product Name",
      "priceData": {
        "amount": 120
      }
    }</code></pre>

    <h3>Delete a Product</h3>
    <p><strong>Method:</strong> DELETE</p>
    <p><strong>URL:</strong> <code>/api/products/:id</code></p>
    <p><strong>Example:</strong> <code>/api/products/65fabc1234567890abcde123</code></p>
  </body>
  </html>
  `);
};