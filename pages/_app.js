import '@/styles/global.css'

const MyApp = ({ Component, pageProps }) => {
  return <div className='transition-colors duration-200 bg-white dark:bg-black text-black dark:text-gray-200 font-display flex flex-col items-center'>
    <div className="py-10 w-full max-w-[90vw] lg:max-w-[75vw] sm:px-10 flex flex-col">
      <Component {...pageProps} />
    </div>
  </div>
}

export default MyApp
