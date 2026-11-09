import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class SatcElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getFormAluno(): Locator {
    return this.page
      .locator('form')
      .filter({ has: this.page.locator('#user1') });
  }

  getCampoMatricula(): Locator {
    return this.getFormAluno().getByPlaceholder('Matrícula');
  }

  getCampoSenha(): Locator {
    return this.getFormAluno().getByPlaceholder('Senha');
  }

  getBotaoAcessar(): Locator {
    return this.getFormAluno().getByRole('button', { name: 'Acessar' });
  }

  getBotaoMostrarSenha(): Locator {
    return this.getFormAluno().getByRole('button', { name: 'Mostrar senha' });
  }

  getMensagemSomenteNumeros(): Locator {
    return this.getFormAluno().getByText(/Somente\s+números/);
  }

  getMensagemObrigatorio(): Locator {
    return this.getFormAluno().getByText('Obrigatório');
  }
}
