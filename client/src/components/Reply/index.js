import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_REPLY } from '../../utils/mutations';

import auth from '../../utils/auth';

function Reply({ reply, reviewId }) {
    const [deleteReply] = useMutation(DELETE_REPLY);

    const deleteHandler = async () => {
        try {
            const { data } = deleteReply({
                variables: { reviewId, replyId: reply._id }
            })

            console.log(data);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="d-flex flex-wrap">
            <div className='row col-3'>
                <Link className='no-decorate' to={'/profile/'.concat(reply.user.username)} >
                    <h1 className='inline'>{reply.user.username}</h1><h6 className='inline ml-3'>{reply.user.title}</h6>  
                </Link>
                {auth.getProfile().data._id === reply.user._id && (
                    <button onClick={deleteHandler}>delete</button>
                )}
            </div>
            <h4 className='row col-12'>{reply.body}</h4>
        </div>
    )
}

export default Reply;