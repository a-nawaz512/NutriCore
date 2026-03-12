import  Product  from "./product.model.js"

export const ProductService = {

  createProduct: async (data: any) => {
    console.log("data", data)

    const product = await Product.create(data)

    return product
  }

}