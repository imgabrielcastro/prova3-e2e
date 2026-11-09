import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import SatcPage from '../support/pages/SatcPage';

test.describe('Portal SATC - Login do aluno', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let satcPage: SatcPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.satc')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    satcPage = new SatcPage(page);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('Matrícula com pontos exibe "Somente números"', async () => {
    await satcPage.preencherMatriculaComPontos();
    await satcPage.validarMensagemSomenteNumeros();
  });

  test('Acessar sem preencher exibe campos obrigatórios', async () => {
    await satcPage.acessarSemPreencher();
    await satcPage.validarCamposObrigatorios();
  });

  test('Mostrar senha exibe a senha digitada', async () => {
    const senha = await satcPage.preencherSenhaEMostrar();
    await satcPage.validarSenhaVisivel(senha);
  });
});
