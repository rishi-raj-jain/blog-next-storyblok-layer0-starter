import { useState } from 'react'

const SocialMediaLinks = ({ className, url, altText }) => {
  const [ifLink, setIfLink] = useState(false)
  return (
    <div className={`${className ?? ''} text-gray-400 flex flex-row space-x-3`}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
        title={`Twitter, ${altText} - Author Name`}
        aria-label={`Twitter, ${altText} - Author Name`}
        href={`https://twitter.com/intent/tweet?text=${url}`}
      >
        <svg width="29" height="29">
          <path
            fill="currentColor"
            d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"
          ></path>
        </svg>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
        title={`LinkedIn, ${altText} - Author Name`}
        aria-label={`LinkedIn, ${altText} - Author Name`}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
      >
        <svg fill="currentColor" width="29" height="29">
          <path d="M5 6.36C5 5.61 5.63 5 6.4 5h16.2c.77 0 1.4.61 1.4 1.36v16.28c0 .75-.63 1.36-1.4 1.36H6.4c-.77 0-1.4-.6-1.4-1.36V6.36z"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.76 20.9v-8.57H7.89v8.58h2.87zm-1.44-9.75c1 0 1.63-.65 1.63-1.48-.02-.84-.62-1.48-1.6-1.48-.99 0-1.63.64-1.63 1.48 0 .83.62 1.48 1.59 1.48h.01zM12.35 20.9h2.87v-4.79c0-.25.02-.5.1-.7.2-.5.67-1.04 1.46-1.04 1.04 0 1.46.8 1.46 1.95v4.59h2.87v-4.92c0-2.64-1.42-3.87-3.3-3.87-1.55 0-2.23.86-2.61 1.45h.02v-1.24h-2.87c.04.8 0 8.58 0 8.58z"
            fill="#fff"
          ></path>
        </svg>
      </a>
      <a
        className="relative cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(url).then(
            function () {
              setIfLink(true)
              console.log('Successfully copied.')
              setTimeout(() => {
                setIfLink(false)
              }, 1000)
            },
            function () {
              console.log('Failed to copy.')
            }
          )
        }}
        aria-label={`Link, ${altText} - Author Name`}
      >
        <span
          className={`absolute transition-transform duration-500 text-center text-sm px-2 py-1 rounded bg-gray-100 text-black top-8 -right-8 w-[120px] ${
            ifLink ? 'block' : 'hidden'
          }`}
        >
          Link Copied!
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
        </svg>
      </a>
    </div>
  )
}

export default SocialMediaLinks
