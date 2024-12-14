import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './state/store';
import {
  decrement,
  increment,
  incrementByAmount,
} from './state/slice/counterSlice';
import { useEffect } from 'react';
import { fetchPosts } from './state/slice/postSlice';

export default function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const { posts, error, loading } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-x-4">
        <button
          onClick={() => dispatch(decrement())}
          disabled={count === 0}
          className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
        >
          Decrement
        </button>
        <span className="text-neutral-900 text-base border border-neutral-800 rounded-md px-2 py-1">
          {count}
        </span>
        <button
          onClick={() => dispatch(increment())}
          className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(10))}
          className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
        >
          Increment by Amount
        </button>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul className="grid grid-cols-4 gap-4">
            {posts.map((post) => {
              return (
                <li key={post.id} className="flex flex-col gap-y-1">
                  <h3 className="text-neutral-800 font-medium text-base">
                    {post.title.length > 20
                      ? post.title.slice(0, 20) + '...'
                      : post.title}
                  </h3>
                  <p className="text-neutral-700 text-sm">
                    {post.body.length > 150 ? post.body + '...' : post.body}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
