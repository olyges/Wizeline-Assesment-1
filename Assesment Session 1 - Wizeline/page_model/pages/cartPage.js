import {Selector} from 'testcafe'

class MyCart {
    constructor (){
       
        this.pageTitle = Selector('.header_label') // Menu Logout option
        this.cartQuantity = Selector('.cart_quantity')
        this.counterItems = Selector('.fa-layers-counter.shopping_cart_badge')
        this.checkOut = Selector('.btn_action.checkout_button')
    }
}

export default new MyCart()