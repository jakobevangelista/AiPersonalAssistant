"use client";
import { useState } from 'react';
import ChatMessage from './components/ChatMessage';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([{
    user: 'gpt',
    message: 'how can i help you?',
  },{
    user: 'me',
    message: 'i want to use chat today',
  }]);

  function clearChat() {
    setChatLog([])
  }
  async function handleSubmit(event) {
    event.preventDefault()
    let chatLogNew = [...chatLog, {user: 'me', message: `${userInput}`}]
    setUserInput('')
    setChatLog(chatLogNew)
    const messages = chatLogNew.map((message) => message.message).join('\n')
    console.log(messages)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: messages }),
    });
    const data = await response.json();
    console.log(userInput)
    setChatLog([...chatLogNew, {user: 'gpt', message: `${data.message}`}])
  }

  return (
    <>
      <div class="flex flex-row min-h-screen">
        {/* sidebar */}
        <div class='flex flex-col w-[260px] bg-[#202123] h-screen p-2 text-white'>
          <a class='text-center py-3 px-3 rounded-md hover:bg-gray-500 border border-white cursor-pointer' onClick={clearChat}>New Chat</a>
        </div>
        {/* chatbox */}
        <div class='flex relative flex-col bg-[#343541] w-screen'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {/* input */}
          <div class='absolute w-full p-3 bottom-0'>
            <form onSubmit={handleSubmit}>
              <input class='w-full bg-[#40414f] rounded-md text-white outline-none p-3 text-sm' 
              rows={1} 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Ask me anything'>
              </input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
