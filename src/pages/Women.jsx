import CategoryPage from '../components/CategoryPage'
import { getProductsByCategory } from '../data/products'

const Women = () => {
  const womenProducts = getProductsByCategory('women')

  return (
    <CategoryPage
      category="women"
      categoryName="Women's"
      products={womenProducts}
    />
  )
}

export default Women
