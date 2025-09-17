import { Page, Locator, expect } from "@playwright/test";



export class allWorkItem{
    readonly page: Page;
   // readonly addItemButton:Locator;
    readonly workItemModalTitle:Locator;
    readonly assignedUserField:Locator;
    readonly practiceField:Locator;
    readonly patientField:Locator;
    readonly insuranceField:Locator;
    readonly itemDropdown:Locator;
    readonly appointmentDate:Locator;
    readonly datePickerInput:Locator;
    readonly dateConfirmationButton:Locator;
    readonly timeZoneDropdown:Locator;
    readonly locationDropdown:Locator;
    readonly onDemandRequest:Locator;
    readonly saveAddItemModal:Locator;
    readonly priorityField :Locator;
    readonly addNewFilter:Locator;
    readonly itemIdField:Locator;
    readonly idInputField:Locator;
    readonly filterDelete:Locator;
    readonly workItemListCount:Locator;
    readonly successToaster:Locator;
    readonly filteredItem:Locator;
    readonly performIVButton:Locator;
    readonly eligibilitySaveButton:Locator;
    readonly statusField:Locator;

    constructor(page: Page) {
    this.page = page;
    this.workItemModalTitle=page.locator("//div[contains(@class,'modal-title')]")
    this.assignedUserField=page.locator("//cs-user-selector[@formcontrolname='user']//input")
    this.practiceField=page.locator("//cs-account-selector[@formcontrolname='account']//input")
    this.patientField=page.locator("//cs-patient-selector[@formcontrolname='patient']//input")
    this.insuranceField=page.locator("//cs-patient-insurance-selector[@formcontrolname='insurance']//input")
    this.appointmentDate=page.locator("//nz-date-picker[@formcontrolname='appointment']")
    this.itemDropdown=page.locator("//nz-option-container[contains(@class,'select-dropdown')]");
    this.dateConfirmationButton=this.page.locator("//li[contains(@class,'ant-picker')]/button")
    this.datePickerInput=this.page.locator("//nz-date-picker[@formcontrolname='appointment']")
    this.timeZoneDropdown=this.page.locator("//cs-timezone-dropdown-selector[@formcontrolname='timeZone']");
    this.locationDropdown=this.page.locator("//nz-select[@formcontrolname='location']")
    this.onDemandRequest=this.page.locator("//label[@formcontrolname='isOnDemandRequest']//input")
    this.saveAddItemModal=this.page.locator("//div[contains(@class,'modal-footer')]/button[2]")
    this.priorityField=this.page.locator("//nz-select[@formcontrolname='priority']")
    this.addNewFilter=this.page.locator("//a[contains(@class,'add-filter')]/span")
    this.itemIdField=this.page.locator("//input[@placeholder='Item ID']")
    this.idInputField=this.page.locator("//ul[contains(@class,'dropdown-menu')]/li[1]")
    this.filterDelete=this.page.locator("//nz-icon[@nztype='delete']")
    this.workItemListCount=this.page.locator("//div[@class='list-data']//span[contains(@class,'ticket-container')]")
    this.successToaster=this.page.locator("//div[contains(@class,'ant-message-success')]/span");
    this.filteredItem=this.page.locator("//div[@class='ant-row list']//span[2]");
    this.performIVButton=this.page.locator("//div[@class='footer']/button");
    this.eligibilitySaveButton=this.page.locator("//button[@data-testid='eligibility_save']")
    this.statusField= this.page.locator("//nz-select[contains(@class,'status-selector')]")
   }

async clickAddItemButton(){
    console.log("Entered clickAddItemButton method");
    await this.page.getByTitle('Add Work Item').click();
    await expect(this.workItemModalTitle).toBeVisible(); 
}

async insertValuesIntoAddItemModal(assignedUser:string,practice:string,patient:string ){
console.log("Entered insertValuesIntoAddItemModal method");
console.log("Values are:"+assignedUser+""+practice+""+patient)
    //choose Assigned User 
    await this.assignedUserField.click();
    await this.assignedUserField.fill(assignedUser)
    await expect(this.itemDropdown).toBeVisible();
    await this.itemDropdown.click();
    await this.page.click('body'); 
    await expect(this.itemDropdown).toBeHidden();

   //choose Practice
    await this.practiceField.click();
    await this.practiceField.fill(practice)
    await expect(this.itemDropdown).toBeVisible();
    await this.itemDropdown.click();
    await this.page.click('body'); 
    await expect(this.itemDropdown).toBeHidden();

    //choose Patient
    await expect(this.patientField).toBeEnabled();
    await this.patientField.click();
    await this.patientField.pressSequentially(patient,{delay:300})
    await expect(this.itemDropdown).toBeVisible();
    await this.page.locator("//nz-option-item[contains(@title,'"+patient+"')]").click()
    await this.page.click('body'); 
    await expect(this.itemDropdown).toBeHidden();

   // Choose first insurance 
    await expect(this.insuranceField).toBeEnabled();
    await this.insuranceField.click();
    await expect(this.itemDropdown).toBeVisible();
    await this.page.locator("//div[@id='cdk-overlay-4']//nz-option-item").click()
    await this.page.click('body'); 
    await expect(this.itemDropdown).toBeHidden();

   
}

