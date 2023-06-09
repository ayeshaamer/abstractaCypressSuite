/// <reference types="Cypress" />
import userCredentials from '../fixtures/userCredentials.json'
import CartPage from '../pageobjects/cartPage'
import HomePage from '../pageobjects/homePage'
import LoginPage from '../pageobjects/loginPage'
import SearchPage from '../pageobjects/searchPage'

describe('cart operations test cases', () => {
    const productName = 'HTC'

    before('open home page', () => {
        cy.openPage('Login')
        LoginPage.validateLoginPage()
        LoginPage.loginUser(userCredentials.email, userCredentials.password)
        HomePage.validateHomePage()
    })

    it('search a product', () => {
        HomePage.searchProduct(productName)
        SearchPage.validateSearchPage(productName)
        SearchPage.validateSearchedItem(productName)
    })

    it('add product to cart', () => {
        SearchPage.clickAddToCartBtn()
        SearchPage.successIsDisplayed()
        SearchPage.openCartPage()
        CartPage.validateProductInCart(productName)
    })

    it('update product in cart', () => {
        const updateCount = 2
        CartPage.updateQuantityField(updateCount)
        CartPage.clickUpdateBtn()
        CartPage.successIsDisplayed()
        CartPage.confirmTotalCartCount(updateCount)
    })

    it('delete product from cart', () => {
        CartPage.clickDeleteBtn()
        CartPage.confirmTotalCartCount(0)
    })

    after('logout', () => {
        HomePage.logoutUser()
        LoginPage.validateLogoutPage()
    })
})