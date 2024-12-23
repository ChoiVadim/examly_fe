import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Label } from '../components/ui/label'
import { useToast } from '../components/ui/use-toast'
import { ScrollArea } from '../components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'

interface Question {
  id: string
  text: string
  options: string[]
  tip: string
  answer: string
}

interface ExamProps {
  questions: Question[]
}

export function Exam({ questions }: ExamProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const submitExam = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
  
      // Calculate the score
      const totalQuestions = questions.length;
      let correctAnswers = 0;
  
      questions.forEach((question) => {
        if (answers[question.id] === question.answer) {
          correctAnswers++;
        }
      });
  
      const score = ((correctAnswers / totalQuestions) * 100).toFixed(2);
  
      // Display the score to the user
      toast({
        title: "Exam Submitted!",
        description: `You scored ${correctAnswers} out of ${totalQuestions} (${score}%).`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };
  

  return (
    <div className="h-full bg-zinc-900 rounded-lg overflow-hidden flex flex-col">
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {questions.map((question) => (
            <Card key={question.id} className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">{question.text}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  onValueChange={(value) =>
                    setAnswers((prev) => ({ ...prev, [question.id]: value }))
                  }
                  value={answers[question.id]}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                      <Label
                        htmlFor={`${question.id}-${index}`}
                        className="text-white/90"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex gap-2">
                {/* Tips Button */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      Get Help
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-zinc-700 border-zinc-600 text-white">
                    {question.tip}
                  </PopoverContent>
                </Popover>
                
                {/* Solution Button */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      Solution
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-zinc-700 border-zinc-600 text-white">
                    {question.answer}
                  </PopoverContent>
                </Popover>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-zinc-700">
        <Button onClick={submitExam} className="w-full">
          Submit Answers
        </Button>
      </div>
    </div>
  )
}

