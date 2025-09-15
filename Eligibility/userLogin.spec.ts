import { test, expect } from "@playwright/test";
import { userLogin } from "./userLogin"; // Use the .ts extension, but import without it

test("Login as admin", async ({ page }) => {
  const loginPage = new userLogin(page);
  await loginPage.navigateToUrl();
  await loginPage.login("vishnunarayan@carestack.com", "Abc@123");
  await loginPage.verifyLogout();
});

test("Login as admin with invalid credentials", async ({ page }) => {
  const loginPage = new userLogin(page);
  await loginPage.navigateToUrl();
  await loginPage.login("vishnunarayan@carestack.com", "Abc@1023");
});