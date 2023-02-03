/* eslint-disable react/prop-types */
import React from "react";
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

function TopBar({ showDrawerFilter }) {
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();
  return (
    <div>
      {(isMobile || isLittleMobile) && (
        <div className="flex items-center justify-between bg-white h-[9vh] pl-5 pr-5">
          <img
            src={filter}
            alt=""
            className="w-[7%]"
            onClick={() => showDrawerFilter()}
            aria-hidden
          />

          <div className="flex justify-center">
            <h1 className="font-main-font text-[#00C4CC] font-extrabold text-2xl">
              MusicMatch
            </h1>
          </div>
          <img src={search} alt="" className="w-[7%]" />
        </div>
      )}

      {isTablet && (
        <div className="flex items-center justify-between bg-white h-[10vh] pl-5 pr-5">
          <img
            src={filter}
            alt=""
            className="w-[6%]"
            onClick={() => showDrawerFilter()}
            aria-hidden
          />

          <div className="flex justify-center">
            <h1 className="font-main-font text-[#00C4CC] font-extrabold text-6xl">
              MusicMatch
            </h1>
          </div>
          <img src={search} alt="" className="w-[6%]" />
        </div>
      )}
      {isDesktop && (
        <div>
          <div className="flex justify-center">
            <h1 className="font-main-font text-[#00C4CC] font-extrabold text-7xl ml-[20vw] mt-20">
              MusicMatch
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
