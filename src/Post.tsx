import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Categories } from "./Categories";
import type { Post as PostType } from "./typees/Post";
import dayjs from "dayjs";

export const Post = () => {
  const { id } = useParams();
  const [post , setPost] = useState<PostType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const resp = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      );
      const data = await resp.json();
      setPost(data.post);
      setIsLoading(false);
    };
    fetcher();
  }, [id]);

  if (isLoading) return <div>読み込み中...</div>;
  if (!post) return <div>記事がありません</div>;

  return (
    <>
      <div className="mx-auto max-w-800px">
        <div className="flex flex-col p-4">
          <img
            src="https://placehold.jp/800x400.png"
            alt=""
            className="h-auto max-w-full"
          ></img>
          <div className="p-4">
            <div className="flex justify-between">
              <div className="text-gray-600 text-xs">
                {dayjs(post.createdAt).format("YYYY/MM/DD")}
              </div>
              <Categories categories={post.categories}></Categories>
            </div>
            <div className="text-lg mb-4 mt-2">{post.title}</div>
            <div
              className="text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
