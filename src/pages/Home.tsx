import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { Chat } from '../components/chat';
import { Exam } from '../components/exam';
import { generateQuestions } from '../services/llm';

interface Question {
  id: string;
  text: string;
  options: string[];
  tip: string;
  answer: string;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const generatedQuestions = await generateQuestions();
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <main className="h-screen p-4 flex gap-4">
      <Sidebar />
      <div className="flex-1">
        <Chat />
      </div>
      <div className="flex-1">
      {loading ? (
          <div className="flex justify-center items-center h-full bg-zinc-900 rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
          </div>
        ) : (
        <Exam questions={questions} />
      )}
      </div>
    </main>
  );
}