  async selectAppointmentDate(daysToAdd:number){
  console.log("Entered selectAppointmentDate method");
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);
  const day = today.getDate();
  // open the datepicker
  await this.datePickerInput.click();
  // select the day using an explicit xpath selector
  await this.page.locator(`xpath=//div[contains(@class,'ant-picker-cell-inner') and normalize-space()='${day}']`).click();
  await this.dateConfirmationButton.click();
  await this.page.click('body'); 
  await expect(this.itemDropdown).toBeHidden();
 // await this.page.waitForTimeout(5000); 

}

async selectTimeZone(){
   console.log("Entered selectTimeZone method");
   await this.timeZoneDropdown.click();
   await this.itemDropdown.first().click();
   await this.page.click('body'); 
   await expect(this.itemDropdown).toBeHidden();
   // await this.page.waitForTimeout(5000); 
}

async selectLocation(){
   console.log("Entered selectLocation method");
   await expect(this.locationDropdown).toBeEnabled();
   await this.locationDropdown.click();
   await this.itemDropdown.first().click();
   await this.page.click('body'); 
   await expect(this.itemDropdown).toBeHidden();
}

async checkOnDemandRequest(){
   console.log("Entered checkOnDemandRequest method");
   await this.onDemandRequest.click();
   await this.page.click('body'); 
}

async selectPriority(){
 console.log("Entered selectPriority method");
 await expect(this.priorityField).toBeEnabled();
 await this.priorityField.click();
 await this.page.locator("//div[@class='ant-select-item-option-content' and normalize-space()='P3']").click();
 await this.page.click('body'); 
 await expect(this.itemDropdown).toBeHidden();
}

async saveModal(){
   console.log("Entered saveModal method");
   await this.saveAddItemModal.click();
   await expect (this.page).toHaveURL("https://eligibility.uat.carestack.com/#/all-work-items/iv-items");
   const toast = this.successToaster;
   const messageText = await toast.textContent();
   console.log("Captured messageText:", messageText);
   const match = messageText?.match(/E(\d+)/)
   const workItemId = match ? match[1] : null;
   console.log("Captured Work Item ID:", workItemId);
   return workItemId;
}

async filterById(id:string){
     console.log("Entered filterById method");
     // Delete exiting filter
     await expect(this.filterDelete).toBeVisible();
     await this.filterDelete.click();
     await this.page.waitForLoadState("networkidle");
     //Click add new filter 
     await expect(this.addNewFilter).toBeVisible();
     await this.addNewFilter.click();
     await this.page.waitForLoadState("networkidle");
     await this.idInputField.click();
     await this.page.click('body');   
     //Click item id filter
     await expect(this.itemIdField).toBeEnabled();
     await this.itemIdField.fill(id);

     const row = this.page.locator(`text=${id}`);
     await expect(row).toBeVisible();
     await expect(this.workItemListCount.first()).toBeVisible();
  // Verify row count
     const rowCount = await this.workItemListCount.count();
     console.log("Row count:", rowCount);
     expect(rowCount).toBe(1);
     console.log("Verified Work Item creation");
    }

    async clickTheFilteredItem(){
     console.log("Entered clickTheFilteredItem method");
     await this.filteredItem.click();
     await this.page.waitForLoadState("networkidle");
     await expect(this.filteredItem).toBeVisible({ timeout: 30000 }); 
    }

    async saveWorkItemModal(){
      await expect(this.statusField).toBeVisible()
      await this.statusField.click();
      await this.page.locator("//nz-option-container[contains(@class,'select-dropdown')]//nz-option-item[2]").click()
      const saveButton = this.performIVButton.nth(1);
      await saveButton.click();
      await this.page.waitForTimeout(5000);
      
    }
     async performIV(){
      await this.page.getByText("Perform IV").click()
      //  ])
      await this.page.waitForLoadState("domcontentloaded");

      // const content = this.page.locator("//button[@data-testid='eligibility_save']");
      // await expect(content).toBeEnabled({ timeout: 30000 });

      await this.page.waitForSelector("//button[@data-testid='eligibility_save']", { timeout: 30000 });
      const content = this.page.locator("//button[@data-testid='eligibility_save']");
      await expect(content).toBeEnabled();

      console.log(await this.page.title());
     }

}


