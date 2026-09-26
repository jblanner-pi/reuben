export const starIcons = {
  full: 'https://images.meredith.com/Reuben/Newsletter_Design_System/Images/2023/Reuben_FullStar_Icon.png',
  half: 'https://images.meredith.com/Reuben/Newsletter_Design_System/Images/2023/Reuben_HalfStar_Icon.png',
  empty: 'https://images.meredith.com/Reuben/Newsletter_Design_System/Images/2023/Reuben_EmptyStar_Icon.png',
}

export const logo = {
  src: 'https://images.meredith.com/Reuben/Newsletter_Design_System/Images/2023/Reuben_Logo.png',
  href: 'https://example.com/',
  alt: 'Reuben',
  width: 120,
}

export function post(index, overrides = {}) {
  const base = {
    headline: `Test recipe ${index}: a useful headline that can wrap safely`,
    href: `https://example.com/recipes/${index}?utm_source=email`,
    image: {
      src: `https://placehold.co/1304x870/png?text=Recipe+${index}`,
      alt: `Finished test recipe ${index}`,
    },
    moniker: index % 2 ? 'Exclusive' : null,
    copy: 'Production-like supporting copy verifies wrapping, spacing, and fallback typography across email clients.',
    rating: { value: index === 3 ? 3.5 : 4.5, icons: starIcons },
    links: [
      { label: 'Read the recipe notes', href: `https://example.com/recipes/${index}/notes?utm_source=email` },
    ],
    cta: {
      label: 'View recipe',
      href: `https://example.com/recipes/${index}?utm_source=email&utm_medium=cta`,
      style: 'filled',
      width: 'fixed',
    },
  }
  return { ...base, ...overrides }
}

export const threeLinks = [
  { label: 'Quick dinners', href: 'https://example.com/quick-dinners?utm_source=email' },
  { label: 'Seasonal recipes', href: 'https://example.com/seasonal?utm_source=email' },
  { label: 'Cooking guides', href: 'https://example.com/guides?utm_source=email' },
]
