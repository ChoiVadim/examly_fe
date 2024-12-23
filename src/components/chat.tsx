import { useState, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ScrollArea } from '../components/ui/scroll-area'
import { useToast } from '../components/ui/use-toast'
import { fetchChatGPTResponse } from '../services/llm'

interface Message {
  id: string
  content: string
  sender: 'user' | 'system'
  timestamp: Date
}

const welcomeMessages: Message[] = [
  {
    id: '1',
    content: `Hi there! 🤖
    Looks like you want to learn about Data Structures and Algorithms. 📚
    You can ask me anything about Data Structures and Algorithms.
    I'm here to help you understand and master these important concepts. 🤓

    I see you took the Data Structures and Algorithms course. 🎉
    That's great! You're on the right track to mastering these concepts. 💪

    This some topics you should know about Data Structures and Algorithms:
    1. Time Complexity: Understanding how algorithms perform in terms of time and space. ⏱️
    2. Space Complexity: Understanding how algorithms perform in terms of space. 📦
    3. Sorting Algorithms: Different algorithms for sorting data. 🔀
    4. Searching Algorithms: Different algorithms for searching data. 🔍
    5. Graphs: Understanding how algorithms work on graphs. 📈
    6. Trees: Understanding how algorithms work on trees. 🌳
    7. Hash Tables: Understanding how algorithms work on hash tables. 📝
    8. Linked Lists: Understanding how algorithms work on linked lists. 🔗
    9. Stacks and Queues: Understanding how algorithms work on stacks and queues. 📚
    10. Heaps: Understanding how algorithms work on heaps. 🌈`,
    sender: 'system',
    timestamp: new Date(),
  },
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(welcomeMessages)
  const [input, setInput] = useState('')
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')

    try {
      const response = await fetchChatGPTResponse(input);
      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-lg overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-white text-black'
                    : 'bg-zinc-700 text-white/90'
                }`}
              >
                {message.content.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-zinc-700">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-zinc-800 border-zinc-700 text-white"
          />
          <Button type="submit" variant="secondary">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
