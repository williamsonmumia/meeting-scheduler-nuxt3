
export const dashboardRoutes = [
  {
    title: "Meeting Type",
    icon: "heroicons:briefcase",
    link: "/meeting-type",
  },
  {
    title: "Scheduled",
    icon: "heroicons:calendar",
    link: "/scheduled",
  },
  {
    title: "Availability",
    icon: "heroicons:clock",
    link: "/availability",
  },
];

export const profileMenuOptions = [
  {
    title: "Profile",
    icon: "/my-icons/profile.svg",
    link: "/businesscheck/profile", // URL for the Profile page
  },
  {
    title: "Billing",
    icon: "/my-icons/wallet.svg",
    link: "/dashboard/billing", // URL for the Billing page
  },
  {
    title: "Settings",
    icon: "/my-icons/settings.svg",
    link: "/dashboard/settings", // URL for the Settings page
  },
  { divider: true }, // Divider (no URL needed)
  {
    title: "Logout",
    icon: "/my-icons/logout.svg",
    link: "/api/logout", // URL for the Logout action 
  },
];
