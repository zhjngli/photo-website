import React, { FormEvent } from 'react';
import Recaptcha, { ReCAPTCHAProps } from 'react-google-recaptcha';

type NetlifyFormProps = {
  name: string;
  action: string | undefined;
  honeypotName?: string;
  recaptcha: ReCAPTCHAProps;
  children: (state: NetlifyFormState) => React.ReactElement;
};

type NetlifyFormState = {
  error: boolean;
  loading: boolean;
  success: boolean;
  recaptcha?: React.ReactElement | undefined;
  recaptchaError?: boolean | undefined;
  recaptchaValue?: string | null;
};

class NetlifyForm extends React.Component<NetlifyFormProps, NetlifyFormState> {
  static defaultProps: NetlifyFormProps;
  form: HTMLFormElement | undefined;
  honeypot: HTMLInputElement | undefined;
  recaptchaEl: Recaptcha | undefined;

  constructor(props: NetlifyFormProps) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      success: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
    this.awaitRecaptchaValue = this.awaitRecaptchaValue.bind(this);
    this.process = this.process.bind(this);
  }

  async onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (this.honeypot?.value) return;

    if (this.props.recaptcha && this.props.recaptcha.size === `invisible`) {
      if (this.props.recaptcha.size === `invisible`) {
        try {
          const res = this.recaptchaEl?.execute();
          console.log(`reCAPTCHA response: ${res}`);
          return;
        } catch (err) {
          console.log(`reCAPTCHA execution error`);
          console.error(err);
          return this.setState({
            loading: false,
            error: false,
            success: false,
            recaptchaError: true
          });
        }
      }
    }

    await this.process();
  }

  async onSuccess(body: FormData): Promise<void> {
    this.setState({
      loading: false,
      success: !!body,
      error: false
    });
  }

  onRecaptchaChange(recaptchaValue: string | null): void {
    console.log(`Invisible reCAPTCHA value set`);
    this.setState({ recaptchaValue });
    if (this.props.recaptcha && this.props.recaptcha.size === `invisible`) {
      this.process();
    }
  }

  awaitRecaptchaValue(): Promise<void> {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (this.state.recaptchaValue) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  }

  async process(): Promise<void> {
    const body = new FormData(this.form);

    if (this.props.recaptcha) {
      if (!this.state.recaptchaValue) {
        console.error('reCAPTCHA value not set');
        return this.setState({
          loading: false,
          error: false,
          success: false,
          recaptchaError: true
        });
      }
      body.append(`g-recaptcha-response`, this.state.recaptchaValue);
    }

    this.setState({
      loading: true,
      error: false,
      success: false,
      recaptchaError: false
    });

    const action = this.props.action as RequestInfo;
    const { status } = await fetch(action, {
      method: `POST`,
      body
    });
    if (status !== 200) {
      console.error(`Status code: ${status}`);
      return this.setState({
        loading: false,
        error: true,
        success: false,
        recaptchaError: false
      });
    }
    this.onSuccess(body);
  }

  render(): React.ReactElement {
    const { name, action, honeypotName, recaptcha } = this.props;
    const dataAttrs: { [k: string]: string } = {
      'data-netlify': `true`
    };
    if (honeypotName) {
      dataAttrs[`data-netlify-honeypot`] = honeypotName;
    }
    if (recaptcha) {
      dataAttrs[`data-netlify-recaptcha`] = `true`;
    }
    return (
      <form
        ref={(e) => (this.form = e as HTMLFormElement)}
        onSubmit={this.onSubmit}
        name={name}
        action={action}
        {...dataAttrs}
      >
        <input type="hidden" name="form-name" value={name} />
        <input
          ref={(el) => (this.honeypot = el as HTMLInputElement)}
          type="text"
          name={honeypotName}
          style={{ display: `none` }}
        />
        {this.props.children({
          ...this.state,
          recaptcha: (
            <Recaptcha
              {...recaptcha}
              ref={(el) => (this.recaptchaEl = el as Recaptcha)}
              onChange={this.onRecaptchaChange}
            />
          )
        })}
      </form>
    );
  }
}

export default NetlifyForm;
