import { test, expect } from '@playwright/test';

test.describe('Guest Booking Flow', () => {
  test('should display events on the homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Система бронирования встреч' })).toBeVisible();
    await expect(page.getByText('Доступные события для бронирования')).toBeVisible();

    const eventCards = page.getByRole('link', { name: 'Забронировать' });
    await expect(eventCards.first()).toBeVisible();
  });

  test('should navigate to booking page and select a time slot', async ({ page }) => {
    await page.goto('/');

    const firstEvent = page.getByRole('link', { name: 'Забронировать' }).first();
    await firstEvent.click();

    await expect(page.getByText('Выберите доступное время для бронирования')).toBeVisible();
    await expect(page.locator('input[type="date"]')).toBeVisible();

    await page.waitForTimeout(1000);

    const availableSlots = page.locator('button:not(:disabled)');
    await expect(availableSlots.first()).toBeVisible({ timeout: 10000 });

    const count = await availableSlots.count();
    expect(count).toBeGreaterThan(0);

    await availableSlots.first().click();

    await expect(page.getByText('Бронирование')).toBeVisible();
    await expect(page.getByLabel('Имя')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Телефон')).toBeVisible();
  });

  test('should complete a booking successfully', async ({ page }) => {
    await page.goto('/');

    const firstEvent = page.getByRole('link', { name: 'Забронировать' }).first();
    await firstEvent.click();

    await expect(page.locator('input[type="date"]')).toBeVisible();
    await page.waitForTimeout(1000);

    const availableSlots = page.locator('button:not(:disabled)');
    await availableSlots.first().click();

    await page.getByLabel('Имя').fill('Иван Тестовый');
    await page.getByLabel('Email').fill('ivan@test.com');
    await page.getByLabel('Телефон').fill('+79991234567');

    await page.getByRole('button', { name: 'Забронировать' }).click();

    await expect(page.getByText('Выберите доступное время для бронирования')).toBeVisible();
  });

  test.skip('should show validation errors for invalid booking form', async ({ page }) => {
    await page.goto('/');

    const firstEvent = page.getByRole('link', { name: 'Забронировать' }).first();
    await firstEvent.click();

    await page.waitForTimeout(1000);

    const availableSlots = page.locator('button:not(:disabled)');
    await availableSlots.first().click();

    await page.getByLabel('Имя').fill('А');
    await page.getByLabel('Имя').blur();

    await page.getByLabel('Email').fill('invalid');
    await page.getByLabel('Email').blur();

    await page.getByLabel('Телефон').fill('123');
    await page.getByLabel('Телефон').blur();

    await page.getByRole('button', { name: 'Забронировать' }).click();

    await page.waitForTimeout(500);

    await expect(page.getByText('Минимум 2 символа')).toBeVisible();
    await expect(page.getByText('Неверный email')).toBeVisible();
    await expect(page.getByText('Неверный номер телефона')).toBeVisible();
  });

  test('should show occupied slots as disabled', async ({ page }) => {
    await page.goto('/');

    const firstEvent = page.getByRole('link', { name: 'Забронировать' }).first();
    await firstEvent.click();

    await page.waitForTimeout(1000);

    const allSlots = page.locator('button');
    const totalCount = await allSlots.count();

    expect(totalCount).toBeGreaterThan(0);
    
    // Check that some slots are disabled (occupied)
    const disabledSlots = page.locator('button:disabled');
    const disabledCount = await disabledSlots.count();
    
    // With our test fixtures, we should have 2 occupied slots on 2026-04-05
    expect(disabledCount).toBeGreaterThan(0);
  });
});
