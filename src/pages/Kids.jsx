import CategoryPage from '../components/CategoryPage'
import { getProductsByCategory } from '../data/products'

const Kids = () => {
  const kidsProducts = getProductsByCategory('kids')

  return (
    <CategoryPage
      category="kids"
      categoryName="Kids"
      products={kidsProducts}
    />
  )
}

export default Kids
