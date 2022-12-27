function ChatMessage({message}) {
  return (
    <>
        <div class={`flex flex-row p-[24px] text-left ${message.user === 'gpt' ? 'bg-[#444654]' : ''}`}>
            <div className={`flex-none w-[40px] h-[40px] rounded-[50%] ${message.user === 'gpt' ? 'bg-black' : 'bg-white'}`}>
            </div>
            <div class='flex text-white pl-3'>
                {message.message}
            </div>
        </div>
    </>
  )
}
export default ChatMessage