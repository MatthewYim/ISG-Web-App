import React from "react";

type Props = {};

const SearchPage = (props: Props) => {
  console.log(process.env.REACT_APP_AZURE_STORAGE_ACCOUNT);
  return <div>{process.env.REACT_APP_AZURE_STORAGE_ACCOUNT}</div>;
};

export default SearchPage;
