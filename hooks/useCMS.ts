import { landingPageData } from "../static/data";

export const useCMS = () => {
  return landingPageData;
};

export const useHero = () => {
  const heroSection = useCMS().fields.body.find(item => item.type === 'hero');

  return {
    slug: heroSection?.slug,
    ...heroSection?.fields,
  }
}

export const useActionItems = () => useCMS().fields.navMenu.actionItems;