const express = require('express');
const router = express.Router();
const errorMiddleware = require('../middlewares/errors')
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReviews,
    getAdminProducts
} = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
router.get('/products', getProducts);
router.get('/product/:id', getSingleProduct);
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.put('/review', isAuthenticatedUser, createProductReview)
router.get('/review', isAuthenticatedUser, getProductReviews)
router.delete('/review', isAuthenticatedUser, deleteReviews)


module.exports = router;