(() => {
  class FormSubmit {
    constructor(instance) {
      this.callbacks = {
        pending: [],
        fail: [],
        success: [],
      }

      this.instance = instance;

      this.default = instance.getAttribute('data-regular') || instance.innerText;
      this.pending = instance.getAttribute('data-pending') || null;
      this.fail = instance.getAttribute('data-fail') || null;
      this.success = instance.getAttribute('data-success') || null;
    }

    setStatus(name) {
      this.instance.setAttribute('data-status', name);

      return this;
    }

    set(name) {
      switch (name) {
        case 'pending':
          this.setStatus('pending');
          this.instance.innerText = this.pending;
          this.trigger('pending', this);
          break;
        case 'success':
          this.setStatus('success');
          this.instance.innerText = this.success;
          this.trigger('success', this);
          break;
        case 'fail':
          this.setStatus('fail');
          this.instance.innerText = this.fail;

          this.trigger('fail', this);
          break;
        default:
          this.setStatus('regular');
          this.instance.innerText = this.regular;

          break;
      }

      return this;
    }

    trigger(name, ...args) {
      this.callbacks[name].forEach(cb => cb(...args));

      return this;
    }

    on(name, fn) {
      const callbacks = [ ...this.callbacks[name], fn ];

      this.callbacks[name] = callbacks;

      return this;
    }


    onClick(fn) {
      const submit = this;

      this.instance.addEventListener('click', function(ev) {
        return fn.bind(this)(ev,  submit);
      });

      return this;
    }
  }

  class FormsRegister {
    constructor(action, arr) {
      this.action = action;

      this.forms = [];

      arr.forEach(form => this.add(form));

      this.callbacks = {
        afterRequest: [],
        beforeRequest: [],
      }

      this.sended = false;
    }

    getFormData() {
      return new FormData( this.forms[0].instance );
    }

    sendRequest(...args) {
      if(this.sended) return;

      this.sended = true;

      const req = new XMLHttpRequest();

      const submits = this.getSubmits();

      submits.forEach(s => s.set('pending'));

      const cbsBefore = this.callbacks.beforeRequest;

      cbsBefore.length ? cbsBefore.forEach(cb => cb(...args)) : null;

      const getCallbacksAfter = () => this.callbacks.afterRequest;
      const getCallbacksFail = () => this.callbacks.failRequest;

      req.addEventListener("load", function(...args) {
        const cbs = getCallbacksAfter();

        cbs.length ? cbs.forEach(cb => cb.bind(this)(...args)) : null;

        submits.forEach(s => s.set('success'));

        return;
      });

      req.addEventListener("error", (...args) => {

        submits.forEach(s => s.set('fail'));

        this.sended = false;

        return;
      });

      req.open('POST', this.action);

      req.send( this.getFormData() );

      return this;
    }

    getSubmits() {
      return this.forms.reduce((acc, { submits }) => [...acc, ...submits], []);
    }

    on(name, fn) {
      if(!Object.keys(this.callbacks).includes(name)) throw new Error('FormsRegister: dont have such event');

      const callbacks = [ ...this.callbacks[name], fn ];

      this.callbacks[name] = callbacks;

      return this;
    }

    add(form) {
      if(!(form instanceof HTMLFormElement)) throw new Error('FormsRegister: passed invalid form element');

      const submits = Array.from(form.querySelectorAll('[type="submit"]'));

      const meta = {
        instance: form,
        submits: submits.length ? submits.map(s => new FormSubmit(s)) : null,
      }

      meta.submits.forEach(s => s.onClick((ev) => {
        if(!form.checkValidity()) return;

        ev.preventDefault();

        this.sendRequest(s, form, meta);

        return;
      }));


      this.forms = [ ...this.forms, meta ];

      return this;
    }
  }

  const forms = Array.from(document.forms).filter(f => f.hasAttribute('data-form'));
  const action = forms.find(() => true).getAttribute('action');

  const reg = new FormsRegister(action, forms);
  const submits = reg.getSubmits();


  submits.forEach(s => s.on('success', (submit) => {
    submit.instance.classList.remove("form__submit--pending");
    submit.instance.classList.add("form__submit--disabled");

    submit.instance.disabled = true;
  }));

  submits.forEach(s => s.on('pending', (submit) => {
    submit.instance.classList.add("form__submit--pending");
  }));

  submits.forEach(s => s.on('fail', (submit) => {
    submit.instance.classList.remove("form__submit--pending");
  }));

  reg.on('afterRequest', function() {

  })

})()
