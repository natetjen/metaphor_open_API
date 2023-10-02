import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

  let clickHandler = () => {
    router.push('/start')
  }
  return (
  <main className='flex flex-col justify-center items-center h-screen bg-black text-white'>
    <h1 className='text-center'>Welcome to Resources Search</h1>
    <button className='rounded bg-gray-300 px-4 py-2 text-black'
    onClick={clickHandler}>
      To start please click here
    </button>
  </main>
  )
}
