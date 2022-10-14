import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_REPLY, DELETE_NESTED_REPLY } from '../../utils/mutations';
import { useParams } from 'react-router-dom';

import auth from '../../utils/auth';

function Reply({ reply, reviewId }) {
    const { replyId } = useParams();

    const [deleteReply] = useMutation(DELETE_REPLY);
    const [deleteNestedReply] = useMutation(DELETE_NESTED_REPLY);

    const deleteHandler = async () => {
        try {
            if(window.location.href.includes('reply')){
                deleteNestedReply({
                    variables: { parentId: replyId, replyId: reply._id }
                })
            } else {
                deleteReply({
                    variables: { reviewId, replyId: reply._id }
                })
            }
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="d-flex flex-wrap">
            <div>
                <Link className='no-decorate' to={'/profile/'.concat(reply.user.username)} >
                    <h1 className='inline'>{reply.user.username}</h1><h6 className='inline ml-3'>{reply.user.title}</h6>  
                </Link>
                {auth.getProfile().data._id === reply.user._id && (
                    <button className='ml-2' onClick={deleteHandler}>delete</button>
                )}
            </div>
            <Link className='no-decorate' to={'/reply/'.concat(reviewId + '/' + reply._id)}>
                <h4>{reply.body}</h4>
            </Link>
        </div>
    )
}

export default Reply;