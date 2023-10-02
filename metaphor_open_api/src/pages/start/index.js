import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState, useEffect } from 'react';
import {initializeMetaphor, search, getContentById} from '../../metaphor'
import {getChatGBTSummary} from '../../openai'

const inter = Inter({ subsets: ['latin'] })


export default function Start() {
  const [query, setQuery] = useState('');
  const [queryToPass, setQueryToPass] = useState('')
  const [content, setContent] = useState([])
  initializeMetaphor()
  let submitQuery = async () => {
    await search(query, {numResults:10, type: 'neural'})
      .then((data) => {
        console.log(data);
        setContent(data.results)
        setQueryToPass(query)
        setQuery('')
      })
      .catch((err) => console.log(err))
  }
  return (
  <main className='flex flex-col justify-center items-center h-screen bg-black text-white'>
    <input
    className = 'text-black mb-3 w-1/2'
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Please input your search here"
    />
    <button className='rounded bg-gray-300 px-4 py-2 text-black'
    onClick={submitQuery}>
      Search
    </button>
    <div className='flex flex-col items-left' style={{ height: '80%', overflowY: 'auto' }}>
    {content.map((each) => {
      each.query = query
      return (
        <EachSource props ={each} />
      )
    })}
    </div>
  </main>
  )
}

function EachSource ({props}) {
  let {title, url, publishedDates, author, id, query} = props
  const [modal, setModal] = useState(false)

  let clickHandler = () => {
    setModal(true)
  }
  let passProps = {
    ...props,
    setModal,
  }


return(
  <div className="flex flex-col mt-5 p-4 border border-gray-300 rounded-md shadow-lg">
    <h1 className="text-2xl font-semibold mb-2">{title}</h1>
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-2">
      {url}
    </a>
    <p className="text-gray-700 mb-2">{publishedDates}</p>
    {author && (<p className="text-sm text-gray-500 mb-4">By: {author}</p>)}
    <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
      onClick={clickHandler}>
        Click here for summary *powered by ChatGBT
    </button>
    {modal && <ModalSummary props={passProps} />}
  </div>
)
}

function ModalSummary({props}) {
  console.log("ModalSummary Rendering")
  let {setModal, title, url, publishedDates, author, id, query} = props

  const [loading, setLoading] = useState(true)
  const [resultChatGBT, setResultChatGBT] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      let content = await getContentById(id);
      let objPass = {title, url, publishedDates, author, content: content.extract}
      let prompt = 'Please summary what makes the content related to the query and make me an apa citation with this information' + JSON.stringify(objPass)
      getChatGBTSummary(prompt, (result) => {
        setLoading(false)
        setResultChatGBT(result)
      })
    };

    fetchData();
  }, []);

  let closeHandle = () => {
    setModal(false)
  }

  return (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
     <div className="relative bg-white p-8 rounded-lg shadow-xl w-96 text-black max-h-full overflow-y-auto">
      <button onClick={closeHandle} className="absolute top-2 right-2 p-1 rounded-full text-black-500 hover:bg-gray-200">
        X
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{resultChatGBT}</p>
      )}
    </div>
  </div>
  )
}
