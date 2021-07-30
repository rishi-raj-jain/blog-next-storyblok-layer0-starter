import SEO from '@/components/seo-head'
import { getAllPostsForHome } from '@/lib/api'
import { deploymentUrl } from '@/lib/data'
import { month, weekday } from '@/lib/operations'
import { Prefetch } from '@layer0/react'
import Link from 'next/link'

const Blogs = ({ allPosts }) => {
  const SEODetails = {
    title: `Blogs - Author Name`,
    canonical: deploymentUrl,
  }
  return (
    <>
      <SEO {...SEODetails} />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl sm:text-5xl">Blogs</h1>
        <h2 className="mt-5 dark:text-gray-400 font-regular text-md sm:text-xl whitespace-pre-line">
          An awesome tagline ✨
        </h2>
        <div className="flex flex-row flex-wrap">
          <div className="mt-10 w-full lg:mt-20 lg:pr-10 flex flex-col">
            {allPosts.map((item) => (
              <div
                className="border-b dark:border-gray-700 pb-10 mb-10 flex flex-col"
                key={`/blog/${item.slug}`}
              >
                <span className="dark:text-gray-400 text-gray-700">
                  {`${weekday[new Date(item.first_published_at).getDay()]}, ${
                    month[new Date(item.first_published_at).getMonth()]
                  } ${new Date(item.first_published_at).getDate()} ${new Date(
                    item.first_published_at
                  ).getFullYear()}`}
                </span>
                <Link href={`/blog/${item.slug}`} passHref>
                  <Prefetch>
                    <a className="mt-3 hover:underline">
                      <span className="font-bold text-lg sm:text-2xl">
                        {item.content.title}
                      </span>
                    </a>
                  </Prefetch>
                </Link>
                {item?.content?.image && (
                  <Link href={`/blog/${item.slug}`} passHref>
                    <Prefetch>
                      <a className="mt-3 hover:underline w-full flex flex-row items-center justify-center h-[113px] md:h-[225px] rounded bg-gray-50">
                        <img
                          alt={item.content.image}
                          src={item.content.image}
                          title={item.content.image}
                          className="w-[200px] h-[113px] md:w-[400px] md:h-[225px] object-cover rounded"
                        />
                      </a>
                    </Prefetch>
                  </Link>
                )}
                <span className="mt-5 dark:text-gray-400 text-gray-700 line-clamp-2 text-md sm:text-lg">
                  {item.content.intro}
                </span>
                <Link href={`/blog/${item.slug}`} passHref>
                  <Prefetch>
                    <a className="hover:underline text-blue-500 mt-5 uppercase text-sm">
                      Read More &rarr;
                    </a>
                  </Prefetch>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs

export async function getStaticProps() {
  const allPosts = (await getAllPostsForHome()) || []
  return {
    props: { allPosts },
    revalidate: 1,
  }
}
