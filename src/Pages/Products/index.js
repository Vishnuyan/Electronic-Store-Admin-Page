import React, { useState } from 'react';
import './index.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Phone', 
      category: 'Electronics', 
      price: 999, 
      stock: 20, 
      image: 'https://th.bing.com/th/id/OIP.dVs8z0kGsB_seIbu07HJsAHaHa?rs=1&pid=ImgDetMain',
      description: 'A high-quality smartphone with a powerful processor.'
    },
    { 
      id: 2, 
      name: 'Laptop', 
      category: 'Electronics', 
      price: 1500, 
      stock: 15, 
      image: 'https://i1.wp.com/laptopmedia.com/wp-content/uploads/2017/06/refurbished-macbook-pro-1.jpg?fit=2160%2C1601',
      description: 'A lightweight laptop with excellent performance.'
    },
    { 
      id: 3, 
      name: 'Table', 
      category: 'Furniture', 
      price: 200, 
      stock: 30, 
      image: 'https://th.bing.com/th/id/OIP.v4nyyQjPJkdqC4m3WiHLLAHaHa?rs=1&pid=ImgDetMain',
      description: 'A sturdy wooden table perfect for dining.'
    },
  ]);  

  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', image: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (isEditing) {
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? { ...currentProduct, ...newProduct } : product
        )
      );
      setIsEditing(false);
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setNewProduct({ name: '', category: '', price: '', stock: '', image: '', description: '' });
  };

  const editProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setNewProduct({ 
      name: product.name, 
      category: product.category, 
      price: product.price, 
      stock: product.stock, 
      image: product.image,
      description: product.description
    });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-container">
      <h1 className='product_heading'>Product Management</h1>
      
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={addProduct}>{isEditing ? 'Update Product' : 'Add Product'}</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                <td className="actions">
                  <button onClick={() => editProduct(product)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
