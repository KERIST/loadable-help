import React, { useEffect } from "react";
import loadable from "@loadable/component";

const Loadable = loadable((prop) =>
  import(`../components/${prop.type}/${prop.type}`)
);

const HomePage = ({ blocks, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      {blocks.map(({ type, data }) => (
        <Loadable type={type}>{data}</Loadable>
      ))}
    </>
  );
};

export default HomePage;
