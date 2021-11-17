import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";

import { useLocation } from "react-router-dom";

const Page = loadable((props) => import(`./${props.type}`));

const LoadablePage = ({ serverData }) => {
  const { pathname } = useLocation();
  const [requestData, setRequestData] = useState(serverData || {});
  const [serverLoaded, setServerLoaded] = useState(true);

  if (serverLoaded && !serverData) {
    setServerLoaded(false);
    setRequestData(window.initial_data);
  }

  useEffect(() => {
    // some async data fetching
  }, [pathname]);

  const LoadedPage = () => {
    const {
      meta: { type },
      header,
      footer,
      blocks,
      title,
    } = requestData;
    return (
      <Page
        type={type}
        header={header}
        footer={footer}
        blocks={blocks}
        title={title}
      />
    );
  };

  return <LoadedPage />;
};

export default LoadablePage;
