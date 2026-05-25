import { IconHTML, IconCSS, IconJS, IconIntroduction } from '@/assets/svgs';

export const sections = [
  {
    label: 'Introduction',
    icon: <IconIntroduction />,
    items: ['What is web development?', 'Frontend vs Backend', 'Tools of the trade']
  },
  {
    label: 'HTML',
    icon: <IconHTML />,
    items: [
      'Introduction to HTML',
      'How browsers render pages',
      'HTML document structure',
      'Elements, attributes, and tags',
      'Image tag',
      'Document Object Model (DOM)',
      'Metadata',
      'Video, audio, iframe',
      'The canvas element',
      'Forms',
      'Tables',
      'Lists',
      'strong, em',
      'block, inline-block and inline',
      'anchor tag',
      'ARIA roles, labels, and live regions',
      'HTML performance: lazy loading, preload, preconnect'
    ]
  },
  {
    label: 'CSS',
    icon: <IconCSS />,
    items: ['CSS syntax & selectors', 'Box model', 'Flexbox & Grid']
  },
  {
    label: 'JavaScript',
    icon: <IconJS />,
    items: ['Variables & data types', 'Functions & scope', 'DOM manipulation']
  },
  {
    label: 'Development with AI',
    icon: <span className="text-lg">🤖</span>,
    items: ['AI tools for programmers', 'Best practices', 'Ethical considerations']
  },
  {
    label: 'Job Search',
    icon: <span className="text-lg">💼</span>,
    items: ['Resume & cover letter', 'LinkedIn profile', 'Interview prep']
  }
];
