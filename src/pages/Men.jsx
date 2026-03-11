import CategoryPage from '../components/CategoryPage'
import { getProductsByCategory } from '../data/products'

const Men = () => {
  const menProducts = getProductsByCategory('men')

  return (
    <CategoryPage
      category="men"
      categoryName="Men's"
      products={menProducts}
    />
  )
}

export default Men
