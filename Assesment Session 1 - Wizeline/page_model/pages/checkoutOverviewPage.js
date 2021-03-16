import { Selector, t } from 'testcafe'

class MyCheckoutOverViewPage {
    constructor (){
        this.pageTitle = Selector('.subheader')
        this.finishButton = Selector('.btn_action.cart_button')
        this.pageTitleFinal = Selector('.complete-header')        
    }
}

export default new MyCheckoutOverViewPage()