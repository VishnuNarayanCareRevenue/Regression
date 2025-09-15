import { Page, Locator, expect } from "@playwright/test";

export class userLogin{
readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly sidebar: Locator;
  readonly sidebarAvatar:Locator;
  readonly logoutButton: Locator;
  readonly loginValidationMessage:Locator;
 
constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@placeholder='Email']");
    this.passwordInput = page.locator("//input[@placeholder='Password']");
    this.loginButton = page.locator("//button[contains(@data-testid,'login-button')]");
    this.sidebar = page.locator("//nz-sider[contains(@class,'layout-sider')]");
    this.sidebarAvatar=page.locator("//nz-sider[contains(@class,'layout-sider')]//nz-avatar[contains(@class,'ant-avatar-circle')]");
    this.logoutButton = page.locator("//nz-icon[contains(@class,'logout')]");
    this.loginValidationMessage=page.locator("//div[contains(@class,'message-error')]/span");
    // this.sidebarAvatar = this.sidebar.locator('span[@class='user-name']');
  }

  async navigateToUrl() {
    console.log("Entered navigateToUrl method");
    await this.page.goto("https://eligibility.uat.carestack.com/#/login");
  }

  async login(username: string, password: string): Promise<Locator|null> {
    console.log("Entered login method");
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click({ force: true });
    await this.page.waitForLoadState("networkidle");
    const loginValidation=await this.loginValidationMessage.isVisible();
    console.log("loginValidation"+loginValidation);
    if(loginValidation){
      console.log("Invalid Credentials,Login is not possible");
    }
    else{
      console.log("Valid Credentials,Login is possible");
    // await this.sidebar.click();
    // await this.page.waitForLoadState("networkidle");
    // return this.sidebarAvatar;
    }
    return null;
  }

  async verifyLogout() {
    console.log("Entered verifyLogout method");
    const isLogoutComponentVisible = await this.logoutButton.isVisible();
    if (isLogoutComponentVisible) {
      console.log("The logout component is visible");
      await this.logoutButton.click();
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL("https://eligibility.uat.carestack.com/#/login");
      console.log("The logout is successful");
    } else {
      console.log("The logout component is invisible");
    }
  }

}
