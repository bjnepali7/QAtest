const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
    constructor(page) {
        this.page = page;

        this.addContact = '//button[@id="add-contact"]';

        // Input fields
        this.firstNameInput = '#firstName';
        this.lastNameInput = '//input[@id="lastName"]';
        this.birthDateInput = '//input[@id="birthdate"]';
        this.emailInput = '//input[@id="email"]';
        this.phoneInput = '//input[@id="phone"]';
        this.streetOneInput = '//input[@id="street1"]';
        this.streetTwoInput = '//input[@id="street2"]';
        this.cityInput = '//input[@placeholder="City"]';
        this.stateProvinceInput = '//input[@id="stateProvince"]';
        this.postalCodeInput = '//input[@id="postalCode"]';
        this.countryInput = '//input[@id="country"]';

        this.submitButton = '//button[@id="submit"]';
        this.cancelButton = '//button[@id="cancel"]';

        // Saved values for validation
        this.savedFirstName = '//span[@id="firstName"]';
        this.savedLastName = '//span[@id="lastName"]';
        this.savedBirthDate = '//span[@id="birthdate"]';
        this.savedEmail = '//span[@id="email"]';
        this.savedPhone = '//span[@id="phone"]';
        this.savedStreetOne = '//span[@id="street1"]';
        this.savedStreetTwo = '//span[@id="street2"]';
        this.savedCity = '//span[@id="city"]';
        this.savedStateProvince = '//span[@id="stateProvince"]';
        this.savedPostalCode = '//span[@id="postalCode"]';
        this.savedCountry = '//span[@id="country"]';

        // Optional: if needed to click a view button
        this.viewCreatedContact = '//button[contains(text(),"View")]';
    }

    async contactAdd(firstName, lastName, birthDate, email, phone, street1, street2, city, stateProvince, postalCode, country) {
        await this.page.locator(this.addContact).click();

        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.birthDateInput).fill(birthDate);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.phoneInput).fill(phone);
        await this.page.locator(this.streetOneInput).fill(street1);
        await this.page.locator(this.streetTwoInput).fill(street2);
        await this.page.locator(this.cityInput).fill(city);
        await this.page.locator(this.stateProvinceInput).fill(stateProvince);
        await this.page.locator(this.postalCodeInput).fill(postalCode);
        await this.page.locator(this.countryInput).fill(country);

        await this.page.waitForTimeout(1000); // optional pause
        await this.page.locator(this.submitButton).click();
    }

    async validateContactCreated(firstName, lastName, birthDate, email, phone, street1, street2, city, stateProvince, postalCode, country) {
        // Optional view step
        if (this.viewCreatedContact) {
            await this.page.locator(this.viewCreatedContact).click();
        }

        await expect(this.page.locator(this.savedFirstName)).toHaveText(firstName);
        await expect(this.page.locator(this.savedLastName)).toHaveText(lastName);
        await expect(this.page.locator(this.savedBirthDate)).toHaveText(birthDate);
        await expect(this.page.locator(this.savedEmail)).toHaveText(email);
        await expect(this.page.locator(this.savedPhone)).toHaveText(phone);
        await expect(this.page.locator(this.savedStreetOne)).toHaveText(street1);
        await expect(this.page.locator(this.savedStreetTwo)).toHaveText(street2);
        await expect(this.page.locator(this.savedCity)).toHaveText(city);
        await expect(this.page.locator(this.savedStateProvince)).toHaveText(stateProvince);
        await expect(this.page.locator(this.savedPostalCode)).toHaveText(postalCode);
        await expect(this.page.locator(this.savedCountry)).toHaveText(country);
    }

    async contactEdit(newFirstName) {
        // Click edit button for first contact (update selector as needed)
        await this.page.locator('//button[contains(text(),"Edit")]').first().click();

        // Clear and fill new first name
        const firstNameLocator = this.page.locator(this.firstNameInput);
        await firstNameLocator.fill('');  // Clear existing
        await firstNameLocator.fill(newFirstName);

        // Submit changes
        await this.page.locator(this.submitButton).click();
     async function getCurrentDateTimeStamp() {
        const now =new Date();
        const year =now.getFullyear();
        const month= (now.getMonth()+1).toString().padStart(2,'0');//adding one month
        const day=now.getDate().toString().padStart(2,'0');
        const hours= now.getHours().toString().padStart(2,'0');
        const minutes= now.getMinutes().toString().padStart(2,'0');
        const seconds=now.getSeconds().toString().padStart(2,'0');
        return'$(year)-$(month)-$(day)_$(hours)-$(minutes)-$(seconds)';


    }
    async contactDelete(){
        await this.page.waitForTimeout(2000);
        this.page.once('dialog',async dialog=>{
            this.page.once{
                
            }
        })
    }
    
    }
   

  
};
 