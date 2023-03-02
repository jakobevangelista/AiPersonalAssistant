"use client";
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ChatMessage from '../components/ChatMessage';
import SignInScreen from '../components/SignInScreen'
import LogoutIcon from '@mui/icons-material/Logout';

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function Home() {
  const {data: session} = useSession()
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([{
    user: 'gpt',
    message: `How can I help you, ${session?.user?.name}?`,
  }]);

  function clearChat() {
    setChatLog([{
      user: 'gpt',
      message: `How can I help you, ${session?.user?.name}?`,
    }])
  }

  async function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
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
  

  if(session) {
    return (
      <>
        <div className="flex w-screen flex-row h-screen overflow-hidden relative">
          {/* sidebar */}
          <div className='flex flex-col relative w-1/6 bg-[#202123] h-screen p-2 text-white overflow-hidden'>
            <a className='text-center py-3 px-3 rounded-md hover:bg-gray-500 border border-white cursor-pointer' onClick={clearChat}>New Chat</a>
            <div className='text-center text-sm py-3 px-3'>{session?.user?.email}</div>
            <a className='text-center py-3 px-3 rounded-md hover:bg-gray-500 cursor-pointer absolute bottom-0 left-0 right-0 mx-2 mb-2' onClick={signOut}><LogoutIcon />Logout</a>
          </div>
          {/* chatbox */}
          <div className='flex flex-col h-full overflow-hidden bg-[#343541]'>
            <div className='flex-col overflow-y-auto w-screen'>
              <div className='flex overflow-y-auto relative flex-col pb-14'>
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
            </div>
            {/* input */}
            <div className='fixed p-3 bottom-0 w-5/6'>
              <form onSubmit={handleSubmit}>
                <input className='w-full bg-[#40414f] rounded-md text-white outline-none p-3 text-sm' 
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
  } else {
    return (
      <>
        <SignInScreen />
      </>
    )
  }
}
