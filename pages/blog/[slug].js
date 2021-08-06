import {
  getPost,
  getNextBlog,
  getPrevBlog,
  getAllPostsWithSlug,
} from '@/lib/api'
import SEO from '@/components/seo-head'
import { deploymentUrl } from '@/lib/data'
import { month, weekday } from '@/lib/operations'
import MorePosts from '@/components/blog/more-posts'
import SocialMediaLinks from '@/components/social-media-links'
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'

export default function Post({ post, morePosts = [] }) {
  const SEODetails = {
    description: post.content.intro,
    pubDate: post.first_published_at,
    author: post.content.author.name,
    canonical: `${deploymentUrl}/blog/${post.slug}`,
    title: `${post.content.title} - ${post.content.author.name}`,
  }
  if (post.content.image) SEODetails['image'] = post.content.image

  return (
    <div className="w-full flex flex-col items-center">
      <SEO {...SEODetails} />
      <div className="w-full">
        <h1 className="font-bold text-2xl sm:text-5xl">{post.content.title}</h1>
        <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex flex-row items-center space-x-3">
            <img
              alt={SEODetails['author']}
              title={SEODetails['author']}
              className="w-[30px] h-[30px]"
              src={post.content.author.content.Image.filename}
            />
            <span className="hidden sm:block text-[16px]">
              {SEODetails['author']}
            </span>
            <span>/</span>
            <span className="text-[16px]">
              {`${weekday[new Date(SEODetails['pubDate']).getDay()]}, ${
                month[new Date(SEODetails['pubDate']).getMonth()]
              } ${new Date(SEODetails['pubDate']).getDate()} ${new Date(
                SEODetails['pubDate']
              ).getFullYear()}`}
            </span>
          </div>
          <SocialMediaLinks
            altText={post.content.title}
            url={SEODetails['canonical']}
          />
        </div>
        {SEODetails.hasOwnProperty('image') && (
          <div className="w-full flex flex-row items-center justify-center mt-5 h-[113px] md:h-[225px] rounded bg-gray-50">
            <img
              alt={post.content.title}
              src={SEODetails['image']}
              title={post.content.title}
              className="w-[200px] h-[113px] md:w-[400px] md:h-[225px] object-cover rounded"
            />
          </div>
        )}
        <div
          className="prose dark:prose-light max-w-none mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
        <MorePosts morePosts={morePosts} />
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug)
  const prevBlog = await getPrevBlog(
    data['post']['first_published_at'],
    data['post']['full_slug']
  )
  if (prevBlog.length > 0) prevBlog[0]['indicator'] = 'Previous'
  const nextBlog = await getNextBlog(
    data['post']['first_published_at'],
    data['post']['full_slug']
  )
  if (nextBlog.length > 0) nextBlog[0]['indicator'] = 'Next'
  return {
    props: {
      post: {
        ...data.post,
        html: data.post?.content?.long_text
          ? new RichTextResolver().render(data.post.content.long_text)
          : null,
      },
      morePosts: [...prevBlog, ...nextBlog],
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post) => `/blog/${post.slug}`) || [],
    fallback: 'blocking',
  }
}
