import { GetServerSideProps } from 'next';

interface Post {
  id: number;
  title: string;
  content: string;
  name:string;
  wdate?:string;
  file?:string;
}

interface Props {
  post: Post | null;
}

export default function PostDetail({ post }: Props) {
  if (!post) return <p>해당 게시글을 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <h4>작성자: {post.name} [작성일: {post.wdate}]</h4>
      <img src={`http://localhost:7777/uploads/${post.file}`} alt={post.file} style={{width:'40%'}}></img>
      <p>{post.content}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.params!;
//   Next.js에서 SSR 함수인 getServerSideProps나 SSG 함수인 getStaticProps 안에서 동적 파라미터를 받을 때는 context.params를 사용

  try {
    const res = await fetch(`http://localhost:7777/api/posts/${postId}`);

    if (!res.ok) {
      return { props: { post: null } };
    }

    const jsonData = await res.json();

     const post = jsonData?.data[0] ?? null;
    console.log('post==> ', post)

    return {
      props: { post },
    };
  } catch (err) {
    console.error('API 호출 오류:', err);
    return { props: { post: null } };
  }
};
