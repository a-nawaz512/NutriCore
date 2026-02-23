import type { FC } from "react"
import Button from "../../../shared/components/ui/Button"
import Card from "../../../shared/components/ui/Card"
import { useNavigate } from "react-router-dom"
import Badge from "../../../shared/components/ui/Badge"



interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`, {
      state: { product },
    })
  }

  return (
    <Card className="flex flex-col p-0 overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge color="green" className="text-xs">{product.category}</Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div
          onClick={handleClick}
          className="flex flex-col flex-1 cursor-pointer"
        >
          <h3 className="text-base font-semibold mb-1 text-gray-800 group-hover:text-[#25492D] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
          <p className="text-[#25492D] font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
        </div>

        {/* Add to Cart Button */}
        <Button variant="primary" size="sm" className="w-full mt-auto">
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
