# Component Map: Pages → UI Primitives

This file maps the app's top-level pages to the primary UI primitives they use. Use this as a quick reference when adding features or refactoring UI primitives.

## Entry
- Entry / bootstrap: [src/main.tsx](src/main.tsx#L1)
- App / routing: [src/app/App.tsx](src/app/App.tsx#L1)

## Pages (file → component)
- [src/app/components/HomePage.tsx](src/app/components/HomePage.tsx#L1) — HomePage
- [src/app/components/ProductDetailPage.tsx](src/app/components/ProductDetailPage.tsx#L1) — ProductDetailPage
- [src/app/components/CartPage.tsx](src/app/components/CartPage.tsx#L1) — CartPage
- [src/app/components/CheckoutPage.tsx](src/app/components/CheckoutPage.tsx#L1) — CheckoutPage
- [src/app/components/OrdersPage.tsx](src/app/components/OrdersPage.tsx#L1) — OrdersPage
- [src/app/components/OrderDetailPage.tsx](src/app/components/OrderDetailPage.tsx#L1) — OrderDetailPage
- [src/app/components/OrderSuccessPage.tsx](src/app/components/OrderSuccessPage.tsx#L1) — OrderSuccessPage
- [src/app/components/ProfilePage.tsx](src/app/components/ProfilePage.tsx#L1) — ProfilePage
- [src/app/components/EditProfilePage.tsx](src/app/components/EditProfilePage.tsx#L1) — EditProfilePage
- [src/app/components/AddressesPage.tsx](src/app/components/AddressesPage.tsx#L1) — AddressesPage
- [src/app/components/AddAddressPage.tsx](src/app/components/AddAddressPage.tsx#L1) — AddAddressPage
- [src/app/components/LoginPage.tsx](src/app/components/LoginPage.tsx#L1) — LoginPage
- [src/app/components/OnboardingPage.tsx](src/app/components/OnboardingPage.tsx#L1) — OnboardingPage
- [src/app/components/SearchPage.tsx](src/app/components/SearchPage.tsx#L1) — SearchPage
- [src/app/components/CategoriesPage.tsx](src/app/components/CategoriesPage.tsx#L1) — CategoriesPage
- [src/app/components/WishlistPage.tsx](src/app/components/WishlistPage.tsx#L1) — WishlistPage
- [src/app/components/SettingsPage.tsx](src/app/components/SettingsPage.tsx#L1) — SettingsPage
- [src/app/components/NotificationsPage.tsx](src/app/components/NotificationsPage.tsx#L1) — NotificationsPage
- [src/app/components/LiveChat.tsx](src/app/components/LiveChat.tsx#L1) — LiveChat
- [src/app/components/DesktopHeader.tsx](src/app/components/DesktopHeader.tsx#L1) — Header / Navigation

## UI Primitives (file → primitive)
- [src/app/components/ui/button.tsx](src/app/components/ui/button.tsx#L1) — Button
- [src/app/components/ui/input.tsx](src/app/components/ui/input.tsx#L1) — Input
- [src/app/components/ui/input-otp.tsx](src/app/components/ui/input-otp.tsx#L1) — Input OTP
- [src/app/components/ui/select.tsx](src/app/components/ui/select.tsx#L1) — Select
- [src/app/components/ui/form.tsx](src/app/components/ui/form.tsx#L1) — Form
- [src/app/components/ui/card.tsx](src/app/components/ui/card.tsx#L1) — Card
- [src/app/components/ui/table.tsx](src/app/components/ui/table.tsx#L1) — Table
- [src/app/components/ui/pagination.tsx](src/app/components/ui/pagination.tsx#L1) — Pagination
- [src/app/components/ui/tabs.tsx](src/app/components/ui/tabs.tsx#L1) — Tabs
- [src/app/components/ui/carousel.tsx](src/app/components/ui/carousel.tsx#L1) — Carousel
- [src/app/components/ui/dialog.tsx](src/app/components/ui/dialog.tsx#L1) — Dialog
- [src/app/components/ui/drawer.tsx](src/app/components/ui/drawer.tsx#L1) — Drawer
- [src/app/components/ui/popover.tsx](src/app/components/ui/popover.tsx#L1) — Popover
- [src/app/components/ui/tooltip.tsx](src/app/components/ui/tooltip.tsx#L1) — Tooltip
- [src/app/components/ui/avatar.tsx](src/app/components/ui/avatar.tsx#L1) — Avatar
- [src/app/components/ui/badge.tsx](src/app/components/ui/badge.tsx#L1) — Badge
- [src/app/components/ui/menubar.tsx](src/app/components/ui/menubar.tsx#L1) — Menubar / Navigation
- [src/app/components/ui/breadcrumb.tsx](src/app/components/ui/breadcrumb.tsx#L1) — Breadcrumb
- [src/app/components/ui/skeleton.tsx](src/app/components/ui/skeleton.tsx#L1) — Skeleton
- [src/app/components/ui/progress.tsx](src/app/components/ui/progress.tsx#L1) — Progress
- [src/app/components/ui/switch.tsx](src/app/components/ui/switch.tsx#L1) — Switch
- [src/app/components/ui/checkbox.tsx](src/app/components/ui/checkbox.tsx#L1) — Checkbox
- [src/app/components/ui/radio-group.tsx](src/app/components/ui/radio-group.tsx#L1) — Radio Group
- [src/app/components/ui/toggle-group.tsx](src/app/components/ui/toggle-group.tsx#L1) — Toggle Group

## Contexts & Services
- [src/app/contexts/LanguageContext.tsx](src/app/contexts/LanguageContext.tsx#L1) — Language context
- [src/app/contexts/WishlistContext.tsx](src/app/contexts/WishlistContext.tsx#L1) — Wishlist context
- [src/app/services/productApi.ts](src/app/services/productApi.ts#L1) — Product API service

## Notes
- This map highlights primary primitives used by each page; pages often use additional small helpers and shared hooks (see `src/app/ui/` for utilities).
- For a visual diagram, see [COMPONENT_DIAGRAM.md](COMPONENT_DIAGRAM.md#L1).

If you want this exported to `README.md` or rendered as SVG, tell me which and I'll add it.  