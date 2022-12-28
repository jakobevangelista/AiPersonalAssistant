"use client";
import { useState } from 'react';
import ChatMessage from './components/ChatMessage';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([{
    user: 'gpt',
    message: 'how can i help you?',
  }]);
  const [textLog, setTextLog] = useState([])

  function clearChat() {
    setChatLog([])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    let chatLogNew = [...chatLog, {user: 'me', message: `${userInput}`}]
    // setUserInput('')
    // setChatLog(chatLogNew)
    // const messages = chatLogNew.map((message) => message.message).join('\n')
    console.log(userInput)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }), // takes only the user input for now, use more advanced prompt engineering to mimic chatgpt
    });
    const data = await response.json();
    setUserInput('')
    setChatLog([...chatLogNew, {user: 'gpt', message: `${data.message}`}])
  }

  return (
    <>
      <div class="flex w-screen flex-row h-screen overflow-hidden relative">
        {/* sidebar */}
        <div class='flex flex-col w-1/6 bg-[#202123] h-screen p-2 text-white overflow-hidden'>
          <a class='text-center py-3 px-3 rounded-md hover:bg-gray-500 border border-white cursor-pointer' onClick={clearChat}>New Chat</a>
        </div>
        {/* chatbox */}
        <div class='flex flex-col h-full overflow-hidden bg-[#343541]'>
          <div class='flex-col overflow-y-auto w-screen'>
            <div class='flex overflow-y-auto relative flex-col w-screen'>
              {chatLog.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          </div>
          {/* input */}
          <div class='absolute p-3 bottom-0 w-5/6'>
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
