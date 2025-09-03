import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {

  const [extended, setExtended] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)

  const loadPrompt = async (prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className='hidden sm:inline-flex flex-col justify-between bg-gray-100 min-h-screen p-6 w-auto'>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='w-5 h-5 ml-2 cursor-pointer' src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="flex items-center gap-2 bg-gray-200 rounded-full text-sm to-gray-500 cursor-pointer px-4 py-2 mt-12">
              <img src={assets.plus_icon} alt="" className='w-5 h-5' />
              {extended ? <p>New Chat</p> : null}
            </div>
            {extended ?
            <div className="flex flex-col animate-fadeIn">
              <p className="mt-8 mb-5 text-gray-700 font-medium">Recent</p>
              {prevPrompts.map((item, index)=>{
                return (
              <div onClick={()=>loadPrompt(item)} className="flex items-start gap-2 px-4 py-2 rounded-full text-gray-800 cursor-pointer hover:bg-gray-200">
                <img src={assets.message_icon} alt="" className='w-5 h-5' />
                <p className='text-sm truncate max-w-[160px]'>{item.slice(0,18)}...</p>
              </div>

                )
              })}
            </div>
            : null}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <img src={assets.question_icon} alt="" className='w-5 h-5' />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <img src={assets.history_icon} alt="" className='w-5 h-5' />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <img src={assets.setting_icon} alt="" className='w-5 h-5' />
            {extended ? <p>Settings</p> : null}
          </div>

        </div>
    </div>
  )
}

export default Sidebar