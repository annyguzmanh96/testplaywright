import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';

test('Buscar titulo google', async ({ page }) => {
  await page.goto('https://google.com');

  await expect(page).toHaveTitle(/Google/);
});


test('boton buscar con google', async ({ page }) => {
  await page.goto('https://google.com');
  await page.getByLabel('Buscar', { exact: true }).fill('hola mundo');
  await page.getByLabel('Buscar', { exact: true }).press('Enter');
  await expect(page.getByRole('heading', { name: 'hola mundo' }).first()).toBeVisible({ timeout: 30_000 });
  
});

test('Probar componente text box y formulario', async ({ page }) => {
  await page.goto('https://demoqa.com/');  
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.locator("//span[contains(text(), 'Text Box')]").click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill("Pepito Montoya");  // campo 1
  await page.getByRole('textbox', { name: 'name@example.com' }).fill("pepito@prueba.com");
  await page.getByRole('textbox', { name: 'Current Address' }).fill("Calle falsa 123");
  await page.locator('//textarea[@id="permanentAddress"]').fill("Prueba Permanent A.");
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await expect(page.getByText("Email:pepito@prueba.com")).toBeVisible({ timeout: 8_000 });
});

test('Probar componente text box y formulario GRABANDO', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByText('Text Box').click();
  await page.getByPlaceholder('Full Name').fill('pepito Montoya'); 
  await page.getByPlaceholder('name@example.com').fill('pepito@prueba.com');
  await page.getByPlaceholder('Current Address').fill('prueba current');
  await page.locator('#permanentAddress').fill('prueba address');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#email')).toContainText('Email:pepito@prueba.com');
});

test('Probar componente Web table', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByText('Web Tables').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByPlaceholder('First Name').fill('Pepito');
  await page.getByPlaceholder('Last Name').fill('Montoya');
  await page.getByPlaceholder('name@example.com').fill('pepito@prueba.com');
  await page.getByPlaceholder('Age').fill('22');
  await page.getByPlaceholder('Salary').fill('1000');
  await page.getByPlaceholder('Department').fill('Antioquia');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('grid')).toContainText('pepito@prueba.com');
});

test('Probar componente Web table eliminar registro', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Elements' }).click();
  await page.getByText('Web Tables').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByPlaceholder('First Name').fill('Pepito');
  await page.getByPlaceholder('Last Name').fill('Montoya');
  await page.getByPlaceholder('name@example.com').fill('pepito@prueba.com');
  await page.getByPlaceholder('Age').fill('22');
  await page.getByPlaceholder('Salary').fill('1000');
  await page.getByPlaceholder('Department').fill('Antioquia');
  await page.screenshot({path: 'Evidencias/evidencia Tabla 1.png', fullPage:true});
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('grid')).toContainText('pepito@prueba.com');
  
  await page.screenshot({path: 'Evidencias/evidencia Tabla 2.png', fullPage:true});
  
  await page.locator('(//div[contains(text(),"pepito@prueba.com")]//following::span)[2]').click();
  await page.screenshot({path: 'Evidencias/evidencia Tabla 3.png', fullPage:true});
});

test('Probar componente de Alertas', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
  await page.getByText('Alerts', { exact: true }).click();

  page.on('dialog', async dialog => {
    if (dialog.type() === 'alert') {
      console.log('Alerta detectada:', dialog.message());
      await dialog.accept();
    } else if (dialog.type() === 'confirm') {
      await dialog.accept(); 
    } else if (dialog.type() === 'prompt') {
      await dialog.accept('pruba Alertas');
    }
  });

  await page.locator('#alertButton').click();
  await page.locator('#timerAlertButton').click();
  await page.locator('#confirmButton').click();
  await page.locator('#promtButton').click();
  await expect(page.locator('#confirmResult')).toContainText('You selected Ok');
  await expect(page.locator('#promptResult')).toContainText('You entered pruba Alertas');
  await page.screenshot({path: 'Evidencias/evidenciaAlertas.png', fullPage:true});

});

test('Probar componentes de Botones', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('svg').first().click();
  await page.getByText('Buttons').click();
  await page.getByRole('button', { name: 'Double Click Me' }).click();
  await page.getByRole('button', { name: 'Right Click Me' }).click();
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
  await page.screenshot({path: 'Evidencias/evidenciaBotones.png', fullPage:true});

});