"use client";

import Image from "next/image";
import { likeThread } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  likedBy?: string[]; // Ensure likedBy is optional, since it may not always be passed
}

function LikeThread({ threadId, currentUserId, likedBy = [] }: Props) {
  // Default to empty array if likedBy is undefined
  const [hasLiked, setHasLiked] = useState(likedBy.includes(currentUserId));

  const handleLike = async () => {
  
      await likeThread(threadId, currentUserId);
    setHasLiked(!hasLiked); // Toggle liked state
  };

  return (
    <Image
      src={`${hasLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}`}
      alt="like button"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleLike}
    />
  );
}

export default LikeThread;
