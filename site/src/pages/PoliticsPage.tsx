import InfoLayout from '../components/InfoLayout';

export default function PoliticsPage() {
  return (
    <InfoLayout title="Our Policies & Disclaimer">
      <p>
        Transparency is a core value at <strong>Earn and Claim Coins Free</strong>. Below we outline our editorial and operational policies regarding the platforms we list.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Affiliate Disclosure</h2>
      <p>
        Some of the links on this website are affiliate links. This means if you click on the link and sign up for a service, we may receive an affiliate commission. This does not result in any additional cost to you. Our reviews and listings are based on our own research and community feedback, regardless of affiliate status.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Listing Criteria</h2>
      <p>
        We only list sites that have a proven track record of paying their users. If a site stops paying or becomes malicious, it is immediately removed from our directory. However, we cannot guarantee the future performance of any third-party platform.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Risk Warning</h2>
      <p>
        Cryptocurrency investments and activities carry inherent risks. You should never invest more time or money than you can afford to lose. We strongly recommend using unique passwords for every site and enabling Two-Factor Authentication (2FA) whenever possible.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">No Financial Advice</h2>
      <p>
        The content on this website is for informational and educational purposes only. It does not constitute financial, investment, or legal advice.
      </p>
    </InfoLayout>
  );
}
