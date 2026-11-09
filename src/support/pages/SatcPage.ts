import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import SatcElements from '../elements/SatcElements';
import BasePage from './BasePage';

export default class SatcPage extends BasePage {
  readonly satcElements: SatcElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.satcElements = new SatcElements(page);
  }

  async preencherMatriculaComPontos(): Promise<void> {
    await this.satcElements.getCampoMatricula().click();
    await this.satcElements.getCampoMatricula().pressSequentially('123.456');
    await this.satcElements.getCampoSenha().click();
  }

  async validarMensagemSomenteNumeros(): Promise<void> {
    await expect(this.satcElements.getCampoMatricula()).toHaveValue('123.456');
    await expect(this.satcElements.getMensagemSomenteNumeros()).toBeVisible();
  }

  async acessarSemPreencher(): Promise<void> {
    await this.satcElements.getBotaoAcessar().click();
  }

  async validarCamposObrigatorios(): Promise<void> {
    await expect(this.satcElements.getMensagemObrigatorio()).toBeVisible();
    await expect(this.page).toHaveURL(/#\/1$/);
  }

  async preencherSenhaEMostrar(): Promise<string> {
    const senha = faker.internet.password();
    await this.satcElements.getCampoSenha().click();
    await this.satcElements.getCampoSenha().fill(senha);
    await expect(this.satcElements.getCampoSenha()).toHaveAttribute(
      'type',
      'password'
    );
    await this.satcElements.getBotaoMostrarSenha().click();
    return senha;
  }

  async validarSenhaVisivel(senha: string): Promise<void> {
    await expect(this.satcElements.getCampoSenha()).toHaveAttribute(
      'type',
      'text'
    );
    await expect(this.satcElements.getCampoSenha()).toHaveValue(senha);
  }
}
