import Link from "next/link";
import { CldImage } from "next-cloudinary";

function Card({ post }) {
  return (
    <Link
      href={`/posts/${post._id}`}
      className=" relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 items-center my-2 transform hover:scale-105 transition duration-300 hover:border-sky-500"
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-white"></span>
      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {post.title}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            By {post.author.name}
          </p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt="post image"
            src={post.image.url}
            className="h-3/4 w-2/4 rounded-lg object-cover shadow-sm absolute top-5 right-0"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="max-w-[40ch] text-sm text-gray-500">{post.description}</p>
      </div>
      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Published</dt>
          <dd className="text-xs text-gray-500">{post.dateMade.toString()}</dd>
        </div>
      </dl>
      
    </Link>
  );
}

export default Card;
