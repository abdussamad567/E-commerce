export const products = [
  // Men's Products
  {
    id: 1,
    name: "Premium Black Blazer",
    category: "men",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80",
    description: "Elegant black blazer perfect for any occasion",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Classic White Dress Shirt",
    category: "men",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=400&q=80",
    description: "Timeless white shirt for professional settings",
    rating: 4.9,
    reviews: 256
  },
  {
    id: 3,
    name: "Tailored Chino Pants",
    category: "men",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&q=80",
    description: "Comfortable and stylish chino trousers",
    rating: 4.7,
    reviews: 189
  },
  {
    id: 4,
    name: "Casual Denim Jacket",
    category: "men",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFja2V0fGVufDB8fDB8fHww",
    description: "Vintage-style denim jacket for casual wear",
    rating: 4.6,
    reviews: 145
  },
  {
    id: 5,
    name: "Oxford Leather Shoes",
    category: "men",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=400&q=80",
    description: "Classic leather oxfords for formal occasions",
    rating: 4.9,
    reviews: 178
  },
  {
    id: 6,
    name: "Crew Neck Sweater",
    category: "men",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80",
    description: "Cozy wool blend crew neck sweater",
    rating: 4.7,
    reviews: 201
  },
  {
    id: 7,
    name: "Slim Fit T-Shirt",
    category: "men",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=400&q=80",
    description: "Premium quality slim fit t-shirt",
    rating: 4.8,
    reviews: 412
  },
  {
    id: 8,
    name: "Wool Overcoat",
    category: "men",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80",
    description: "Luxurious wool overcoat for winter",
    rating: 4.9,
    reviews: 93
  },
  {
    id: 9,
    name: "Chelsea Boots",
    category: "men",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=400&q=80",
    description: "Sophisticated Chelsea boots",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 10,
    name: "Baseball Cap",
    category: "men",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=400&q=80",
    description: "Classic adjustable baseball cap",
    rating: 4.6,
    reviews: 234
  },

  // Women's Products
  {
    id: 11,
    name: "Silk Evening Gown",
    category: "women",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
    description: "Elegant silk evening gown",
    rating: 4.9,
    reviews: 89
  },
  {
    id: 12,
    name: "Fitted Blazer",
    category: "women",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&w=400&q=80",
    description: "Tailored women's blazer",
    rating: 4.8,
    reviews: 167
  },
  {
    id: 13,
    name: "High-Waist Jeans",
    category: "women",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80",
    description: "Flattering high-waist denim",
    rating: 4.7,
    reviews: 298
  },
  {
    id: 14,
    name: "Leather Handbag",
    category: "women",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
    description: "Premium leather handbag",
    rating: 4.9,
    reviews: 142
  },
  {
    id: 15,
    name: "White Sneakers",
    category: "women",
    price: 129.99,
    image: "https://unsplash.com/photos/SD9Jyl1xNQ4/download?force=true",
    description: "Versatile white leather sneakers",
    rating: 4.8,
    reviews: 387
  },

  // Kids Products
  {
    id: 21,
    name: "Children's Hoodie",
    category: "kids",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=400&q=80",
    description: "Comfortable kids hoodie",
    rating: 4.8,
    reviews: 289
  }
]

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category)
}

export const getProductById = (id) => {
  return products.find(product => product.id === id)
}

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase()

  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  )
}