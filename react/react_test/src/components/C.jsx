import { memo, useMemo } from "react";

const Message = memo(({ msg }) => {
  return <p>{msg}</p>;
});

const ListItem = memo(({ post }) => {
  return <li key={post.id}>{post.title}</li>;
});

const List = memo(({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <ListItem key={post.id} post={post} />
      ))}
    </ul>
  );
});
// 제일 빠르지만 복잡한거 제외하고는 안씀 
const C = ({ msg, posts }) => {
  const memessage = useMemo(() => <Message msg={msg} />, [msg]);
  const melist = useMemo(() => <List posts={posts} />, [posts]);
  return (
    <>
      <h2>ccc</h2>
      {memessage}
      {melist}
    </>
  );
};

export default C;
