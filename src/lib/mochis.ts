// Thin re-export shim for backward compatibility
export {
  fetchProducts as fetchMochis,
  fetchProductById as fetchMochiById,
  createProduct as createMochi,
  updateProduct as updateMochi,
  toggleProductEnabled as toggleMochiEnabled,
  deleteProduct as deleteMochi,
  uploadProductImage as uploadMochiImage,
  deleteProductImage as deleteMochiImage,
} from "./products";
