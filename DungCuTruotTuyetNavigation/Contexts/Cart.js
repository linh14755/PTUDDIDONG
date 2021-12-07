import React, { Component } from "react";
import { Alert } from "react-native";

//Tạo Context
export const CartContext = React.createContext();

export class CartProvider extends Component {
    constructor(props) {
        super(props)
        //Tạo một state là cartItem để lưu sản phẩm
        this.state = {
            cartItem: []
        }
        //để render được func thì phải bind nó
        this.addToCart = this.addToCart.bind(this)
    }

    //function set trạng thái cho state khi nhấn addToCart
    addToCart(product) {

        const exist = this.state.cartItem.find(x => x.id === product.id);
        if (exist) {
            this.state.cartItem.map((x) => x.id === product.id ? x.qty = x.qty + 1 : x)
        } else {
            product['qty'] = 1;
            this.setState({
                cartItem: this.state.cartItem.concat(product)
            })
        }
        Alert.alert('Thêm giỏ hàng thành công!')
    }

    

    //trả về một ContextProvider gồm có: cartItem với cartItem có trạng thái state và func addToCart
    render() {
        return <CartContext.Provider value={{
            cartItem: this.state.cartItem,
            addToCart: this.addToCart,
        }}>
            {this.props.children}
        </CartContext.Provider>
    }
}