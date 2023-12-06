import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// create the api

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8181'}),
    endpoints: (builder) => ({

        // signUp endpoint
        signup: builder.mutation({
            query: (user) => ({
                url: '/user/signup',
                method: 'POST',
                body: user,
            }),
        }),

        //login in endpoint

        login: builder.mutation({
            query: user => ({
                url: '/user/login',
                method: 'POST',
                body: user

            }),
        }),

        //creating products fetch api
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                body: product,
                method: 'POST'
            }),
        }),
        //delete product from admin
        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),
        // update/patch product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),
        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),
        // remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),
        // increase cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),

        // decrease cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
        // create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),

         // add to wishlist
         addToWishlist: builder.mutation({
            query: (wishListInfo) => ({
                url: "/products/add-to-whishlist",
                body: wishListInfo,
                method: "POST",
            }),
        }),
        // remove from wishlist
        removeFromWishlist: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-whishlist",
                body,
                method: "POST",
            }),
        }),
    }),
});

  

export const { useSignupMutation, useLoginMutation, useCreateProductMutation, 
    useAddToCartMutation, 
    useRemoveFromCartMutation, useIncreaseCartProductMutation, useDecreaseCartProductMutation, 
    useCreateOrderMutation, useDeleteProductMutation, useUpdateProductMutation, useAddToWishlistMutation, useRemoveFromWishlistMutation
 } = appApi;

export default appApi;

