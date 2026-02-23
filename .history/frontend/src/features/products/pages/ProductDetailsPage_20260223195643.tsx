import { useEffect, useState, type FC } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Button from "../../../shared/components/ui/Button"
import ProductSkeleton from "../components/ProductSkeleton"
import { dummyProducts } from "../components/ProductGrid"
import ProductImg from "../../../assets/Home/Featured01.jpg"
import Badge from "../../../shared/components/ui/Badge"
import { ShieldCheck, Package, Info } from "lucide-react"
import type { Product } from "../types"

const ProductDetailsPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>()

  const stateProduct = location.state as Product | undefined
  const [product, setProduct] = useState<Product | null>(stateProduct || null)
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!product && productId) {
      const found = dummyProducts.find((p) => p.id === productId)
      if (found) setProduct(found)
      else navigate("/products")
    }
    setLoading(false)
  }, [product, productId, navigate])

  useEffect(() => {
    if (product?.supplementQuantityOptions?.length) {
      setSelectedQuantity(product.supplementQuantityOptions[0])
    }
  }, [product])

  if (loading || !product) return <ProductSkeleton />

  const images = product.images || []
  const healthBenefits = product?.healthBenefits || []
  const ingredients = product.ingredients || []
  const supplementOptions = product.supplementQuantityOptions || []

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <img
            src={images[0] || ProductImg}
            alt={product.name || "Product"}
            className="rounded-xl w-full h-96 object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-5">
          <div>
            <Badge color="green" className="mb-3">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-gray-900">{product.name || "Unnamed Product"}</h1>
          </div>

          <p className="text-3xl font-bold text-[#25492D]">
            ${product.price !== undefined ? product.price.toFixed(2) : "0.00"}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description || "No description available."}</p>

          {/* Capsule Selector */}
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700 text-sm">Capsule Count:</label>
            <select
              value={selectedQuantity ?? undefined}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className="
                bg-white
                border border-gray-200
                rounded-xl
                px-4 py-2
                text-sm
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-[#25492D]/30
                focus:border-[#25492D]
                transition
                hover:border-[#25492D]/40
                cursor-pointer
              "
            >
              {supplementOptions.map((q) => (
                <option key={q} value={q}>
                  {q} capsules
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">In Stock:</span>{" "}
            <span className={product.stock > 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
              {product.stock > 0 ? `${product.stock} units available` : "Out of stock"}
            </span>
          </p>

          {/* Health Benefits */}
          {healthBenefits.length > 0 && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-[#25492D]" />
                <h3 className="font-semibold text-gray-800 text-sm">Health Benefits</h3>
              </div>
              <ul className="space-y-1">
                {healthBenefits.map((b, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25492D] flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients & Usage */}
          <div className="space-y-3 text-sm text-gray-600">
            {ingredients.length > 0 && (
              <div className="flex items-start gap-2">
                <Package size={16} className="text-[#25492D] mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="text-gray-800">Ingredients: </strong>
                  {ingredients.join(", ")}
                </p>
              </div>
            )}
            {product.usageInstructions && (
              <div className="flex items-start gap-2">
                <Info size={16} className="text-[#25492D] mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="text-gray-800">Usage: </strong>
                  {product.usageInstructions}
                </p>
              </div>
            )}
          </div>

          <Button variant="primary" size="lg" className="mt-2 w-full md:w-auto">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
