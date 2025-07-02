import { GetServerSideProps } from 'next';

interface Post {
  id: number;
  title: string;
  content: string;
  writer:string;
}

interface Props {
  posts: Post[];
}

export default function PostsPage({ posts }: Props) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>SSR 게시글 목록</h1>
      <ul style={{marginTop:'1em'}}>
        {posts.map((post) => (
          <li key={post.id} style={{borderBottom:1, borderStyle:'solid', borderColor:'#ccc'}}>
            <strong>{post.title}</strong>
            <p>[작성자: {post.writer}]  {post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// SSR로 API 데이터 가져오기
export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const res = await fetch('http://localhost:7777/api/posts')
  const resJson = await res.json();
  const posts: Post[] =resJson.data;

  return {
    props: {
      posts,
    },
  };
};
