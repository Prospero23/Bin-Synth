import Link from "next/link";
import TimeMade from "@/components/Card/TimeMade";
import { type PostDocument } from "@/types";
import Image from "next/image";

function Card({ post }: { post: PostDocument }) {
  return (
    <Link
      href={`/posts/${post._id}`}
      className=" relative block overflow-hidden rounded-lg border border-gray-100 items-center my-2 transform hover:scale-105 transition duration-300 hover:border-sky-500 group"
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-white z-10 group-hover:bg-sky-500 transition duration-300"></span>
      <div className="flex flex-row">
        <div className="p-4 sm:p-6 lg:p-8 flex-nowrap">
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-100 sm:text-xl w-fit">
                {post.title}
              </h3>

              <p className="mt-1 text-xs font-medium text-gray-300">
                By {"name" in post.author ? post.author.name : "Unknown"}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="max-w-[40ch] text-sm text-gray-300">
              {post.description}
            </p>
          </div>
          <dl className="mt-6 flex gap-4 sm:gap-6">
            <div className="flex flex-col-reverse">
              <dd className="text-xs text-gray-300">
                <TimeMade dateMade={post.dateMade} />
              </dd>
              <dt className="text-sm font-medium text-gray-400">Published:</dt>
            </div>
          </dl>
        </div>
        <div className="relative h-64 w-full p-6">
          <div className="absolute"></div>
          <Image
            alt="post image"
            width={500}
            height={50}
            src={post.image.url}
            className=""
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;
