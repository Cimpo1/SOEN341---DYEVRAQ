import { test, expect } from '@playwright/test';

test('Is the website up?', async ({ page }) => {
    await page.goto('http://100.98.33.229:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DYEVRAQ', exact: true })).toBeVisible();
});

test('Is the login Auth0 working?', async ({ page }) => {
    await page.goto('http://100.98.33.229:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('test');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByText('Wrong email or password')).toBeVisible();
});

test('Can you login?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d_cimpoi@live.concordia.ca');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('mF6T5aeebCGk8R4!');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByRole('img', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pick a chat to get the' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('Can we create a group?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d_cimpoi@live.concordia.ca');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('mF6T5aeebCGk8R4!');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByRole('img', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create a group' })).toBeVisible();
    await page.getByRole('button', { name: 'Create a group' }).click();
    await page.getByRole('checkbox', { name: 'David Cimpoiasu' }).check();
    await expect(page.getByRole('button', { name: 'Create Group' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('Can you create a conversation?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d_cimpoi@live.concordia.ca');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('mF6T5aeebCGk8R4!');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByRole('img', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Conversation' })).toBeVisible();
    await page.getByRole('button', { name: 'New Conversation' }).click();
    await expect(page.locator('label').filter({ hasText: 'David Cimpoiasu' })).toBeVisible();
    await page.getByRole('radio', { name: 'David Cimpoiasu' }).check();
    await expect(page.getByRole('button', { name: 'Start Conversation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('Can you write a text?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d_cimpoi@live.concordia.ca');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('mF6T5aeebCGk8R4!');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByRole('img', { name: 'Welcome' })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^D$/ }).nth(1)).toBeVisible();
    await page.getByText('D', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Chat with David Cimpoiasu' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Type a message...' }).click();
    await page.getByRole('textbox', { name: 'Type a message...' }).fill('Test');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.locator('body')).toContainText('Test');
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
