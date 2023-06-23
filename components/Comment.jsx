export default function Comment({comment}){
    return(
        <div className='border p-2'>
            <h1>Comment0r: {comment.author}</h1>
            <p>{comment.body}</p>
        </div>
    )
}


//grab author and body