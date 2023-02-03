/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import relier from "../assets/relier.svg";
import message from "../assets/message.svg";
import relierActive from "../assets/relierActive.svg";
import messageActive from "../assets/messageActive.svg";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

import { useCurrentUserContext } from "../contexts/userContext";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

function BottomNav({ showDrawerMenu }) {
  const { isMobile, isTablet, isLittleMobile } = useCurrentResponsiveContext();
  const { user, isMatch } = useCurrentUserContext();

  const navigate = useNavigate();

  const [check, setCheck] = useState(false);

  const handleClick = () => {
    setCheck(!check);
  };

  return (
    <div>
      {(isMobile || isLittleMobile) && (
        <div className="flex items-center justify-between bg-white h-[9vh]">
          <div
            aria-hidden="true"
            className="flex flex-col justify-center items-center w-[15%] ml-5"
            onClick={() => {
              handleClick();
              navigate("/messages");
            }}
          >
            {isMatch ? (
              <img src={messageActive} alt="" className="w-[40%] mb-2" />
            ) : (
              <img src={message} alt="" className="w-[40%] mb-2" />
            )}

            <span
              className={`${
                isMatch
                  ? "font-main-font text-[0.7rem] font-bold text-[#00C4CC]"
                  : "font-main-font text-[0.7rem] font-bold"
              }`}
            >
              Messages
            </span>
          </div>
          <div
            aria-hidden="true"
            className="flex flex-col justify-center items-center w-[15%]"
            onClick={() => {
              handleClick();
              navigate("/");
            }}
          >
            <img src={relierActive} alt="" className="w-[40%] mb-2" />

            <span className="font-main-font text-[0.7rem] font-bold text-[#00C4CC]">
              Relier
            </span>
          </div>
          <div
            aria-hidden="true"
            className="flex flex-col justify-center items-center w-[15%] mr-5"
            onClick={() => showDrawerMenu()}
          >
            <img
              src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
              alt=""
              className="h-[4vh] w-[60%] rounded-full mb-2 object-cover"
            />
            <span className="font-main-font text-[0.7rem] font-bold">Menu</span>
          </div>
        </div>
      )}

      {isTablet && (
        <div className="flex items-center justify-between bg-white h-[10vh]">
          <div
            aria-hidden="true"
            className="flex flex-col justify-center items-center w-[15%] ml-5"
            onClick={() => {
              handleClick();
              navigate("/messages");
            }}
          >
            {check ? (
              <img src={messageActive} alt="" className="w-[40%] mb-2" />
            ) : (
              <img src={message} alt="" className="w-[40%] mb-2" />
            )}

            <span
              className={`${
                check
                  ? "font-main-font text-[1rem] font-bold text-[#00C4CC]"
                  : "font-main-font text-[1rem] font-bold"
              }`}
            >
              Messages
            </span>
          </div>
          <div
            aria-hidden="true"
            className="flex flex-col justify-center items-center w-[15%]"
            onClick={() => {
              handleClick();
              navigate("/");
            }}
          >
            {check ? (
              <img src={relier} alt="" className="w-[40%] mb-2" />
            ) : (
              <img src={relierActive} alt="" className="w-[40%] mb-2" />
            )}
            <span
              className={`${
                !check
                  ? "font-main-font text-[1rem] font-bold text-[#00C4CC]"
                  : "font-main-font text-[1rem] font-bold"
              }`}
            >
              Relier
            </span>
          </div>
          <div
            aria-hidden="true"
            className="flex flex-col justify-center items-center w-[15%] mr-5"
            onClick={() => showDrawerMenu()}
          >
            <img
              src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
              alt="avatar"
              className="h-[60px] w-[60px] rounded-full mb-2 object-cover"
            />

            {user.avatar === null && <p className="text-purple-500">hello</p>}

            <span className="font-main-font text-[1rem] font-bold">Menu</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BottomNav;
