'use client';

import InstaLink from '../components/instalink';
import NetlifyForm from '../components/netlifyform';
// import style from './style.module.scss';

export default function Contact() {
  return (
    <main>
      <p>Let&apos;s create something!</p>
      <p>
        Please fill out the form below for prints and other inquiries. Or, message me on{' '}
        <InstaLink text={'Instagram'} />.
      </p>
      <NetlifyForm name="contact" action="/">
        {({ loading, error, success }) => (
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Your submission was not sent. Please try again later.</p>}
            {success && <p>Thank you for the submission!</p>}
            {!loading && !success && (
              <div>
                <div>
                  <label>Name *</label>
                  <span>
                    <div>
                      <div>
                        <input type="text" id="first_name" name="first_name" required />
                        <label htmlFor="first_name">First name</label>
                      </div>
                      <div>
                        <input type="text" id="last_name" name="last_name" required />
                        <label htmlFor="last_name">Last name</label>
                      </div>
                    </div>
                  </span>
                </div>
                <div>
                  <label htmlFor="email">Email *</label>
                  <span>
                    <input type="email" id="email" name="email" required />
                  </span>
                </div>
                <div>
                  <label htmlFor="subject">Subject *</label>
                  <span>
                    <input type="text" id="subject" name="subject" required />
                  </span>
                </div>
                <div>
                  <label htmlFor="message">Message *</label>
                  <span>
                    <textarea id="message" name="message" rows={3} required />
                  </span>
                </div>
                <button>send message</button>
              </div>
            )}
          </div>
        )}
      </NetlifyForm>
    </main>
  );
}
