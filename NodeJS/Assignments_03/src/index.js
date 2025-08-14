const express = require('express')

const app = express()

app.use(express.json())

const allProducts = [
    {
        "id": 1,
        "title": "Product 1",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    // ... other products
]

app.get('/', (req, res) => {
    res.send('Hello World !')
})

// Get all products
app.get('/products', (req, res) => {
    res.send(allProducts)
})

// Get product by id
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id)
    const product = allProducts.find(p => p.id === productId)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
})

// Add a new product
app.post('/addProduct', (req, res) => {
    const product = req.body
    product.id = allProducts.length + 1 // Simulate ID auto increment
    allProducts.push(product)
    res.send({
        message: 'Product Added successfully',
        addedProduct: product
    })
})

// Update an existing product
app.put('/updateProduct/:id', (req, res) => {
    const productId = parseInt(req.params.id)
    const updatedProduct = req.body

    const index = allProducts.findIndex(p => p.id === productId)
    if (index !== -1) {
        // Replace old product with updated data
        allProducts[index] = { id: productId, ...updatedProduct }
        res.send({
            message: 'Product updated successfully',
            updatedProduct: allProducts[index]
        })
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
})

// Delete a product
app.delete('/deleteProduct/:id', (req, res) => {
    const productId = parseInt(req.params.id)
    const index = allProducts.findIndex(p => p.id === productId)

    if (index !== -1) {
        // Remove the product from the array
        const deletedProduct = allProducts.splice(index, 1)
        res.send({
            message: 'Product deleted successfully',
            deletedProduct: deletedProduct[0]
        })
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

module.exports = app

