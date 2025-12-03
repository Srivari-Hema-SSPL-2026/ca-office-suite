import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle,
  faChevronDown,
  faChevronUp,
  faEnvelope,
  faPhone,
  faBook,
  faLifeRing,
} from '@fortawesome/free-solid-svg-icons';
import './Help.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I add a new client?',
    answer:
      'Navigate to Client Control from the main menu, then click on the "Add New Client" button. Fill in the required client details including name, PAN, contact information, and other relevant details. Click Save to add the client to your portfolio.',
  },
  {
    question: 'How do I track task deadlines?',
    answer:
      'The Tasks Management section provides a comprehensive view of all tasks with their due dates. You can filter tasks by status, type, or priority. Overdue tasks are highlighted in red, and pending tasks are shown in yellow. The Home dashboard also shows upcoming deadlines.',
  },
  {
    question: 'Can I assign tasks to team members?',
    answer:
      'Yes, when creating or editing a task, you can assign it to any team member. The assignee will be notified and the task will appear in their dashboard. You can also filter tasks by assignee to see workload distribution.',
  },
  {
    question: 'How do I generate reports?',
    answer:
      'Reports can be generated from various sections. Client reports are available in Client Control, and task completion reports can be found in Tasks Management. Analytics and detailed reports will be available in future updates.',
  },
  {
    question: 'What types of compliance tasks are supported?',
    answer:
      'The system supports various compliance types including GST returns, Income Tax Returns (ITR), TDS filings, Audit tasks, ROC filings, and other custom task types. Each type has specific fields and workflows tailored to the compliance requirement.',
  },
  {
    question: 'How secure is my client data?',
    answer:
      'We take data security seriously. All data is encrypted in transit and at rest. Access is controlled through role-based permissions, and all actions are logged for audit purposes. Regular security updates are applied to protect your data.',
  },
];

export function Help() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" />
        <h1>Help & Support</h1>
        <p>Find answers to common questions and get support</p>
      </div>

      <div className="help-content">
        <section className="help-section">
          <h2>
            <FontAwesomeIcon icon={faBook} />
            Frequently Asked Questions
          </h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${expandedIndex === index ? 'expanded' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={expandedIndex === index}
                >
                  <span>{faq.question}</span>
                  <FontAwesomeIcon
                    icon={expandedIndex === index ? faChevronUp : faChevronDown}
                  />
                </button>
                {expandedIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="help-section" id="contact">
          <h2>
            <FontAwesomeIcon icon={faLifeRing} />
            Contact Support
          </h2>

          <div className="contact-cards">
            <div className="contact-card">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <h3>Email Support</h3>
              <p>Send us an email and we'll respond within 24 hours.</p>
              <a href="mailto:support@caoffice.com" className="contact-link">
                support@caoffice.com
              </a>
            </div>

            <div className="contact-card">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <h3>Phone Support</h3>
              <p>Available Monday to Friday, 9 AM to 6 PM IST.</p>
              <a href="tel:+911234567890" className="contact-link">
                +91 1234 567 890
              </a>
            </div>
          </div>
        </section>

        <section className="help-section" id="privacy">
          <h2>Privacy Policy</h2>
          <div className="policy-content">
            <p>
              We are committed to protecting your privacy. This privacy policy explains how we
              collect, use, and safeguard your personal information when you use CA Office Suite.
            </p>
            <p>
              We collect information you provide directly, such as account details and client
              data. This information is used solely for providing our services and is never
              shared with third parties without your consent.
            </p>
            <p>
              For detailed information about our privacy practices, please contact our support
              team.
            </p>
          </div>
        </section>

        <section className="help-section" id="terms">
          <h2>Terms of Service</h2>
          <div className="policy-content">
            <p>
              By using CA Office Suite, you agree to these terms of service. Our platform is
              designed to help chartered accountants and tax professionals manage their practice
              efficiently.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account and for
              all activities that occur under your account. You agree to use the service only
              for lawful purposes.
            </p>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the
              service constitutes acceptance of any changes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
