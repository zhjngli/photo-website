import React from "react";
import NetlifyForm from "react-netlify-form";
import withAnalytics from '../analyticsContent';
import AnalyticsContentProps from "../analyticsContent/types";
import InstaLink from '../instaLink';
import style from './style.module.scss';

class Contact extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <p className={style.text}>
          Let's create something!
        </p>
        <p className={style.text}>
          Please fill out the form below for prints and other inquiries. Or, message me on <InstaLink style={style.link} />.
        </p>
        <NetlifyForm
          name='contact'
          recaptcha={{
            sitekey: '6Ld24y8aAAAAACyyJM8H2wR0oAQnFqwfcSbICfQ_',
            size: 'invisible'
          }}
          children={({ loading, error, recaptchaError, success, recaptcha }) => (
            <div className={style.formContainer}>
              {loading &&
                <p className={style.text}>Loading...</p>
              }
              {error &&
                <p className={style.text}>Your submission was not sent. Please try again later.</p>
              }
              {recaptchaError &&
                <p className={style.text}>Recaptcha did not match. Please make sure the box is checked.</p>
              }
              {success &&
                <p className={style.text}>Thank you for the submission!</p>
              }
              {!loading && !success &&
                <div className={style.text}>
                  <div className={style.formFieldsContainer}>
                    <label>Name *</label>
                    <span>
                      <div className={style.nameContainer}>
                        <div className={style.firstNameContainer}>
                          <input type="text" id="first_name" name="first_name" required />
                          <label htmlFor="first_name">First name</label>
                        </div>
                        <div className={style.lastNameContainer}>
                          <input type="text" id="last_name" name="last_name" required />
                          <label htmlFor="last_name">Last name</label>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className={style.formFieldsContainer}>
                    <label htmlFor="email">Email *</label>
                    <span>
                      <input type="email" id="email" name="email" required />
                    </span>
                  </div>
                  <div className={style.formFieldsContainer}>
                    <label htmlFor="subject">Subject *</label>
                    <span>
                      <input type="text" id="subject" name="subject" required />
                    </span>
                  </div>
                  <div className={style.formFieldsContainer}>
                    <label htmlFor="message">Message *</label>
                    <span>
                      <textarea id="message" name="message" rows={3} required />
                    </span>
                  </div>
                  <div className={style.recaptcha}>
                    This site is protected by reCAPTCHA and the Google <a className={style.link} target="_blank" href="https://policies.google.com/privacy">Privacy Policy</a> and <a className={style.link} target="_blank" href="https://policies.google.com/terms">Terms of Service</a> apply.
                  </div>
                  <button className={style.submitButton}>send message</button>
                </div>
              }
              {recaptcha}
            </div>
          )}
        />
      </div>
    );
  }
}

export const ContactPageDefinitions: AnalyticsContentProps = {
  pageTitle: 'contact',
  pagePath: '/contact'
}

export default withAnalytics(Contact, ContactPageDefinitions);
