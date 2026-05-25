import { ReactNode } from 'react';
import { IconHTML, IconCSS, IconJS, IconIntroduction } from '@/assets/svgs';

export type Lesson = {
  slug: string;
  title: string;
  videoUrl?: string;
  summary?: string;
};

export type Course = {
  slug: string;
  label: string;
  icon: ReactNode;
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    slug: 'introduction',
    label: 'Introduction',
    icon: <IconIntroduction />,
    lessons: [
      { slug: 'what-is-web-development', title: 'What is web development?' },
      { slug: 'frontend-vs-backend', title: 'Frontend vs Backend' },
      { slug: 'tools-of-the-trade', title: 'Tools of the trade' }
    ]
  },
  {
    slug: 'html',
    label: 'HTML',
    icon: <IconHTML />,
    lessons: [
      {
        slug: 'introduction-to-html',
        title: 'Introduction to HTML',
        videoUrl: 'https://www.youtube.com/embed/uCTeGFN0MXM',
        summary:
          'HTML (HyperText Markup Language) is the foundational language of the web. In this lesson we cover what HTML is, what role it plays alongside CSS and JavaScript, and how a browser turns a plain text document into the pages you see every day.'
      },
      {
        slug: 'how-browsers-render-pages',
        title: 'How browsers render pages',
        videoUrl: 'https://www.youtube.com/embed/uCTeGFN0MXM'
      },
      { slug: 'html-document-structure', title: 'HTML document structure' },
      { slug: 'elements-attributes-and-tags', title: 'Elements, attributes, and tags' },
      { slug: 'image-tag', title: 'Image tag' },
      { slug: 'document-object-model', title: 'Document Object Model (DOM)' },
      { slug: 'metadata', title: 'Metadata' },
      { slug: 'video-audio-iframe', title: 'Video, audio, iframe' },
      { slug: 'the-canvas-element', title: 'The canvas element' },
      { slug: 'forms', title: 'Forms' },
      { slug: 'tables', title: 'Tables' },
      { slug: 'lists', title: 'Lists' },
      { slug: 'strong-em', title: 'strong, em' },
      { slug: 'block-inline-block-and-inline', title: 'block, inline-block and inline' },
      { slug: 'anchor-tag', title: 'anchor tag' },
      { slug: 'aria-roles-labels-and-live-regions', title: 'ARIA roles, labels, and live regions' },
      {
        slug: 'html-performance',
        title: 'HTML performance: lazy loading, preload, preconnect'
      }
    ]
  },
  {
    slug: 'css',
    label: 'CSS',
    icon: <IconCSS />,
    lessons: [
      { slug: 'css-syntax-and-selectors', title: 'CSS syntax & selectors' },
      { slug: 'box-model', title: 'Box model' },
      { slug: 'flexbox-and-grid', title: 'Flexbox & Grid' }
    ]
  },
  {
    slug: 'javascript',
    label: 'JavaScript',
    icon: <IconJS />,
    lessons: [
      { slug: 'variables-and-data-types', title: 'Variables & data types' },
      { slug: 'functions-and-scope', title: 'Functions & scope' },
      { slug: 'dom-manipulation', title: 'DOM manipulation' }
    ]
  },
  {
    slug: 'development-with-ai',
    label: 'Development with AI',
    icon: <span className="text-lg">🤖</span>,
    lessons: [
      { slug: 'ai-tools-for-programmers', title: 'AI tools for programmers' },
      { slug: 'best-practices', title: 'Best practices' },
      { slug: 'ethical-considerations', title: 'Ethical considerations' }
    ]
  },
  {
    slug: 'job-search',
    label: 'Job Search',
    icon: <span className="text-lg">💼</span>,
    lessons: [
      { slug: 'resume-and-cover-letter', title: 'Resume & cover letter' },
      { slug: 'linkedin-profile', title: 'LinkedIn profile' },
      { slug: 'interview-prep', title: 'Interview prep' }
    ]
  }
];

export function getLesson(courseSlug: string, lessonSlug: string) {
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course) return null;
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { course, lesson };
}
