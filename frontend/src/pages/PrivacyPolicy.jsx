import '@/styles/PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <article className="privacy-policy">
      <header className="privacy-policy__header">
        <p className="privacy-policy__eyebrow">Your privacy matters</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-policy__date">Effective September 20, 2026</p>
      </header>

      <p>
        This policy explains how America with Anastasiia ("we," "us," or "our")
        collects, uses, and shares information when you visit this website or contact us.
      </p>

      <section>
        <h2>Information we collect</h2>
        <p>We may collect information that you choose to provide, including:</p>
        <ul>
          <li>Your name, email address, and phone number.</li>
          <li>Your preferred language and messaging platform.</li>
          <li>The service you are interested in and the contents of your message.</li>
          <li>Administrator account information, where applicable.</li>
        </ul>
        <p>
          Our hosting providers may also automatically receive basic technical information,
          such as your IP address, browser type, device information, and request logs.
        </p>
      </section>

      <section>
        <h2>How we use information</h2>
        <p>We use information to:</p>
        <ul>
          <li>Respond to inquiries and communicate about requested services.</li>
          <li>Operate, protect, troubleshoot, and improve the website.</li>
          <li>Maintain administrator access and website content.</li>
          <li>Comply with legal obligations and prevent misuse or fraud.</li>
        </ul>
      </section>

      <section>
        <h2>How information is shared</h2>
        <p>
          Contact-form submissions are processed by Web3Forms so they can be delivered to
          us. Information may also be handled by service providers that host or support the
          website. We may disclose information when required by law, to protect rights or
          safety, or as part of a business transfer. We do not sell personal information.
        </p>
      </section>

      <section>
        <h2>Data retention and security</h2>
        <p>
          We keep personal information only as long as reasonably needed for the purposes
          described above, including legal and recordkeeping needs. We use reasonable
          safeguards, but no website, transmission, or storage system can be guaranteed to
          be completely secure.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You may ask us to access, correct, or delete personal information you previously
          submitted, subject to legal and operational requirements. Please use the Contact
          Us page to make a request. We may need to verify your identity before responding.
        </p>
      </section>

      <section>
        <h2>Sensitive information and children</h2>
        <p>
          Please do not send Social Security numbers, passport numbers, financial account
          details, or other highly sensitive documents through the general contact form.
          This website is not directed to children under 13, and we do not knowingly collect
          personal information from them through the website.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The effective date at the top of this
          page will show when it was last revised.
        </p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>
          If you have questions about this policy or how your information is handled, please
          contact us through the Contact Us page.
        </p>
      </section>
    </article>
  );
}
