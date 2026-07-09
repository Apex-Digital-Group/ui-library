/**
 * Bond design-system library entry.
 *
 * Re-exports the shadcn primitives and domain components. Apps consume single
 * pieces — `import { Button } from '@bond/lib'` — and pull `@bond/lib/styles.css`
 * + `@bond/lib/typography.css` once at the app shell.
 *
 * Domain folders (feed, videos, photos, groups, agency, refer) export their
 * components directly; the modal grab-bag at the top level is exported by name.
 */

// shadcn primitives
export * from './components/ui/accordion'
export * from './components/ui/alert'
export * from './components/ui/alert-dialog'
export * from './components/ui/aspect-ratio'
export * from './components/ui/avatar'
export * from './components/ui/badge'
export * from './components/ui/breadcrumb'
export * from './components/ui/button'
export * from './components/ui/calendar'
export * from './components/ui/card'
export * from './components/ui/carousel'
export * from './components/ui/checkbox'
export * from './components/ui/collapsible'
export * from './components/ui/command'
export * from './components/ui/context-menu'
export * from './components/ui/dialog'
export * from './components/ui/drawer'
export * from './components/ui/dropdown-menu'
export * from './components/ui/form'
export * from './components/ui/hover-card'
export * from './components/ui/input'
export * from './components/ui/input-otp'
export * from './components/ui/label'
export * from './components/ui/menubar'
export * from './components/ui/navigation-menu'
export * from './components/ui/pagination'
export * from './components/ui/popover'
export * from './components/ui/progress'
export * from './components/ui/radio-group'
export * from './components/ui/resizable'
export * from './components/ui/scroll-area'
export * from './components/ui/select'
export * from './components/ui/separator'
export * from './components/ui/sheet'
export * from './components/ui/sidebar'
export * from './components/ui/skeleton'
export * from './components/ui/slider'
export * from './components/ui/sonner'
export * from './components/ui/switch'
export * from './components/ui/table'
export * from './components/ui/tabs'
export * from './components/ui/textarea'
export * from './components/ui/toast'
export * from './components/ui/toaster'
export * from './components/ui/toggle'
export * from './components/ui/toggle-group'
export * from './components/ui/tooltip'

// domain
export { default as PostCard } from './components/feed/PostCard'
export { default as SuggestedForYou } from './components/feed/SuggestedForYou'
export { default as LeftNav } from './components/feed/LeftNav'
export { default as SearchModal } from './components/feed/SearchModal'

// credits — full-width page + composable sub-components (all parameterized)
export { default as CreditsPage } from './components/credits/CreditsPage'
export { default as BuyCreditsPage, defaultPackages, defaultPricingAnchors, defaultPaymentMethods, priceForCredits } from './components/credits/BuyCreditsPage'
export { default as BuyCreditsFlow } from './components/credits/BuyCreditsFlow'
export { default as CreditPackageCard, resolvePackageBadge } from './components/credits/CreditPackageCard'
export { default as CreditBalanceCard } from './components/credits/CreditBalanceCard'
export { default as CreditStatsGrid, defaultCreditStats } from './components/credits/CreditStatsGrid'
export { default as CreditStatCard } from './components/credits/CreditStatCard'
export { default as PurchaseHistory, defaultCreditTransactions } from './components/credits/PurchaseHistory'
export { default as CreditFilters, defaultCreditFilters } from './components/credits/CreditFilters'
export { default as TransactionCard, TRANSACTION_TYPE_META } from './components/credits/TransactionCard'
export { default as CreditInfoNote } from './components/credits/CreditInfoNote'

// alerts — LiveGemini themed toasts + sweet alerts (configurable variant/accent/background)
// Aliased to Gemini* at the barrel to avoid colliding with the shadcn `Toast`
// primitive; the plain names are available via the @bond/lib/alerts/* subpaths.
export { default as GeminiToast } from './components/alerts/Toast'
export { default as GeminiToastStack } from './components/alerts/ToastStack'
export { default as SweetAlert } from './components/alerts/SweetAlert'
export { ALERT_VARIANTS } from './components/alerts/alertVariants'

export { default as VideoCard } from './components/videos/VideoCard'
export { default as FilterSidebar } from './components/videos/FilterSidebar'
export { default as PromoCard } from './components/videos/PromoCard'

export { default as PhotoCard } from './components/photos/PhotoCard'

export { default as GroupCard } from './components/groups/GroupCard'
export { default as GroupsLayout } from './components/groups/GroupsLayout'
export { default as StatusBadge } from './components/groups/StatusBadge'

// agency screens / panels
export { default as AgencySettingsScreen } from './components/agency/AgencySettingsScreen'
export { default as CreatorDetailDrawer } from './components/agency/CreatorDetailDrawer'
export { default as CreatorsScreen } from './components/agency/CreatorsScreen'
export { default as EarningsScreen } from './components/agency/EarningsScreen'
export { default as OverviewScreen } from './components/agency/OverviewScreen'
export { default as PayoutsScreen } from './components/agency/PayoutsScreen'
export { default as PromotionPanel } from './components/agency/PromotionPanel'
export { default as PromotionsScreen } from './components/agency/PromotionsScreen'

