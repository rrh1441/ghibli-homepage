import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Image from "next/image"
import { Playfair_Display, Lora } from "next/font/google"
import { CloudIcon, MoonIcon, SunIcon } from "lucide-react"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })

// Function to get all blog posts
async function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), "content/posts")
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug: filename.replace(".mdx", ""),
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      featuredImage: data.featuredImage,
    }
  })

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <main className={`min-h-screen bg-ghibli-pattern ${playfair.variable} ${lora.variable}`}>
      {/* Whimsical header with floating elements */}
      <header className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-[10%] animate-float-slow">
            <CloudIcon className="w-16 h-16 text-white opacity-80" />
          </div>
          <div className="absolute top-16 right-[15%] animate-float-medium">
            <CloudIcon className="w-20 h-20 text-white opacity-90" />
          </div>
          <div className="absolute top-28 left-[30%] animate-float-fast">
            <CloudIcon className="w-12 h-12 text-white opacity-70" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block">
            <h1 className="font-playfair text-5xl md:text-7xl text-[#432818] mb-3 drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)]">
              Storybook Chronicles
            </h1>
            <div className="h-1 bg-gradient-to-r from-[#e8a87c] via-[#c38d9e] to-[#85cdca] rounded-full"></div>
          </div>
          <p className="font-lora text-lg text-[#432818] mt-4 italic drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
            A collection of whimsical tales
          </p>
        </div>
      </header>

      {/* Main content area with decorative elements */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#e8a87c] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-16 w-48 h-48 bg-[#85cdca] opacity-20 rounded-full blur-3xl"></div>

        {/* Story cards in a more interesting layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {posts.slice(0, 3).map((post, index) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className={`group transform transition-all duration-500 hover:scale-[1.02] ${
                index === 1 ? "lg:mt-12" : index === 2 ? "lg:mt-6" : ""
              }`}
            >
              <article className="story-card bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden h-[520px]">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={
                      post.featuredImage ||
                      `/placeholder.svg?height=400&width=600&query=watercolor%20landscape%20in%20ghibli%20style`
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white/30 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white/30 rounded-tr-lg"></div>
                </div>

                <div className="p-6 relative h-[calc(520px-224px)] overflow-y-auto custom-scrollbar">
                  {/* Decorative icon based on post index */}
                  <div className="absolute -top-8 right-6 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                    {index === 0 ? (
                      <SunIcon className="w-8 h-8 text-[#e8a87c]" />
                    ) : index === 1 ? (
                      <MoonIcon className="w-8 h-8 text-[#c38d9e]" />
                    ) : (
                      <CloudIcon className="w-8 h-8 text-[#85cdca]" />
                    )}
                  </div>

                  <div className="mb-4">
                    <h2 className="font-playfair text-2xl text-[#432818] mb-2 group-hover:text-[#85677c]">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-sm text-[#85677c] mb-3">
                      <span className="mr-2">By {post.author}</span>
                      <span className="mx-2">•</span>
                      <time>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    {/* Decorative divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#c38d9e]/50 to-transparent my-4"></div>
                  </div>

                  <div className="prose font-lora text-[#432818]">
                    <p>{post.excerpt}</p>
                  </div>

                  <div className="mt-6 text-center">
                    <span className="inline-block font-lora text-sm text-[#85677c] border-b border-[#85677c] pb-1 group-hover:text-[#432818] group-hover:border-[#432818] transition-colors duration-300">
                      Continue Reading
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Whimsical footer */}
      <footer className="relative mt-20 pt-16 pb-8 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#432818]/20 to-transparent"></div>
          <div className="absolute bottom-10 left-[5%] animate-float-medium">
            <CloudIcon className="w-12 h-12 text-white opacity-60" />
          </div>
          <div className="absolute bottom-20 right-[20%] animate-float-slow">
            <CloudIcon className="w-16 h-16 text-white opacity-70" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#432818]/40 to-transparent mb-6"></div>
          <p className="font-lora text-sm text-[#432818] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
            © {new Date().getFullYear()} Storybook Chronicles
          </p>
        </div>
      </footer>
    </main>
  )
}
