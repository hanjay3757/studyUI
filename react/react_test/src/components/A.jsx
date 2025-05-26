const A = ({ msg, posts }) => {
  return (
    <>
      <h2>A 컴포넌트</h2>
      <p>{msg}</p>
      <ul>
        {posts.map((posts) => {
          return <li>{posts}</li>;
        })}
      </ul>
    </>
  );
};
export default A;
