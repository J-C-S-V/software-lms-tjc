import { notFound } from 'next/navigation';
import { courses, getLesson } from '@/features/dashboard/data';

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      course: course.slug,
      lesson: lesson.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course, lesson } = await params;
  const found = getLesson(course, lesson);
  if (!found) return {};
  return { title: `${found.lesson.title} · ${found.course.label}` };
}

export default async function LessonPage({
  params
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const found = getLesson(courseSlug, lessonSlug);

  if (!found) notFound();

  const { course, lesson } = found;

  return (
    <article className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-violet-600 uppercase tracking-wide">
          {course.label}
        </p>
        <h1 className="text-3xl font-bold text-zinc-900">{lesson.title}</h1>
      </header>

      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-sm">
        {lesson.videoUrl ? (
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
            Video coming soon
          </div>
        )}
      </div>

      <section className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900">Summary</h2>
        <p className="text-zinc-700 leading-relaxed whitespace-pre-line">
          {lesson.summary ?? 'Summary coming soon.'}
        </p>
      </section>
    </article>
  );
}
