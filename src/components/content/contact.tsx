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
          Let's create something! Fill out the form below for prints and other inquiries.
        </p>
        <NetlifyForm name='contact'
          children={({ loading, error, success }) => (
            <div>
              {loading &&
                <p className={style.text}>Loading...</p>
              }
              {error &&
                <p className={style.text}>Your submission was not sent. Please try again later.</p>
              }
              {success &&
                <p className={style.text}>Thank you for the submission!</p>
              }
              {!loading && !success &&
                <div>
                  <p>
                    <label>Name <input type="text" name="name" required /></label>
                  </p>
                  <p>
                    <label>Email <input type="email" name="email" required /></label>
                  </p>
                  <p>
                    <label>Subject <textarea name="subject" required /></label>
                  </p>
                  <p>
                    <label>Message <textarea name="message" required /></label>
                  </p>
                  <button>Submit</button>
                </div>
              }
            </div>
          )}
        />
        <p className={style.text}>
          Or, message me on <InstaLink style={style.link} />.
        </p>
      </div>
    );
  }
}

export const ContactPageDefinitions: AnalyticsContentProps = {
  pageTitle: 'contact',
  pagePath: '/contact'
}

export default withAnalytics(Contact, ContactPageDefinitions);
