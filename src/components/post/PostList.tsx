import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASEURL } from '../../constants/constants';

interface PostType {
  postId: number;
  thumbnail: string;
  SeasonTag: string;
  WeatherTag: string[];
  TempTag: string[];
  likeByUser: boolean;
  location: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [sort, setSort] = useState('date');
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (page: number, sort: string, initialLoad = false) => {
    const ACCESS_TOKEN = localStorage.getItem('accessToken');
    setLoading(true);
    try {
      const response = await axios.get(`${BASEURL}/api/v1/posts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: {
          page,
          size,
          sort,
        },
      });
      if (Array.isArray(response.data)) {
        if (initialLoad) {
          setPosts(response.data);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
        }
        if (response.data.length < size) {
          setHasMore(false);
        }
      } else {
        console.error('Unexpected response format:', response.data);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setHasMore(true);
    setPage(1);
    fetchPosts(1, sort, true);
  }, [sort]);

  useEffect(() => {
    if (page > 1) {
      fetchPosts(page, sort);
    }
  }, [page]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <div className="mb-4 overflow-y-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleSortChange('date')}
            className={`${sort === 'date' ? 'font-bold text-blue-500' : ''}`}
          >
            최신순
          </button>
          <div className="px-2">|</div>
          <button
            onClick={() => handleSortChange('recommend')}
            className={`${sort === 'recommend' ? 'font-bold text-blue-500' : ''}`}
          >
            추천순
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.postId} className="h-312 relative">
                <div className=" mb-2">
                  <img src={post.thumbnail} alt="Thumbnail" className="h-232 w-full object-cover rounded-lg" />
                  <div className="absolute bottom-24 right-2">
                    <button className="text-2xl">{post.likeByUser ? '❤️' : '🤍'}</button>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold mb-1">{post.location}서울시 강남구</div>
                  <div className="flex flex-wrap space-x-2">
                    <div className="text-sm">#{post.SeasonTag}</div>
                    <div className="text-sm">{post.WeatherTag.map((tag) => `#${tag}`).join(', ')}</div>
                    <div className="text-sm">{post.TempTag.map((tag) => `#${tag}`).join(', ')}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-2">게시물이 없습니다.</div>
          )}
        </div>
        {loading && <div className="text-center col-span-2">로딩 중...</div>}
        {!loading && hasMore && (
          <div className="text-center  col-span-2 mt-12">
            <button
              onClick={handleLoadMore}
              className="border-2 font-bold px-14 py-3 mb-24 hover:bg-primary-lightest  hover:text-white  rounded-lg"
            >
              더보기
            </button>
          </div>
        )}
        {!hasMore && (
          <div className="text-center col-span-2 mt-8 mb-24">
            <span className="font-bold  ">마지막 게시물입니다</span>
          </div>
        )}
      </div>
    </div>
  );
}
