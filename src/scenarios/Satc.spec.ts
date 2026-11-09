import { expect, test } from '@playwright/test';

const invalidInputs = [
  '...',
  '123.456',
  '12.34.56',
  '1,2',
  '12-34',
  'abc',
  '12 34',
  '!@#'
];

test.describe('SATC Portal - Matrícula do aluno', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www1.satc.edu.br/portais/acesso/public/#/1', {
      waitUntil: 'networkidle'
    });
  });

  for (const value of invalidInputs) {
    test(`deve exibir "Somente números" ao digitar "${value}"`, async ({
      page
    }) => {
      const matricula = page.locator('#user1');
      await matricula.pressSequentially(value);
      await matricula.blur();

      await expect(matricula).toHaveValue(value);
      await expect(matricula).toHaveClass(/ng-invalid-pattern/);
      await expect(page.getByText('Somente números')).toBeVisible();
    });
  }

  test('não deve exibir erro ao digitar apenas números', async ({ page }) => {
    const matricula = page.locator('#user1');
    await matricula.pressSequentially('123456');
    await matricula.blur();

    await expect(matricula).toHaveValue('123456');
    await expect(matricula).not.toHaveClass(/ng-invalid-pattern/);
    await expect(page.getByText('Somente números')).toBeHidden();
  });
});
