import { test, expect } from "@playwright/test";
import { userLogin } from "./userLogin";
import { allWorkItem } from "./allWorkItems";

test("Add new work Item", async ({ page }) => {
  test.setTimeout(90000);
  const loginPage = new userLogin(page);
  const addWorkItemPage= new allWorkItem(page)
  await loginPage.navigateToUrl();
  await loginPage.login("vishnunarayan@carestack.com", "Abc@123");
  await addWorkItemPage.clickAddItemButton();
  await addWorkItemPage.insertValuesIntoAddItemModal("Vishnu Narayan","Dental Depot DFW","Abt, Chelsey");
  await addWorkItemPage.selectAppointmentDate(5)
  //await addWorkItemPage.selectTimeZone();
  await addWorkItemPage.selectLocation();
 // await addWorkItemPage.checkOnDemandRequest();
  await addWorkItemPage.selectPriority();
  const id=await addWorkItemPage.saveModal() as string;
  await addWorkItemPage.filterById(id);
  
});