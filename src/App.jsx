import { useDispatch, useSelector } from 'react-redux'
import PostCard from './features/posts/PostCard.jsx'
import TextEntryForm from './features/posts/TextEntryForm.jsx'
import { postAdded, selectPosts } from './features/posts/postsSlice.js'

export default function App() {
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()

  return (
    <main className="feed">
      <TextEntryForm
        label="Новый пост"
        placeholder="Новый пост ..."
        onAdd={(text) => dispatch(postAdded(text))}
      />

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}