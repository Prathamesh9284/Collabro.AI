// "use client"
// import { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
// import { cn } from '@/lib/utils'
// import ReactMarkdown from 'react-markdown'
// import { GoogleGenerativeAI } from "@google/generative-ai"

// export default function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [chatHistory, setChatHistory] = useState([])
//   const [userInput, setUserInput] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [geminiModel, setGeminiModel] = useState(null)

//   const sendMessage = async () => {
    

//     const formData = new FormData();
//     formData.append('query', userInput);

//     try {
//         const response = await fetch('http://127.0.0.1:8000/send_mail', {
//             method: 'POST',
//             body: formData,
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log(data.status);
//             try {
//               // Add user message immediately
//               setChatHistory(prev => [...prev, {
//                 messageType: 'user',
//                 messageContent: userInput
//               }])
        
//               const response = data.status;
//               const text = response.text()
        
//               // Add bot response
//               setChatHistory(prev => [...prev, {
//                 messageType: 'bot',
//                 messageContent: text
//               }])
        
//             } catch (error) {
//               console.error("Error generating response:", error)
//               // Add error message to chat
//               setChatHistory(prev => [...prev, {
//                 messageType: 'bot',
//                 messageContent: "Sorry, I encountered an error. Please try again."
//               }])
//             } finally {
//               setUserInput('')
//               setIsLoading(false)
//             }
//           }
//     } catch (error) {
//         console.error('Error sending message:', error)
//         // Add error message to chat
//         setChatHistory(prev => [...prev, {
//           messageType: 'bot',
//           messageContent: "Sorry, I encountered an error. Please try again."
//         }])
//     } finally {
//       setUserInput('')
//       setIsLoading(false)
//     }
//     setIsLoading(true)
    
    

//   const handleEnterKey = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   const toggleChatbox = () => {
//     setIsOpen(prev => !prev)
//   }


//   const handleUserInput = (e) => {
//     setUserInput(e.target.value)
//   }


//   useEffect(() => {
//     const script = document.createElement('script')
//     script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs'
//     script.type = 'module'
//     document.body.appendChild(script)

//     return () => {
//       document.body.removeChild(script)
//     }
//   }, [])

//   return (
//     <>
//       <div className={cn(
//         "fixed bottom-20 right-20 transition-transform",
//         isOpen ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
//       )}>
//         <div className="flex flex-col h-[500px] w-[400px] rounded-xl border bg-background shadow-lg transition-transform">
//           <div className="flex items-center justify-between p-2 bg-background">
//             <h2 className="text-lg font-semibold text-foreground">Chat Assistant</h2>
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="text-muted-foreground hover:text-foreground"
//               onClick={toggleChatbox}
//             >
//               <XIcon className="w-4 h-4" />
//             </Button>
//           </div>
//           <ScrollArea className="flex-1 overflow-y-auto p-4">
//             <div className="flex flex-col gap-4">
//               {chatHistory.map((msg, index) => (
//                 <div key={index} className={`flex items-start gap-2 ${msg.messageType === 'user' ? 'justify-end' : ''}`}>
//                   <Avatar className="w-8 h-8 border">
//                     <AvatarImage src="https://github.com/shadcn.png" />
//                     <AvatarFallback>{msg.messageType === 'user' ? 'U' : 'A'}</AvatarFallback>
//                   </Avatar>
//                   <div className={`grid gap-1 p-2 rounded-lg ${msg.messageType === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
//                     <div className={`font-medium text-foreground ${msg.messageType === 'user' ? 'text-blue-600' : ''}`}>
//                       {msg.messageType === 'user' ? 'You' : 'Assistant'}
//                     </div>
//                     <div className="text-sm text-muted-foreground">
//                       <ReactMarkdown>{msg.messageContent}</ReactMarkdown>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {isLoading && <div className="text-muted-foreground">...Typing</div>}
//             </div>
//           </ScrollArea>
//           <div className="p-4 bg-background">
//             <div className='flex items-center gap-2'>
//               <textarea
//                 value={userInput}
//                 onChange={handleUserInput}
//                 onKeyDown={handleEnterKey}
//                 placeholder="Type your message..."
//                 className="border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-full flex items-center h-10 resize-none overflow-hidden bg-background pr-10"
//               />
//               <Button onClick={sendMessage} disabled={isLoading}>Send</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="fixed bottom-4 right-4">
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           className="transparent hover:text-foreground"
//           onClick={toggleChatbox}
//           style={{ width: '100px', height: '100px' }}
//         >
//           <dotlottie-player 
//             src="https://lottie.host/02bd7a2c-e5cc-4978-9a24-b606f668cfe6/Pfm9RRaccV.json" 
//             background="transparent" 
//             speed="1" 
//             style={{ width: "100px", height: "100px" }} 
//             loop 
//             autoplay
//           ></dotlottie-player>
//         </Button>
//       </div>
//     </>
//   )
// }

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24" 
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }}

"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('query', userInput);

    try {
      const response = await fetch('http://127.0.0.1:8000/send_mail', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        console.log("data : ", data);

        // Add user message
        setChatHistory(prev => [
          ...prev,
          { messageType: 'user', messageContent: userInput },
        ]);

        // const botResponse = await response.text();

        const botResponse = data.status;

        console.log("botResponse : ", botResponse);

        // Add bot response
        setChatHistory(prev => [
          ...prev,
          { messageType: 'bot', messageContent: botResponse },
        ]);
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setChatHistory(prev => [
        ...prev,
        { messageType: 'bot', messageContent: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setUserInput('');
      setIsLoading(false);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChatbox = () => {
    setIsOpen(prev => !prev);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed bottom-20 right-20 transition-transform",
          isOpen ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-col h-[500px] w-[400px] rounded-xl border bg-background shadow-lg transition-transform">
          <div className="flex items-center justify-between p-2 bg-background">
            <h2 className="text-lg font-semibold text-foreground">Chat Assistant</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={toggleChatbox}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    msg.messageType === 'user' ? 'justify-end' : ''
                  }`}
                >
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{msg.messageType === 'user' ? 'U' : 'A'}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`grid gap-1 p-2 rounded-lg ${
                      msg.messageType === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                  >
                    <div
                      className={`font-medium text-foreground ${
                        msg.messageType === 'user' ? 'text-blue-600' : ''
                      }`}
                    >
                      {msg.messageType === 'user' ? 'You' : 'Assistant'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <ReactMarkdown>{msg.messageContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-muted-foreground">...Typing</div>}
            </div>
          </ScrollArea>
          <div className="p-4 bg-background">
            <div className="flex items-center gap-2">
              <textarea
                value={userInput}
                onChange={handleUserInput}
                onKeyDown={handleEnterKey}
                placeholder="Type your message..."
                className="border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-full flex items-center h-10 resize-none overflow-hidden bg-background pr-10"
              />
              <Button onClick={sendMessage} disabled={isLoading}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="transparent hover:text-foreground"
          onClick={toggleChatbox}
          style={{ width: '100px', height: '100px' }}
        >
          <dotlottie-player
            src="https://lottie.host/02bd7a2c-e5cc-4978-9a24-b606f668cfe6/Pfm9RRaccV.json"
            background="transparent"
            speed="1"
            style={{ width: '100px', height: '100px' }}
            loop
            autoplay
          ></dotlottie-player>
        </Button>
      </div>
    </>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
