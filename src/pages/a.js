const a = ({ dt }) => {
  console.log(dt);
  return <div>{`Helle${dt}`}</div>;
};

export default a;
export async function getServerSideProps(context) {
  console.log(context.query);
  const dt = context.req.body;
  return {
    props: { dt }, // will be passed to the page component as props
  };
}
