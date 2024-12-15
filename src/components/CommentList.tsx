import { Comment as CommentType } from '../types/api'
import { CommentItem } from './CommentItem'

import styles from './CommentList.module.css'

type Props = {
    comments: CommentType[]
}

function CommentList({comments}: Props) {
    return <div className={styles.container}>
        {comments?.length ? 
            comments.map(comment => (<div className={styles.item} key={comment.id}><CommentItem commentId={comment.id} /></div>))
        : <p>Type your heart out to find related comments.</p>}
    </div>
}

export { CommentList }
