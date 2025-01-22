'use client';

import React, { useState, useEffect } from 'react';
import { delay } from '../../modules/weathercodes';

interface Message {
  sender: string;
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const [placeholder, setPlaceholder] = useState(false);

  const toggleChatbot = () => {
    setTimeout(() => setIsOpen(!isOpen), 500);
    setIsTransformed(!isTransformed);
  };



  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');

    setPlaceholder(true);

    try {
      // Send message to the API
      await fetch('https://chat.botpress.cloud/a3055457-eacf-4a5d-9ac0-a8d4505f1550/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MzExNzE0NTF9.3pggYoXtQ29zCBIN7mBgyYp3kVnyC21wxKBvjPEzgOM'
        },
        body: JSON.stringify({
          payload: {
            type: "text",
            text: userMessage.text
          },
          conversationId: "conv_01JDYX3R9BDWT3GZX23865KVX8"
        }),
      });

      (async () => {

        //LOADING...

        await delay(8000); // Wait for 5 seconds

        const response = await fetch('https://chat.botpress.cloud/a3055457-eacf-4a5d-9ac0-a8d4505f1550/conversations/conv_01JDYX3R9BDWT3GZX23865KVX8/messages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-user-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MzExNzE0NTF9.3pggYoXtQ29zCBIN7mBgyYp3kVnyC21wxKBvjPEzgOM'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch API response');
        }

        const data = await response.json();
        console.log(data)
        const botMessage: Message = { sender: 'bot', text: data.messages[0].payload.text };
        setMessages((prev) => [...prev, botMessage]);
        setPlaceholder(false);
      })();

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { sender: 'bot', text: 'Something went wrong. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Listen for the "Enter" key to send the message
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (


    <div className={`fixed bottom-5 right-5 flex flex-col max-w-lg mx-auto bg-purple-400 rounded-lg shadow-md ${isTransformed ? 'h-96 w-full p-4 animate-slide-in' : 'animate-slide-out'
      }`}>
<div className="flex justify-end px-2 py-1 ">
      <button
        onClick={toggleChatbot}
        className={`text-sm text-gray-600border rounded hover:bg-purple-100 ${isTransformed ? 'block' : 'hidden'}`}
      >
        <img src="https://img.icons8.com/ios_filled/512/delete-sign--v2.png" alt="Chat" className="w-8 h-8" />
      </button>
    </div>

      {/* Chatbot Icon */}
      {!isOpen && (
        <div
          onClick={toggleChatbot}
          className={`fixed bottom-5 right-5 w-16 h-16 bg-purple-400 rounded-full shadow-lg flex items-center justify-center cursor-pointer transform ${isTransformed ? 'animate-bounce' : 'animate-bounce-reverse unset-icon'
            }`}
        >
          <img src="https://www.svgrepo.com/show/60112/chat.svg" alt="Chat" className="w-8 h-8" />
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (

        <div className={`chatbox overflow-y-auto h-72 flex-1 mb-4 space-y-4 p-2 bg-white rounded-lg`}>
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${message.sender === 'user'
                    ? 'bg-purple-500 text-white text-right'
                    : 'bg-purple-300 text-black text-left'
                  }`}
              >
                {message.text}
              </div>
            </div>

          ))}

          {/* Display placeholder message if true */}
          {placeholder && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-purple-300 text-black text-left">
                <span className="dot-typing"></span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      {isOpen && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="text-black flex-1 p-2 border border-purple-500 input-chatbox rounded-lg"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="px-4 py-2 bg-white border border-purple-700 text-white rounded-lg"
            onClick={sendMessage}
          >
            <img src="data:image/jpeg;base64,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" alt="Chat" className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}




export default Chatbot;
