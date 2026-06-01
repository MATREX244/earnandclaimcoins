import InfoLayout from '../components/InfoLayout';

export default function PrivacyPage() {
  return (
    <InfoLayout title="Privacy Policy">
      <p className="text-sm text-gray-400 italic">Last Updated: June 1, 2026</p>
      
      <p>
        At <strong>Earn and Claim Coins Free</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
      <p>
        We do not require user registration. However, we may collect standard log files which include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Cookies and Web Beacons</h2>
      <p>
        Like any other website, we use 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Third Party Privacy Policies</h2>
      <p>
        Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers or websites for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Consent</h2>
      <p>
        By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
      </p>
    </InfoLayout>
  );
}
