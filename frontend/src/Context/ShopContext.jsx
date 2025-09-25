import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);


// Initialize cart with all product IDs set to 0 quantity
const getDefaultCart = () => {
    let cart = {};
    for (let index = 1; index <= all_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // Add item to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // Remove item from cart
    const RemoveFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0 }));
    }

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = all_product.find(product => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += cartItems[itemId] * itemInfo.new_price;
                }
            }
        }
        return totalAmount.toFixed(2); 
    }

    const getTotalCartItems =() =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue = {
        getTotalCartItems ,
        all_product,
        cartItems,
        addToCart,
        RemoveFromCart,
        getTotalCartAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
