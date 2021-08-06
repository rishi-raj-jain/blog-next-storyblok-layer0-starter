import Link from 'next/link'
import Prefetch from '@layer0/react/Prefetch'

const MorePosts = ({ morePosts }) => {
  return (
    morePosts.length > 0 && (
      <div className="mt-10 pt-10 w-full border-t dark:border-gray-500 flex flex-row items-center justify-between">
        {morePosts.map((item) => (
          <Link href={`/blog/${item.slug}`} key={item.slug} passHref>
            <Prefetch>
              <a className="border rounded p-5 flex flex-col space-y-3">
                <span>{item.indicator}</span>
                <span className="text-md font-bold">{item.name}</span>
              </a>
            </Prefetch>
          </Link>
        ))}
      </div>
    )
  )
}

export default MorePosts
