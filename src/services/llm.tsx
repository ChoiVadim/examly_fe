const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

interface Question {
  id: string
  text: string
  options: string[]
  tip: string
	answer: string
}

export const fetchChatGPTResponse = async (message: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
				{ role: 'user', content: message },
			],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch response from ChatGPT');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export const generateQuestions = async (): Promise<Question[]> => {
	const output_example = `[
  {
    id: '1',
    text: 'What is the time complexity of the Bubble sort algorithm?',
    options: ['O(n^2)', 'O(n)', 'O(log n)', 'O(n log n)'],
    tip: 'This algorithm is also known as the Sinking Sort.',
		answer: 'O(n^2)'
  },
  {
    id: '2',
    text: 'What is the Big O notation for the Insertion sort algorithm?',
    options: ['O(n^2)', 'O(n)', 'O(log n)', 'O(n log n)'],
    tip: 'This algorithm is also known as the Straight Insertion Sort.',
		answer: 'O(n)'
  },
]
`;
	const prompt = `Your are an expert in algorithms and data structures.
	Generate a list of 10 sample questions and their answers in JSON format.
	The questions should be related to algorithms and data structures.
	Remember to include the options for each question.
	Remember to include the tip for each question.
	The tips and answer must to be right.

	The output should be in the following format:
	` + output_example;
	
	const response = await fetchChatGPTResponse(prompt);
	return JSON.parse(response);
};