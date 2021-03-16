import LoginPage from '../pages/LoginPage'
import MyProductsPage from '../pages/productPage'
import MyCart from '../pages/cartPage'
import MyBurgerMenu from '../pages/burgerMenu'
import MyCheckoutPage from '../pages/checkoutPage'
import MyCheckoutOverViewPage from '../pages/checkoutOverviewPage'
import {CREDENTIALS} from '../data/Constants'

fixture('Login feature testing')
    .page `https://www.saucedemo.com/`

// 1. Login with a valid user
test ('Login with a valid user', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t.expect(MyProductsPage.pageTitle.exists).ok() //User navigates to the product´s page
})

// 2. Login with an invalid user
test ('Login with an invalid user', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.USERNAME,CREDENTIALS.INVALID_USER.PASSWORD)
    await t
    .expect(LoginPage.errorMessage.exists).ok()
    .expect(LoginPage.errorMessage.innerText).eql('Epic sadface: Username and password do not match any user in this service') //Error message is displayed
})

// 3. Logout from product´s page
test ('Logout from product´s page', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.burgerMenu)
    .click(MyBurgerMenu.logout)
    .expect(LoginPage.loginButton.exists).ok() // User navigates to the login page
})

//4. Navigate to the shopping cart
test ('Navigate to the shopping cart', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.shoppingCart)
    .expect(MyCart.pageTitle.exists).ok() // User navigates to the shopping cart page.
})

//5. Add a single item to the shoppong cart
test ('Add a single item to the shopping cart', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.addToCartButton)   
    .click(MyProductsPage.shoppingCart)
    .expect(MyCart.cartQuantity.exists).ok()
    .expect(MyCart.counterItems.innerText).eql('1') // Validate the item has been added to the shopping cart.
    
})

//6. Add multiple items to the shopping cart
test ('Add multiple items to the shopping cart', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.addToCartButton) 
    .click(MyProductsPage.shoppingCart)
    .expect(MyCart.counterItems.innerText).eql('3') // validate all items have been added to the shopping cart  
})

//7. Continue with missing mail information
test ('Continue with missing mail information', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.shoppingCart)
    .click(MyCart.checkOut)
    .typeText(MyCheckoutPage.firstName, 'Olympia')
    .typeText(MyCheckoutPage.lastName, 'Garrocho') // Only First and last name added
    .click(MyCheckoutPage.continueButton)
    .expect(MyCheckoutPage.missingInfo.exists).ok()
    .expect(MyCheckoutPage.missingInfo.innerText).eql('Error: Postal Code is required') // Validate error message is displayed

})

//8. Fill user´s information
test ('Fill user´s information', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.shoppingCart)
    .click(MyCart.checkOut)
    .typeText(MyCheckoutPage.firstName, 'Olympia')
    .typeText(MyCheckoutPage.lastName, 'Garrocho')
    .typeText(MyCheckoutPage.postalCode, '25296')
    .click(MyCheckoutPage.continueButton)
    .expect(MyCheckoutOverViewPage.pageTitle.exists).ok()
    .expect(MyCheckoutOverViewPage.pageTitle.innerText).eql('Checkout: Overview') // Validate the user navigates to the overview page

})

//9. Final order items
test ('Final order items', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.addToCartButton) // two items added
    .click(MyProductsPage.shoppingCart)
    .click(MyCart.checkOut)
    .typeText(MyCheckoutPage.firstName, 'Olympia')
    .typeText(MyCheckoutPage.lastName, 'Garrocho')
    .typeText(MyCheckoutPage.postalCode, '25296')
    .click(MyCheckoutPage.continueButton)
    .expect(MyCheckoutOverViewPage.pageTitle.exists).ok()
    .expect(MyCheckoutOverViewPage.pageTitle.innerText).eql('Checkout: Overview')
    .expect(MyCart.counterItems.innerText).eql('2') // Validate items in the overviwe page match with the added items

})

//10. Complete a purchase
test('Complete a purchase', async t =>{
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await t
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.addToCartButton)
    .click(MyProductsPage.shoppingCart)
    .click(MyCart.checkOut)
    .typeText(MyCheckoutPage.firstName, 'Olympia')
    .typeText(MyCheckoutPage.lastName, 'Garrocho')
    .typeText(MyCheckoutPage.postalCode, '25296')
    .click(MyCheckoutPage.continueButton)
    .expect(MyCheckoutOverViewPage.pageTitle.exists).ok()
    .expect(MyCheckoutOverViewPage.pageTitle.innerText).eql('Checkout: Overview')
    .expect(MyCart.counterItems.innerText).eql('2')
    .click(MyCheckoutOverViewPage.finishButton)
    .expect(MyCheckoutOverViewPage.pageTitleFinal.innerText).eql('THANK YOU FOR YOUR ORDER') // Validate the user navigates to the confirmation page.

})
