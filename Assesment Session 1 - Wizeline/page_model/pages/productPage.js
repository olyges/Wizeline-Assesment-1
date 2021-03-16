import {Selector} from 'testcafe'

class MyProductsPage {
    constructor (){
        this.pageTitle = Selector('.product_label') //Products Title
        this.burgerMenu = Selector('#react-burger-menu-btn') // Burger Menu
        this.shoppingCart = Selector('path') // Shopping cart icon
        this.addToCartButton = Selector ('.btn_primary.btn_inventory') // ADD TO CART Button
    }
}

export default new MyProductsPage()