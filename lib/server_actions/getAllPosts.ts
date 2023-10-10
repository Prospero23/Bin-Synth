import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { type Result, type PostDocument } from "@/types";
const PAGE_SIZE = 10;
const MAX_RETRIES = 3;

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export default async function getAllPosts(
  page = 1,
  retries = 0,
): Promise<Result<PostDocument[] | null[]>> {
  try {
    const currentPage = page >= 1 ? page : 1;

    await dbConnect();
    const result = await fetchPostsForPage(currentPage);

    if (result.length === 0 && currentPage > 1) {
      const lastPageResults = await fetchLastPageResults();
      return { data: lastPageResults, error: null };
    }

    return { data: result, error: null };
  } catch (error) {
    return await handleDatabaseError(error, page, retries);
  }
}

const fetchPostsForPage = async (page: number) => {
  const skip = (page - 1) * PAGE_SIZE;
  return await Post.find({})
    .limit(PAGE_SIZE)
    .skip(skip)
    .populate({ path: "author" }) // populate({ path: "author", model: "User" })

    .sort({ dateMade: -1 });
};

const fetchLastPageResults = async () => {
  const totalCount = await Post.countDocuments({});
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const currentPage = totalPages > 0 ? totalPages : 1;
  return await fetchPostsForPage(currentPage);
};

const handleDatabaseError = async (
  error: any,
  page: number,
  retries: number,
) => {
  if (error instanceof Error) {
    console.error(`Error fetching posts: ${error.message}`);
    if (retries < MAX_RETRIES) {
      console.log(`Retrying... (${retries + 1})`);
      return await getAllPosts(page, retries + 1);
    } else {
      return {
        data: null,
        error: new DatabaseError(
          `Unable to fetch posts after multiple retries. Original error: ${error.message}`,
        ),
      };
    }
  } else {
    throw error;
  }
};
