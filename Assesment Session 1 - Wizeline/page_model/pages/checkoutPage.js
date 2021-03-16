import { Selector, t } from 'testcafe'

class MyCheckoutPage {
    constructor (){
        this.firstName = Selector('#first-name.form_input')
        this.lastName = Selector('#last-name.form_input')
        this.postalCode = Selector('#postal-code.form_input')
        this.continueButton = Selector('.btn_primary.cart_button')
        this.missingInfo = Selector('h3')        
    }
}

export default new MyCheckoutPage()