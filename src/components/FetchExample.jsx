import React, { useEffect, useState } from 'react'

const FetchExample = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await response.json();
                setPost(data);
                
            } catch (error) {

            };
        }
        fetchData();

    },[])
    console.log(post);
    return (
        <div>
            {/* jsonplaceholder에서 데이터 가져오기 */}
            <h2>post-fetch</h2>
            <ul>
                {post.map(post =>(
                    <li>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default FetchExample
