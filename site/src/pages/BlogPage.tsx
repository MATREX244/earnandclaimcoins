import InfoLayout from '../components/InfoLayout';

export default function BlogPage() {
  const posts = [
    { date: 'June 07, 2026', title: 'Top 5 High-Paying Faucets to Watch This Month', excerpt: 'Discover which platforms are offering the best rewards and bonuses for active users in June.' },
    { date: 'June 05, 2026', title: 'How to Maximize Your Passive Income with Cloud Mining', excerpt: 'A comprehensive guide on setting up your first passive crypto stream with zero upfront costs.' },
    { date: 'June 03, 2026', title: 'The Rise of Micro-Wallets: Why FaucetPay is Essential', excerpt: 'Learn why micro-wallets are the backbone of the faucet industry and how to use them safely.' },
    { date: 'June 01, 2026', title: 'Bitcoin Price Trends and Their Impact on Faucet Payouts', excerpt: 'Understanding the relationship between market volatility and the amount of satoshis you can claim.' },
    { date: 'May 28, 2026', title: 'New PTC Sites: Are They Worth Your Time?', excerpt: 'We review the latest Paid-To-Click platforms to see which ones are legitimate and which to avoid.' },
    { date: 'May 25, 2026', title: 'Security Tips: How to Protect Your Crypto Earnings', excerpt: 'Essential practices to keep your micro-wallet and personal wallet safe from common online threats.' },
    { date: 'May 22, 2026', title: 'The Future of Free Crypto: What to Expect in Late 2026', excerpt: 'An analysis of where the free cryptocurrency ecosystem is heading and how to stay ahead.' },
    { date: 'May 19, 2026', title: 'Referral Programs: Turning Your Claims into a Network', excerpt: 'Strategies for building a robust referral network to multiply your daily crypto earnings.' },
    { date: 'May 16, 2026', title: 'Best Practices for Fast Captcha Solving', excerpt: 'Tips and tools to help you navigate faucet security checks more efficiently and save time.' },
    { date: 'May 13, 2026', title: 'Comparing Ethereum and Solana Faucets: Which is Better?', excerpt: 'A detailed comparison of rewards and network fees for the two most popular altcoin faucets.' }
  ];

  return (
    <InfoLayout title="Crypto Earning Blog">
      <p className="mb-10 text-gray-600">
        Stay updated with the latest news, guides, and reviews from the world of free cryptocurrency earning.
      </p>
      
      <div className="space-y-8">
        {posts.map((post, idx) => (
          <article key={idx} className="border-b border-gray-100 pb-8 last:border-0">
            <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">{post.date}</span>
            <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 hover:text-purple-600 cursor-pointer transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-500 leading-relaxed">
              {post.excerpt}
            </p>
            <button className="mt-4 text-sm font-bold text-purple-600 hover:underline">Read more →</button>
          </article>
        ))}
      </div>
    </InfoLayout>
  );
}