// refer
export { default as ReferFounderDiscount } from './components/refer/ReferFounderDiscount'
export { default as ReferHero } from './components/refer/ReferHero'
export { default as ReferHowItWorks } from './components/refer/ReferHowItWorks'
export { default as ReferInvestorCard } from './components/refer/ReferInvestorCard'
export { default as ReferLegalFooter } from './components/refer/ReferLegalFooter'
export { default as ReferLinkCard } from './components/refer/ReferLinkCard'
export { default as ReferRewardWallet } from './components/refer/ReferRewardWallet'
export { default as ReferStats } from './components/refer/ReferStats'
export { default as ReferTable } from './components/refer/ReferTable'
export { default as ReferTierProgress } from './components/refer/ReferTierProgress'
export { default as ReferTokenRules } from './components/refer/ReferTokenRules'
export { default as ReferTokenWallet } from './components/refer/ReferTokenWallet'

// top-level modals / layouts
export { default as AccountPendingModal } from './components/AccountPendingModal'
export { default as CreditsModal } from './components/CreditsModal'
export { default as GeminiAI } from './components/GeminiAI'
export { default as KycModal } from './components/KycModal'
export { default as PostDetailModal } from './components/PostDetailModal'
export { default as ProfileDropdown } from './components/ProfileDropdown'
export { default as ProtectedRoute } from './components/ProtectedRoute'
export { default as RegisterModal } from './components/RegisterModal'
export { default as SignInModal } from './components/SignInModal'
export { default as TransactionsModal } from './components/TransactionsModal'
export { default as TreatModal } from './components/TreatModal'
export { default as UnlockContentModal } from './components/UnlockContentModal'
export { default as UserNotRegisteredError } from './components/UserNotRegisteredError'
export { default as VoodooShopModal } from './components/VoodooShopModal'
export { default as WelcomeModal } from './components/WelcomeModal'
export { default as WithdrawModal } from './components/WithdrawModal'

// pages — full screen designs (no props; default-exported)
export { default as AgencyPage } from './pages/Agency'
export { default as CamHousePage } from './pages/CamHouse'
export { default as ChampionsPage } from './pages/Champions'
export { default as FeedPage } from './pages/Feed'
export { default as LiveCamsPage } from './pages/LiveCams'
export { default as BrowseGridPage } from './pages/BrowseGridPage'
export { liveItems, videoItems } from './data/browseItems'
export { default as PhotosPage } from './pages/Photos'
export { default as PinkBlondeLivePage } from './pages/PinkBlondeLive'
export { default as ProfilePage } from './pages/Profile'
export { default as VideosPage } from './pages/Videos'
export { default as WalletPage } from './pages/Wallet'
export { default as ReferAFriendPage } from './pages/ReferAFriend'

// group-management pages
export { default as GroupsPage } from './pages/Groups'
export { default as GroupAccountActivityPage } from './pages/GroupAccountActivity'
export { default as GroupActivityHistoryPage } from './pages/GroupActivityHistory'
export { default as GroupCommissionHistoryPage } from './pages/GroupCommissionHistory'
export { default as GroupCommissionManagementPage } from './pages/GroupCommissionManagement'
export { default as GroupCreateGroupPage } from './pages/GroupCreateGroup'
export { default as GroupCreatorEarningsPage } from './pages/GroupCreatorEarnings'
export { default as GroupDelegatedManagementPage } from './pages/GroupDelegatedManagement'
export { default as GroupJoinRequestsPage } from './pages/GroupJoinRequests'
export { default as GroupLeaveRequestsPage } from './pages/GroupLeaveRequests'
export { default as GroupMembersPage } from './pages/GroupMembers'
export { default as GroupMessengerPage } from './pages/GroupMessenger'
export { default as GroupMyGroupPage } from './pages/GroupMyGroup'
export { default as GroupNotificationsPage } from './pages/GroupNotifications'
export { default as GroupOwnerDashboardPage } from './pages/GroupOwnerDashboard'
export { default as GroupOwnerEarningsPage } from './pages/GroupOwnerEarnings'
export { default as GroupSettingsPage } from './pages/GroupSettings'

// creator profile — one parameterized template, fed by the creators dataset.
export { default as CreatorProfilePage } from './pages/CreatorProfile'
export { creators, creatorBySlug, suggestionsFor } from './data/creators'

// page-level fallback (carried from base44; relies on AuthContext + react-query)
export { default as PageNotFound } from './lib/PageNotFound'

// shared mock data (used by GroupCard + group management pages)
export {
  mockGroups,
  mockCreatorState,
  mockMembers,
  mockJoinRequests,
  mockTransactions,
  mockNotifications,
  mockActivityHistory,
} from './lib/groupsMockData'

// story
export { StoryCard } from './components/story/StoryCard'

// react-query client instance (apps can re-use the same defaults as base44)
export { queryClientInstance } from './lib/query-client'

// utils + auth context (so consumers can wrap their app)
export { cn } from './lib/utils'
export { createPageUrl } from './utils/index'
export { AuthContext, AuthProvider, useAuth } from './lib/AuthContext'
