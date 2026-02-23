import type { FC } from "react"
import ProductCard from "./ProductCard"

const productImages = [
  "https://images.pexels.com/photos/4057743/pexels-photo-4057743.jpeg",
  "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
  "https://images.pexels.com/photos/5938359/pexels-photo-5938359.jpeg",
  "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg",
]

export const dummyProducts: Product[] = [
  
  {
    id: "prod-1",
    name: "Vitamin C 1000mg",
    price: 19.99,
    images: [productImages[0]],
    description: "Premium Vitamin C for daily immune support and antioxidant protection.",
    stock: 50,
    category: "Vitamins",
    supplementQuantityOptions: [15, 30, 60, 120],
    healthBenefits: ["Boost immunity", "Antioxidant protection", "Collagen synthesis"],
    ingredients: ["Ascorbic Acid 1000mg", "Rose Hip Extract", "Bioflavonoids"],
    usageInstructions: "Take 1 capsule daily with water, preferably with a meal.",
  },
  {
    id: "prod-2",
    name: "Omega-3 Fish Oil",
    price: 29.99,
    images: [productImages[1]],
    description: "High-potency Omega-3 fatty acids for heart and brain health.",
    stock: 35,
    category: "Omega",
    supplementQuantityOptions: [30, 60, 120],
    healthBenefits: ["Heart health", "Brain function", "Joint support"],
    ingredients: ["Fish Oil 1000mg", "EPA 300mg", "DHA 200mg"],
    usageInstructions: "Take 2 softgels daily with meals.",
  },
  {
    id: "prod-3",
    name: "Whey Protein Isolate",
    price: 54.99,
    images: [productImages[2]],
    description: "Ultra-pure whey protein isolate for muscle recovery and growth.",
    stock: 20,
    category: "Protein",
    supplementQuantityOptions: [30, 60],
    healthBenefits: ["Muscle recovery", "Lean muscle growth", "High protein content"],
    ingredients: ["Whey Protein Isolate 25g", "BCAAs", "Glutamine"],
    usageInstructions: "Mix 1 scoop with 250ml water or milk post-workout.",
  },
  {
    id: "prod-4",
    name: "Immunity Booster Complex",
    price: 24.99,
    images: [productImages[3]],
    description: "Comprehensive immunity formula with Zinc, Elderberry, and Vitamin C.",
    stock: 45,
    category: "Immunity",
    supplementQuantityOptions: [15, 30, 60, 120],
    healthBenefits: ["Immune defense", "Antiviral support", "Reduce illness duration"],
    ingredients: ["Zinc 15mg", "Elderberry Extract", "Vitamin C 500mg", "Echinacea"],
    usageInstructions: "Take 2 capsules daily with water.",
  },
  {
    id: "prod-5",
    name: "Vitamin D3 + K2",
    price: 22.99,
    images: [productImages[0]],
    description: "Synergistic D3 and K2 combination for bone density and calcium absorption.",
    stock: 60,
    category: "Vitamins",
    supplementQuantityOptions: [30, 60, 120],
    healthBenefits: ["Bone health", "Calcium absorption", "Immune support"],
    ingredients: ["Vitamin D3 5000IU", "Vitamin K2 100mcg", "Olive Oil"],
    usageInstructions: "Take 1 softgel daily with a fatty meal.",
  },
  {
    id: "prod-6",
    name: "Magnesium Glycinate",
    price: 18.99,
    images: [productImages[1]],
    description: "Highly bioavailable magnesium for sleep, stress relief, and muscle function.",
    stock: 40,
    category: "Minerals",
    supplementQuantityOptions: [30, 60, 120],
    healthBenefits: ["Better sleep", "Stress reduction", "Muscle relaxation"],
    ingredients: ["Magnesium Glycinate 400mg"],
    usageInstructions: "Take 2 capsules before bedtime.",
  },
  {
    id: "prod-7",
    name: "Probiotics 50 Billion CFU",
    price: 34.99,
    images: [productImages[2]],
    description: "Advanced probiotic formula with 12 strains for optimal gut health.",
    stock: 25,
    category: "Probiotics",
    supplementQuantityOptions: [30, 60],
    healthBenefits: ["Gut health", "Digestive support", "Immune balance"],
    ingredients: ["Lactobacillus acidophilus", "Bifidobacterium", "Prebiotic FOS"],
    usageInstructions: "Take 1 capsule daily on an empty stomach.",
  },
  {
    id: "prod-8",
    name: "B-Complex Vitamins",
    price: 16.99,
    images: [productImages[3]],
    description: "Complete B-vitamin complex for energy metabolism and nervous system support.",
    stock: 55,
    category: "Vitamins",
    supplementQuantityOptions: [30, 60, 120],
    healthBenefits: ["Energy production", "Nervous system support", "Red blood cell formation"],
    ingredients: ["B1, B2, B3, B5, B6, B7, B9, B12"],
    usageInstructions: "Take 1 tablet daily with breakfast.",
  },
  {
    id: "prod-9",
    name: "Ashwagandha Extract",
    price: 27.99,
    images: [productImages[0]],
    description: "KSM-66 Ashwagandha for stress relief, energy, and hormonal balance.",
    stock: 30,
    category: "Immunity",
    supplementQuantityOptions: [30, 60, 120],
    healthBenefits: ["Stress relief", "Cortisol reduction", "Energy & stamina"],
    ingredients: ["KSM-66 Ashwagandha 600mg", "Black Pepper Extract"],
    usageInstructions: "Take 1 capsule twice daily with meals.",
  },
]

interface ProductsGridProps {
  products?: Product[]
}

const ProductsGrid: FC<ProductsGridProps> = ({ products = dummyProducts }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductsGrid
