import React, { Component, useContext } from "react";
import { Alert } from "react-native";
import WebUrl from '../Utils/WebUrl';


//Tạo Context
export const CartContext = React.createContext();


export class CartProvider extends Component {
    constructor(props) {
        super(props)
        //Tạo một state là cartItem để lưu sản phẩm

        this.state = {
            cartItem: [],
            total: 0,
            detailFormCheckout: [],
            isConfirm: false
        }
        //để render được func thì phải bind nó
        this.addToCart = this.addToCart.bind(this)
        this.updateCart = this.updateCart.bind(this)
        this.deleteCart = this.deleteCart.bind(this)
        this.setDetailFormCheckout = this.setDetailFormCheckout.bind(this)
        this.postCheckout = this.postCheckout.bind(this)
        this.resetConfirm = this.resetConfirm.bind(this)
       
    }
    resetConfirm = () => {
        this.setState({
            isConfirm: false
        })
    }

    postCheckout = (customerInfo) => {
        try {
            fetch(WebUrl() + '/api/checkout', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: this.state.detailFormCheckout[0].email,
                        name: this.state.detailFormCheckout[0].name,
                        address: this.state.detailFormCheckout[0].address,
                        phone: this.state.detailFormCheckout[0].phone,
                        note: this.state.detailFormCheckout[0].note,
                        customer_id: customerInfo.id,
                        payment_method: 'cash',
                        order_total: this.state.total,
                        carts: this.state.cartItem,
                    }
                )
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.code == 200) {
                        this.setState({
                            cartItem: [],
                            total: 0,
                            isConfirm: true
                        })
                    } else {
                        Alert.alert(json.message)
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }


    //function set trạng thái cho state khi nhấn addToCart
    addToCart(product) {

        const exist = this.state.cartItem.find(x => x.id === product.id);
        if (exist) {
            this.state.cartItem.map((x) => x.id === product.id ? x.qty = x.qty + 1 : x)
            this.setState({
                total: parseInt(this.state.total) + parseInt(product.price)
            })
        } else {
            product['qty'] = 1;

            this.setState({
                cartItem: this.state.cartItem.concat(product),
                total: parseInt(this.state.total) + parseInt(product.price)
            })
        }
        Alert.alert('Thêm giỏ hàng thành công!')
    }

    updateCart(type, id, price) {
        if (type == '+') {
            const exist = this.state.cartItem.find(x => x.id === id);
            if (exist) {
                this.state.cartItem.map((x) => x.id === id ? x.qty = x.qty + 1 : x)
                this.setState({
                    total: this.state.total + price
                })
            }
        }
        if (type == '-') {
            const exist = this.state.cartItem.find(x => x.id === id && x.qty > 1);
            if (exist) {
                this.state.cartItem.map((x) => x.id === id ? x.qty = x.qty - 1 : x)
                this.setState({
                    total: this.state.total - price
                })
            }
        }
    }


    deleteCart(id, total) {
        //Lọc ra mảng cartItem mới bỏ qua item có id cần xóa
        let filteredArray = this.state.cartItem.filter(item => item.id !== id)
        this.setState({
            cartItem: filteredArray,
            total: this.state.total - total
        });

    }

    setDetailFormCheckout(val) {
        this.setState({
            detailFormCheckout: val
        })
    }

 
    //trả về một ContextProvider gồm có: cartItem với cartItem có trạng thái state và func addToCart
    render() {
        return <CartContext.Provider value={{
            cartItem: this.state.cartItem,
            addToCart: this.addToCart,
            updateCart: this.updateCart,
            deleteCart: this.deleteCart,
            setDetailFormCheckout: this.setDetailFormCheckout,
            total: this.state.total,
            detailFormCheckout: this.state.detailFormCheckout,
            postCheckout: this.postCheckout,
            isConfirm: this.state.isConfirm,
            resetConfirm: this.resetConfirm,
           
        }}>
            {this.props.children}
        </CartContext.Provider>
    }
}