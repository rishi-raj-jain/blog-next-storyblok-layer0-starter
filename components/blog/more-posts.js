import Link from 'next/link'

const MorePosts = ({ morePosts }) => {
  return (
    morePosts.length > 0 && (
      <div className="mt-10 pt-10 w-full border-t dark:border-gray-500">
        {morePosts.map((item) => (
          <Link href={`/blog/${item.slug}`} key={item.slug}>
            <a className="border rounded p-5 flex flex-col space-y-3">
              <span>Up Next &rarr;</span>
              <span className="text-md font-bold">{item.content.title}</span>
            </a>
          </Link>
        ))}
      </div>
    )
  )
}

export default MorePosts
