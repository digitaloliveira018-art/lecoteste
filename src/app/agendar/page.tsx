import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookingQuiz } from '@/components/quiz/BookingQuiz';

export default function Agendar() {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <BookingQuiz />
        </div>
      </main>
      <Footer />
    </div>
  );
}
