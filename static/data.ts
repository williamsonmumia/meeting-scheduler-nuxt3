export const landingPageData = {
  name: "Landing Page with Components",
  fields: {
    seo: { title: "Trello Clone", description: "An awesome trello clone" },
    navMenu: {
      actionItems: [
        {
          label: "Log in",
          url: "/api/login",
          metadata: {
            id: "login",
          },
        },
        {
          label: "Sign Up",
          url: "/api/register",
          metadata: {
            id: "signup",
          },
        },
      ],
    },
    body: [
      {
        type: "hero",
        slug: "hero",
        fields: {
          headline: "Easy scheduling ahead",
          subheadline:
            "aligno simplifies meeting scheduling by letting you set availability and share booking links.",
          image: "scheduleimg.png",
          button_label: "Get Started",
          button_url: "#",
          scroll_anchor_id: "home",
        },
      },
    ],
  },
};

