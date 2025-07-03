import { test, expect, request } from '@playwright/test';
import { ContactPage } from '../page_object/contact.po.js';
import { LoginPage } from '../page_object/login.po.js';
import { access } from 'fs';
const ContacttestData = require('../fixtures/contactFixture.json');
const logindata = require('../fixtures/loginFixture.json');

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(logindata.validUser.userName, logindata.validUser.password);
    await login.verifyValidLogin();
});

test.describe('Contact testcases', () => {
    test('Contact Add test', async ({ page }) => {
        const contact = new ContactPage(page);

        await contact.contactAdd(
            ContacttestData.contact.firstName,
            ContacttestData.contact.lastName,
            ContacttestData.contact.birthDate,
            ContacttestData.contact.email,
            ContacttestData.contact.phone,
            ContacttestData.contact.street1,
            ContacttestData.contact.street2,
            ContacttestData.contact.city,
            ContacttestData.contact.stateProvince,
            ContacttestData.contact.postalCode,
            ContacttestData.contact.country
        );

        await contact.validateContactCreated(
            ContacttestData.contact.firstName,
            ContacttestData.contact.lastName,
            ContacttestData.contact.birthDate,
            ContacttestData.contact.email,
            ContacttestData.contact.phone,
            ContacttestData.contact.street1,
            ContacttestData.contact.street2,
            ContacttestData.contact.city,
            ContacttestData.contact.stateProvince,
            ContacttestData.contact.postalCode,
            ContacttestData.contact.country
        );
    });

    test('Contact Edit test', async ({ page }) => {
        const contact = new ContactPage(page);

        // Edit first name
        

        await contact.viewCreatedContact();
        await contact.contactEdit(ContacttestData,contactEdit.firstName);
      await this.page.waitForSelector(contact.viewCreatedContact, { state: 'visible' });
         await this.page.locator(contact.viewCreatedContact).click();

        // Validate edited contact
        await contact.validateContactCreated(
            ContacttestData.contactEdit.firstName,
            ContacttestData.contact.lastName,
            ContacttestData.contact.birthDate,
            ContacttestData.contact.email,
            ContacttestData.contact.phone,
            ContacttestData.contact.street1,
            ContacttestData.contact.street2,
            ContacttestData.contact.city,
            ContacttestData.contact.stateProvince,
            ContacttestData.contact.postalCode,
            ContacttestData.contact.country
        );
        const id= await getEntity( accessToken,'/contacts','200',{request});
        await deleteEntity(accessToken,'/contacts/$id',{request});
        await validateEntity(accessToken,'/contacts/$id','404',{request});
        
    });
   test.afterEach(async({page})=>{
    await page.close();
   })

    
});