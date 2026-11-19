import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: 'example-post',
    text: 'Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.',
    comments: [
      {
        id: 'example-comment-1',
        text: 'Первый комментарий о выше сказанном посте ...',
      },
      {
        id: 'example-comment-2',
        text: 'Второй комментарий о выше сказанном посте ...',
      },
    ],
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      prepare(text) {
        return { payload: { id: nanoid(), text: text.trim(), comments: [] } }
      },
      reducer(state, { payload }) {
        if (payload.text) state.unshift(payload)
      },
    },

    postEdited(state, { payload: { postId, text } }) {
      const post = state.find((item) => item.id === postId)
      const trimmedText = text.trim()

      if (post && trimmedText) post.text = trimmedText
    },

    postDeleted(state, { payload: postId }) {
      return state.filter((post) => post.id !== postId)
    },

    commentAdded: {
      prepare(postId, text) {
        return {
          payload: { postId, comment: { id: nanoid(), text: text.trim() } },
        }
      },
      reducer(state, { payload: { postId, comment } }) {
        const post = state.find((item) => item.id === postId)

        if (post && comment.text) post.comments.push(comment)
      },
    },

    commentDeleted(state, { payload: { postId, commentId } }) {
      const post = state.find((item) => item.id === postId)

      if (post) {
        post.comments = post.comments.filter((comment) => comment.id !== commentId)
      }
    },
  },
})

export const { postAdded, postEdited, postDeleted, commentAdded, commentDeleted } =
  postsSlice.actions

export const selectPosts = (state) => state.posts

export default postsSlice.reducer