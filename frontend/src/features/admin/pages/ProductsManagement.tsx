// frontend/src/modules/product/pages/ProductsManagement.tsx
import { useState, type FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Plus, Search, Filter, Trash2, Edit } from "lucide-react"

// Shared UI Components
import Table from "../../../shared/components/ui/Table"
import Card from "../../../shared/components/ui/Card"
import Pagination from "../../../shared/components/ui/Pagination"
import Button from "../../../shared/components/ui/Button"
import Badge from "../../../shared/components/ui/Badge"

// Custom Hooks for API
import { useGetProducts } from "../hooks/useGetProducts"
import { useDeleteProduct } from "../hooks/useDeleteProduct"

const ProductsManagement: FC = () => {
  const navigate = useNavigate()

  // State for server-side queries
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [itemsPerPage] = useState(5)

  // 1. Fetch data from backend
  const { data, isLoading, isError } = useGetProducts({
    page: currentPage,
    limit: itemsPerPage,
    search: search,
  })

  // 2. Initialize Delete Mutation
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()

  // Extract products and pagination metadata safely from the backend response
  const productsList = data?.data || []
  const totalPages = data?.meta?.totalPages || 1

  // Delete Handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      deleteProduct(id)
    }
  }

  // Table Columns mapped to MongoDB schema
  const columns = [
    {
      header: "Product Name",
      accessor: "name",
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.images && row.images.length > 0 ? row.images[0] : "https://via.placeholder.com/150"} 
            alt={val} 
            className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200" 
          />
          <span className="font-medium text-gray-900">{val}</span>
        </div>
      )
    },
    {
      header: "Category",
      accessor: "category",
      render: (cat: string) => <Badge color="blue">{cat}</Badge>,
    },
    {
      header: "Stock",
      accessor: "stock",
      sortable: true,
      render: (stock: number) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock < 20 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {stock} units
        </span>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      sortable: true,
      render: (price: number) => (
        <span className="font-semibold text-gray-900">${Number(price).toFixed(2)}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#222222]">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product inventory</p>
        </div>
        <Link to="/admin/dashboard/products/add">
          {/* Maintained your requested color scheme here */}
          <Button 
            variant="primary" 
            size="sm" 
            className="flex items-center gap-2 text-white border-none transition-transform hover:scale-105 shadow-md"
            style={{ background: 'linear-gradient(to right, #8000FF, #0099FF)' }}
          >
            <Plus size={16} /> Add Product
          </Button>
        </Link>
      </div>

      <Card className="p-0 border border-gray-200">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { 
                setSearch(e.target.value)
                setCurrentPage(1) // Reset to page 1 on new search
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8000FF]/50 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Status Indicators */}
        {isLoading && <div className="p-8 text-center text-gray-500">Loading products...</div>}
        {isError && <div className="p-8 text-center text-red-500">Failed to load inventory.</div>}

        {/* Table & Content (Only shows if not loading and no errors) */}
        {!isLoading && !isError && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table
                columns={columns}
                data={productsList}
                // Redirects to an edit page using the MongoDB _id
                onEdit={(row) => navigate(`/admin/dashboard/products/${row._id}`)}
                onDelete={(row) => handleDelete(row._id)}
              />
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {productsList.map((product: any) => (
                <div key={product._id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-gray-100 border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock < 20
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {product.stock} units
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/dashboard/products/${product._id}`)}
                      className="flex-1 text-xs py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={isDeleting}
                      className="flex-1 text-xs py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Empty State */}
              {productsList.length === 0 && (
                  <div className="p-6 text-center text-gray-500 text-sm">No products found.</div>
              )}
            </div>

            {/* Pagination */}
            {productsList.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50/50">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}

export default ProductsManagement