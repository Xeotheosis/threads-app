import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    username:string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: [
    {
      author: {
        image: string;
      };
    }
  ];
  isComment?: boolean;
  likedBy: string[]; // Use this to pass the likedBy array
  likes: number; // Use this to display the number of likes
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  community,
  comments,
  isComment,
  likedBy, // Received from props
  likes, // Received from props
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl p-7 ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profil image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.username}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div className={`mt-5 flex flex-col gap-3 ${isComment && "mb-0"}`}>
              <div className="flex gap-3.5">
                <LikeThread
                  currentUserId={currentUserId}
                  threadId={id}
                  likedBy={likedBy} // Pass likedBy array to LikeThread
                />

                <p className="text-white">{likes}</p> {/* Display total likes */}

                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>

                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />

                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
          <DeleteThread
            threadId={id}
            currentUserId={currentUserId}
            authorId={author.id}
            parentId={parentId}
            isComment={isComment}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <p className="text-subtle-medium text-gray-1">
          {formatDateString(createdAt)}
        </p>
        {!isComment && community && (
          <Link href={`/communities/${community.id}`} className="flex items-center">
            <p className="text-subtle-medium text-gray-1">
              {" "}
              - {community.name} Community
            </p>
            <Image
              src={community.image}
              alt="community profile picture"
              width={28}
              height={28}
              className="ml-1 rounded-full object-cover"
            />
          </Link>
        )}
        <div className="flex items-center">
          {comments?.map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={28}
              height={28}
              className={`${index !== 0 && "-ml-2"} rounded-full object-cover`}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
