import React from "react";
import AnalyticsNavBar from "../../Components/Navbar/AnalyticsNavBar/AnalyticsNavBar";
import ProductNavBar from "../../Components/Navbar/ProductNavBar/ProductNavBar";
import ContentNavBar from "../../Components/Navbar/ContentNavBar/ContentNavBar";
import UserInfoCard from "../../Components/Card/UserInfoCard/UserInfoCard";

type Props = {};

const UserPage = (props: Props) => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen z-50 bg-gray-100">
      <div className="h-screen w-64 pb-10">
        <div className="flex h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
          <UserInfoCard />
          <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
            Analytics
          </span>
          <div className="flex mt-3 flex-1 flex-col">
            <div className="">
              <AnalyticsNavBar />
              <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                Product Mangement
              </span>
              <ProductNavBar />
              <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                Content Management
              </span>
              <ContentNavBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
