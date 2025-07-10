import SpotlightCard from "@/components/SpotlightCard";
import { FaChartPie, FaHandHoldingDollar, FaUserGroup } from "react-icons/fa6";
import { HiWallet, HiCurrencyDollar } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import "./Hero.css";

function Features() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="features-title">
          Powerful Features
        </h2>
        <p className="features-subtitle">
          Everything you need to split expenses effortlessly with friends and family
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <FaUserGroup size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Group Expenses</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Create groups for roommates, trips, or events to keep all shared expenses organized in one place.
            </p>
          </div>
        </SpotlightCard>

        {/* Feature 2 */}
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <HiWallet size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Smart Settlements</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Automatically calculates who owes whom and suggests the most efficient way to settle up.
            </p>
          </div>
        </SpotlightCard>

        {/* Feature 3 */}
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <FaChartPie size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Expense Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Visual breakdowns of your spending patterns with customizable categories and reports.
            </p>
          </div>
        </SpotlightCard>

        {/* Feature 4 */}
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <FaHandHoldingDollar size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Multiple Split Types</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Choose from equal splits, percentages, exact amounts, or custom ratios for each expense.
            </p>
          </div>
        </SpotlightCard>

        {/* Feature 5 */}
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <IoMdNotifications size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Real-time Updates</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Instant notifications when expenses are added or modified, keeping everyone in sync.
            </p>
          </div>
        </SpotlightCard>

        {/* Feature 6 */}
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <HiCurrencyDollar size={24} className="text-[rgb(16,255,4)] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Multi-Currency</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Supports multiple currencies with automatic conversion for international groups.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

export default Features;
