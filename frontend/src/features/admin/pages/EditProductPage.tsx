// frontend/src/modules/product/pages/EditProductPage.tsx
import { useState, useEffect, type FC } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Upload, Plus, X, List, DollarSign, Package } from "lucide-react"
import toast from "react-hot-toast"

// Shared UI Components
import Button from "../../../shared/components/ui/Button"
import Card from "../../../shared/components/ui/Card"
import Input from "../../../shared/components/ui/Input"
import Textarea from "../../../shared/components/ui/Textarea"

// Modular Hooks
import { useGetSingleProduct } from "../hooks/useGetSingleProduct"
import { useUpdateProduct } from "../hooks/useUpdateProduct"

const EditProductPage: FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>() // Grab the ID from the URL (/edit/:id)

    // 1. Fetch the existing product data
    const { data: productResponse, isLoading: isFetching } = useGetSingleProduct(id!)
    
    // 2. Setup the update mutation
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Vitamins",
        price: "",
        stock: "",
        images: [] as File[],          // New image files to upload
        imagePreviews: [] as string[], // Existing Cloudinary URLs + New Previews
        supplementQuantityOptions: [] as number[],
        healthBenefits: [] as string[],
        ingredients: [] as string[],
        usageInstructions: ""
    })

    const [newBenefit, setNewBenefit] = useState("")
    const [newIngredient, setNewIngredient] = useState("")

    // 3. Populate form when data arrives from the backend
    useEffect(() => {
        if (productResponse?.data) {
            const p = productResponse.data;
            setFormData({
                name: p.name,
                description: p.description,
                category: p.category,
                price: p.price.toString(),
                stock: p.stock.toString(),
                images: [], 
                imagePreviews: p.images || [], // Load existing Cloudinary images
                supplementQuantityOptions: p.supplementQuantityOptions || [],
                healthBenefits: p.healthBenefits || [],
                ingredients: p.ingredients || [],
                usageInstructions: p.usageInstructions || ""
            })
        }
    }, [productResponse])

    // Handlers
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return
        const previews = files.map((file) => URL.createObjectURL(file))
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files],
            imagePreviews: [...prev.imagePreviews, ...previews]
        }))
    }

    const removeImagePreview = (index: number) => {
        setFormData(prev => ({
            ...prev,
            // For a robust app, you'd also track which existing images to delete from Cloudinary here.
            // For now, we just remove them from the UI preview.
            imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
        }))
    }

    const handleBenefitAdd = () => {
        if (newBenefit.trim()) {
            setFormData(prev => ({ ...prev, healthBenefits: [...prev.healthBenefits, newBenefit.trim()] }))
            setNewBenefit("")
        }
    }

    const handleIngredientAdd = () => {
        if (newIngredient.trim()) {
            setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, newIngredient.trim()] }))
            setNewIngredient("")
        }
    }

    const handleRemoveItem = (field: "healthBenefits" | "ingredients", index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const toggleQuantity = (qty: number) => {
        setFormData(prev => {
            const options = prev.supplementQuantityOptions.includes(qty)
                ? prev.supplementQuantityOptions.filter(q => q !== qty)
                : [...prev.supplementQuantityOptions, qty]
            return { ...prev, supplementQuantityOptions: options.sort((a, b) => a - b) }
        })
    }

    // Submit Handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("price", formData.price.toString());
        formDataToSend.append("stock", formData.stock.toString());
        formDataToSend.append("usageInstructions", formData.usageInstructions);

        formDataToSend.append("supplementQuantityOptions", JSON.stringify(formData.supplementQuantityOptions));
        formDataToSend.append("healthBenefits", JSON.stringify(formData.healthBenefits));
        formDataToSend.append("ingredients", JSON.stringify(formData.ingredients));

        // Only append *new* files. The backend will merge them with the existing ones.
        formData.images.forEach((file) => {
            formDataToSend.append("images", file);
        });

        // Fire the PATCH request
        updateProduct({ id: id!, formData: formDataToSend }, {
            onSuccess: () => {
                toast.success("Product updated successfully! 🛠️");
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || "Failed to update product.";
                toast.error(errorMessage);
            }
        });
    }

    if (isFetching) {
        return <div className="p-8 text-center text-gray-500">Loading product data...</div>
    }

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
                    <p className="text-gray-500 text-sm">Update inventory details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
                        <div className="space-y-4">
                            <Input
                                label="Product Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Textarea
                                label="Description"
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                            <List size={20} className="text-[#13458A]" /> Details & Specs
                        </h3>

                        {/* Ingredients */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                    placeholder="Add ingredient..."
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13458A]/30 text-sm"
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleIngredientAdd())}
                                />
                                <button
                                    type="button"
                                    onClick={handleIngredientAdd}
                                    className="bg-[#13458A] text-white p-2 rounded-lg hover:bg-[#0f366e] transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.ingredients.map((ing, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                        {ing} <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem("ingredients", i)} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Health Benefits */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Health Benefits</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newBenefit}
                                    onChange={(e) => setNewBenefit(e.target.value)}
                                    placeholder="Add benefit..."
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13458A]/30 text-sm"
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleBenefitAdd())}
                                />
                                <button
                                    type="button"
                                    onClick={handleBenefitAdd}
                                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.healthBenefits.map((ben, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                        {ben} <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem("healthBenefits", i)} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Usage Instructions */}
                        <Textarea
                            aria-label="Usage Instructions"
                            value={formData.usageInstructions}
                            onChange={(e) => setFormData({ ...formData, usageInstructions: e.target.value })}
                        />
                    </Card>
                </div>

                {/* Right Column: Settings & Price */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Pricing & Inventory</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Input
                                    label="Price ($)"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                                <DollarSign size={16} className="absolute top-[38px] right-3 text-gray-400" />
                            </div>
                            <div className="relative">
                                <Input
                                    label="Stock Quantity"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                />
                                <Package size={16} className="absolute top-[38px] right-3 text-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13458A]/30 text-sm"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Vitamins</option>
                                    <option>Protein</option>
                                    <option>Omega</option>
                                    <option>Immunity</option>
                                    <option>Minerals</option>
                                    <option>Probiotics</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Options</h3>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Quantity per Bottle</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[15, 30, 60, 120].map(qty => (
                                <div
                                    key={qty}
                                    onClick={() => toggleQuantity(qty)}
                                    className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${formData.supplementQuantityOptions.includes(qty)
                                        ? "border-[#0f4d36] bg-green-50 text-[#0f4d36] font-medium ring-1 ring-[#0f4d36]"
                                        : "border-gray-200 text-gray-600 hover:border-[#0f4d36]/50"
                                        }`}
                                >
                                    {qty} caps
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Images</h3>
                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                            <Upload size={32} className="mb-2 text-gray-400" />
                            <p className="text-sm">Upload additional images</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>

                        {/* Image Preview (Shows both existing Cloudinary URLs and new file previews) */}
                        {formData.imagePreviews.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {formData.imagePreviews.map((img, i) => (
                                    <div key={i} className="relative">
                                        <img
                                            src={img}
                                            alt="preview"
                                            className="w-full h-24 object-cover rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImagePreview(i)}
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                                        >
                                            <X size={14} className="text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Footer Actions */}
                <div className="lg:col-span-3 flex justify-end gap-4 mt-4 border-t pt-6">
                    <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => navigate(-1)} 
                        disabled={isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isUpdating}
                        className="text-white border-none transition-transform hover:scale-105 min-w-[150px] disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                        style={{ background: 'linear-gradient(to right, #8000FF, #0099FF)' }}
                    >
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditProductPage