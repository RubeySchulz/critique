import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_REPLY } from '../../utils/mutations';

import auth from '../../utils/auth';

function Reply({ reply, reviewId }) {
    const [deleteReply] = useMutation(DELETE_REPLY);

    const deleteHandler = async () => {
        try {
            deleteReply({
                variables: { reviewId, replyId: reply._id }
            })
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
            <h4>{reply.body}</h4>
        </div>
    )
}

export default Reply;