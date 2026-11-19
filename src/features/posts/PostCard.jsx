import { useState } from 'react'
import { useDispatch } from 'react-redux'
import EditPostDialog from './EditPostDialog.jsx'
import TextEntryForm from './TextEntryForm.jsx'
import {
  commentAdded,
  commentDeleted,
  postDeleted,
  postEdited,
} from './postsSlice.js'

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false)
  const dispatch = useDispatch()

  return (
    <article className="post-card">
      <p className="post-text">{post.text}</p>

      {showComments ? (
        <section className="post-comments" aria-label="Комментарии к посту">
          <TextEntryForm
            label="Новый комментарий"
            placeholder="Новый комментарий ..."
            onAdd={(text) => dispatch(commentAdded(post.id, text))}
          />

          {post.comments.length > 0 && (
            <ul className="comment-list">
              {post.comments.map((comment) => (
                <li className="comment-row" key={comment.id}>
                  <p className="comment-text">{comment.text}</p>
                  <button
                    className="button-danger"
                    type="button"
                    aria-label={`Удалить комментарий: ${comment.text}`}
                    onClick={() =>
                      dispatch(
                        commentDeleted({
                          postId: post.id,
                          commentId: comment.id,
                        }),
                      )
                    }
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button type="button" onClick={() => setShowComments(false)}>
            Спрятать
          </button>
        </section>
      ) : (
        <div className="post-actions">
          <button type="button" onClick={() => setShowComments(true)}>
            Комментарии
          </button>

          <span className="comment-count">
            Количество комментариев - {post.comments.length}
          </span>

          <EditPostDialog
            text={post.text}
            onSave={(text) => dispatch(postEdited({ postId: post.id, text }))}
          />

          <button
            className="button-danger"
            type="button"
            aria-label="Удалить пост"
            onClick={() => dispatch(postDeleted(post.id))}
          >
            Удалить
          </button>
        </div>
      )}
    </article>
  )
}