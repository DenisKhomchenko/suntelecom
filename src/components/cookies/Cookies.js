import Gator from 'gator';

class Cookies {
  constructor() {
    if (!Cookies.hasCookiesAcceptation()) {
      this.initComponent();
    }
  }

  static hasCookiesAcceptation() {
    return window.localStorage.getItem('cookiesAcceptation');
  }

  static createEntity() {
    window.localStorage.setItem('cookiesAcceptation', 'true');
  }

  initComponent() {
    this.buildTemplate();
    this.attachEvents();
  }

  buildTemplate() {
    this.element = document.createElement('div');
    this.element.classList.add('cookies');
    this.element.innerHTML = `
      <div class="cookies__inner">
        <div class="cookies__text">Мы используем <code class="code">&lt;/cookie&gt;</code>, потому что так надо
        </div><button class="cookies__button" type="button" data-action="accept-cookies"><span class="cookies__bracket cookies__bracket_left">[</span><span class="cookies__button-text">ОК</span><span class="cookies__bracket cookies__bracket_right">]</span></button>
      </div>
    `;
    document.body.append(this.element);
  }

  attachEvents() {
    Gator(document).on('click', '[data-action="accept-cookies"]', () => {
      Cookies.createEntity();
      this.hideBanner();
    });
  }

  hideBanner() {
    this.element.classList.add('cookies_hidden');

    setTimeout(() => {
      this.element.remove();
    }, 600);
  }
}

export default Cookies;
