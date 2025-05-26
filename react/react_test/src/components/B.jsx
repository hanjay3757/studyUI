import { memo } from "react";
const Message = memo(({ msg }) => {
  return <p>{msg}</p>;
});

const ListItem = memo(({ post }) => {
  return <li key={post.id}>{post.title}</li>;
});
const List = memo(({ posts }) => {
  return (
    <ul>
      {posts.map((post) => {
        return <ListItem post={post} />;
      })}
    </ul>
  );
});
const B = ({ msg, posts }) => {
  return (
    <>
      <h2>bbb</h2>
      <Message msg={msg} />
      <List posts={posts} />
    </>
  );
};
export default B;
