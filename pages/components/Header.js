import { Button, Label, Link } from "../../framework/gui";

class Header {
	constructor(page) {
		this.page = page;
		this.locators = {
			burgerMenu: this.page.locator("#react-burger-menu-btn"),
			logoutLink: this.page.getByTestId("logout-sidebar-link"),
			cartBadge: this.page.getByTestId("shopping-cart-badge"),
		};
	}

	get burgerMenu() {
		return new Button(this.locators.burgerMenu, "Burger Menu Button");
	}

	get logoutLink() {
		return new Link(this.locators.logoutLink, "Logout Link");
	}

	get cartBadge() {
		return new Label(this.locators.cartBadge, "Cart Badge");
	}

	async logout() {
		await this.burgerMenu.click();
		await this.logoutLink.click();
	}
}
export default Header;
