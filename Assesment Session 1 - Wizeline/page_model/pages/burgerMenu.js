import {Selector} from 'testcafe'

class MyBurgerMenu {
    constructor (){
       
        this.logout = Selector('#logout_sidebar_link.bm-item.menu-item') // Menu Logout option
    }
}

export default new MyBurgerMenu()