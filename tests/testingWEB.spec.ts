import { test, expect } from '@playwright/test';

test('Is the website up?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DYEVRAQ', exact: true })).toBeVisible();
});

test('Is Auth0 working?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('gggg');
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


test('Can you chat with the bot?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d_cimpoi@live.concordia.ca');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('mF6T5aeebCGk8R4!');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByRole('img', { name: 'Welcome' })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^🤖$/ }).nth(1)).toBeVisible();
    await page.locator('div').filter({ hasText: /^🤖$/ }).nth(1).click();
    await page.getByRole('textbox', { name: 'Type a message...' }).click();
    await page.getByRole('textbox', { name: 'Type a message...' }).fill('Hello');
    await page.getByRole('textbox', { name: 'Type a message...' }).press('Enter');
    await expect(page.locator('body')).toContainText('Hello');
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('Cannot access home without login', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    await expect(page.getByRole('heading', { name: 'Application error: a client-' })).toBeVisible();
});

test('Make sure you can sign up', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('section').filter({ hasText: 'Join Millions of Users' }).getByRole('link')).toBeVisible();
    await page.locator('section').filter({ hasText: 'Join Millions of Users' }).getByRole('link').click();
    await expect(page.getByText('Sign Up to dev-')).toBeVisible();
});

test('Make sure content loads with css', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('img', { name: 'LOGO' })).toBeVisible();
    await expect(page.getByText('© 2025 DYEVRAQ. All rights')).toBeVisible();
    await expect(page.getByText('Community ServerCreate public')).toBeVisible();
});