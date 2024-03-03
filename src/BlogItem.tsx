/*一覧画面のブログ記事を表示*/
import "./index.css";
import { useState, useEffect } from "react";
import { Categories } from "./Categories";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface PostType {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
}
export const BlogItem = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async (): Promise<void> => {
      setIsLoading(true);
      const resp = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      const data = await resp.json();
      setPosts(data.posts);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  if (isLoading) return <div>読み込み中...</div>;
  if (!posts) return <div>記事がありません</div>;

  return (
    <>
      <div className="mx-auto max-w-screen-lg px-4 my-10">
        <ul>
          {posts.map((item: PostType) => (
            <li className="flex flex-col list-none m-0 p-0" key={item.id}>
              <Link to={`/post/${item.id}`} className="text-gray-700 no-underline">
                <div className="border border-gray-300 flex flex-row mb-8 p-4">
                  <div>
                    <div className="flex justify-between">
                      <div className="text-gray-500 text-sm">
                        {dayjs(item.createdAt).format("YYYY/MM/DD")}
                      </div>
                      <div className="flex flex-wrap">
                        <Categories categories={item.categories}></Categories>
                      </div>
                    </div>
                    <p className="text-xl mb-4 mt-2">{item.title}</p>
                    <div
                      className="text-base leading-relaxed line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
