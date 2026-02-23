import { useMemo } from "react"
import type { ProductFilters } from "../hooks/useProductFilters"
import type { Product } from "../types"

const productImages = [
  "https://images.pexels.com/photos/4057743/pexels-photo-4057743.jpeg",
  "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
  "https://images.pexels.com/photos/5938359/pexels-photo-5938359.jpeg",
  "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg",
]

const supplementNames = [
  "Vitamin C 1000mg",
  "Omega-3 Fish Oil",
  "Whey Protein Isolate",
  "Immunity Booster Complex",
  "Vitamin D3 + K2",
  "Magnesium Glycinate",
  "Zinc + Selenium",
  "Collagen Peptides",
  "Probiotics 50 Billion CFU",
  "B-Complex Vitamins",
  "Ashwagandha Extract",
  "Turmeric Curcumin",
  "CoQ10 200mg",
  "Iron + Folic Acid",
  "Calcium + Vitamin D",
  "Multivitamin Daily",
  "Biotin 10000mcg",
  "Spirulina Powder",
  "Elderberry Extract",
  "Melatonin 5mg",
  "L-Glutamine",
  "BCAA 2:1:1",
  "Creatine Monohydrate",
  "Pre-Workout Formula",
  "Vitamin E 400IU",
  "Alpha Lipoic Acid",
  "Fish Collagen",
  "Digestive Enzymes",
  "Liver Support Complex",
  "Joint Support Formula",
  "Eye Health Lutein",
  "Hair Skin Nails",
  "Stress Relief Blend",
  "Sleep Support Complex",
  "Energy Boost Formula",
  "Weight Management Blend",
]

const categories = ["Vitamins", "Protein", "Omega", "Immunity", "Minerals", "Probiotics"]
const descriptions = [
  "Premium quality supplement formulated for daily use to support your health and wellness goals.",
  "Scientifically backed formula with bioavailable nutrients for maximum absorption and effectiveness.",
  "Trusted by thousands of health-conscious individuals for consistent results and quality.",
  "GMP-certified supplement with no artificial additives, fillers, or preservatives.",
]

export const ALL_PRODUCTS: Product[] = Array.from({ length: 36 }).map((_, idx) => ({
  id: `prod-${idx + 1}`,
  name: supplementNames[idx] || `Supplement ${idx + 1}`,
  price: Math.round((Math.random() * 50 + 10) * 100) / 100,
  images: [productImages[idx % productImages.length]],
  description: descriptions[idx % descriptions.length],
  stock: Math.floor(Math.random() * 50) + 5,
  category: categories[idx % categories.length],
  supplementQuantityOptions: [15, 30, 60, 120],
  healthBenefits: ["Boost immunity", "Increase energy", "Support overall wellness"],
  ingredients: ["Active compound", "Microcrystalline cellulose", "Magnesium stearate"],
  usageInstructions: "Take 1-2 capsules daily with water, preferably with a meal.",
}))

export const useProducts = (filters: ProductFilters) => {
  return useMemo(() => {
    const { page, limit, search, category, minPrice, maxPrice } = filters

    let filtered = [...ALL_PRODUCTS]

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category)
    }

    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    )

    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedProducts = filtered.slice(start, end)

    return {
      data: {
        products: paginatedProducts,
        total,
        totalPages,
        currentPage: page,
      },
      isLoading: false,
    }
  }, [filters])
}
