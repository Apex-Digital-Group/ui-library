import React, { useState } from 'react';
import ReferHero from '../components/refer/ReferHero';
import ReferLinkCard from '../components/refer/ReferLinkCard';
import ReferStats from '../components/refer/ReferStats';
import ReferHowItWorks from '../components/refer/ReferHowItWorks';
import ReferTable from '../components/refer/ReferTable';
import ReferTokenWallet from '../components/refer/ReferTokenWallet';
import ReferRewardWallet from '../components/refer/ReferRewardWallet';
import ReferTierProgress from '../components/refer/ReferTierProgress';
import ReferFounderDiscount from '../components/refer/ReferFounderDiscount';
import ReferTokenRules from '../components/refer/ReferTokenRules';
import ReferInvestorCard from '../components/refer/ReferInvestorCard';
import ReferLegalFooter from '../components/refer/ReferLegalFooter';

export default function ReferAFriend() {
  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <ReferHero />
        <ReferLinkCard />
        <ReferStats />
        <ReferHowItWorks />
        <ReferTable />
        <ReferTokenWallet />
        <ReferRewardWallet />
        <ReferTierProgress />
        <ReferFounderDiscount />
        <ReferTokenRules />
        <ReferInvestorCard />
        <ReferLegalFooter />
      </div>
    </div>
  );
}