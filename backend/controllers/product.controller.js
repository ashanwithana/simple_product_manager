import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
    } catch (err) {
        console.error("Error in creating product", err.message);
        return res.status(500).json({ success: false, message: "Error in creating product" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    const product = await Product.findById(id)
    if (!product) {
        return res.status(400).json({ success: false, message: "Product not found" })
    }

    try {
        await product.deleteOne()
        return res.status(200).json({ success: true, message: "Product deleted successfully" })
    } catch (err) {
        console.error("Error in deleting product", err.message);
        return res.status(500).json({ success: "false", message: "Error while deleting product" })
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        if (!products) {
            return res.status(404).json({ success: false, message: "No products found" })
        } else {
            return res.status(200).json({ success: true, products })
        }
    } catch (err) {
        console.error("Error in fetching products", err.message);
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        console.error("Error in updating product", err.message);
        return res.status(500).json({ success: false, message: "Error while updating product" });
    }
}