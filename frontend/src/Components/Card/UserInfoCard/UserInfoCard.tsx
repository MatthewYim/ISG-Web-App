import React from "react";

type Props = {};

const UserInfoCard = (props: Props) => {
  return (
    <div className="flex mt-10 items-center px-4">
      <img
        className="h-12 w-auto max-w-full align-middle"
        src="/images/R-Wx_NHvZBci3KLrgXhp1.png"
        alt=""
      />
      <div className="flex ml-3 flex-col">
        <h3 className="font-medium">Sarah Carter</h3>
        <p className="text-xs text-gray-500">Sr. Engineer</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
