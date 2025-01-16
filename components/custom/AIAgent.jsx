"use client";
import useGeneratePrompt from "@/lib/generate-prompt";
import { useEffect, useRef, useState } from "react";
import { BotIcon, LoaderIcon, SendIcon, TriangleAlertIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ai from "@/lib/google";

const AIAgent = () => {
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const prompt = useGeneratePrompt();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        scrollToBottom();

        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);

        const formData = new FormData();
        formData.append('input', input);

        try {
            const response = await fetch('http://127.0.0.1:8000/ai_agent', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                console.log('AI agent respone :', data.text);

                const result = data.text;
                const botMessage = { role: "model", content: result };

                setIsLoading(false);

            setMessages((prev) => [...prev, botMessage]);
            } 
        } catch (error) {
            console.error('Error storing file :', error);
        } finally {
            setIsLoading(false);
        }


        setInput("");
        // setIsLoading(true);
        setIsLoading(false);


    };

    return (
        <div className="flex flex-col w-full p-3 m-3 relative sm:pl-4 h-[90vh] translate-y-5">
            <div className="flex flex-col p-2 md:border rounded-xl h-5/6 w-full ring-1 ring-violet-700">
                <div className="w-full h-full overflow-y-scroll space-y-4 md:p-4 pb-12 flex flex-col flex-1 scrollbar-hide rounded-xl">
                    {!isLoading && !error && messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-center w-full py-8 h-full">
                            <BotIcon className="w-10 h-10 text-violet-400" />
                            <p className="text-sm text-muted-foreground font-medium mt-2">
                                Start a conversation our assistant
                            </p>
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex max-w-lg ${
                                message.role === "user" ? "ml-auto" : "mr-auto"
                            }`}
                        >
                            {message.role === "user" ? (
                                <div className="flex items-end">
                                    <p className="text-sm px-4 py-2 rounded-lg bg-violet-100">
                                        {message.content}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-start">
                                    <div className="bg-indigo-100 text-foreground text-sm px-4 py-2 rounded-lg">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-line">
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex flex-col justify-center items-center text-center p-4">
                            <LoaderIcon className="w-5 h-5 animate-spin" />
                            <p className="text-sm text-muted-foreground font-medium">
                                Assistant is thinking...
                            </p>
                        </div>
                    )}
                    {!isLoading && error && (
                        <div className="flex flex-col items-center justify-center w-full py-8 h-full">
                            <p className="text-sm text-red-500 bg-red-50 px-4 py-1.5 rounded-md mx-auto font-medium flex items-center">
                                <TriangleAlertIcon className="w-4 h-4 mr-2" />
                                {error}
                            </p>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="w-full h-px" />
                </div>
                <div className="w-full rounded-xl fixed sm:sticky bottom-0 inset-x-0 px-2  bg-background">
                    <form onSubmit={handleSendMessage} className="flex flex-row items-center gap-x-4 rounded-xl py-3 md:px-3">
                    <Input
                        type="text"
                        value={input}
                        disabled={isLoading}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anthing to our AI Agent...."
                        className="border-violet-300 rounded-full focus:outline-0 focus:ring-2 focus:ring-violet-300"
                    />


                        <Button
                            size="iconlg"
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="flex-shrink-0"
                        >
                            {isLoading ? <LoaderIcon className="w-7 h-7 animate-spin text-violet-500 bg-white" /> : <SendIcon className="w-9 h-9 text-violet-700 bg-white" />}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIAgent;