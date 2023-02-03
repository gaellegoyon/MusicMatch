import React, { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import nomessage from "../assets/nomessage.svg";
import { useCurrentUserContext } from "../contexts/userContext";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

function Messages() {
  const { matchInfo, isMatch, token } = useCurrentUserContext();
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  // useState user
  const [userInfo, setUserInfo] = useState([]);
  const [date, setDate] = useState();

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    setDate(Date().slice(0, 21));
    // recupération des user par l'id
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };
    if (isMatch) {
      fetch(`${BACK_END_URL}/api/users/${matchInfo}`, requestOptions)
        .then((response) => response.json())
        .then((response) => setUserInfo(response))
        .catch(() => {
          navigate("/login");
        });
    }
  }, []);

  return (
    <div>
      {(isLittleMobile || isMobile) && (
        <div className="w-full h-[100vh] bg-white flex flex-col items-center pb-4 ">
          <button
            type="button"
            className="w-[50px] h-[50px] rounded-full bg-gray-200 fixed left-[20rem] top-3"
            onClick={() => goBack()}
          >
            <CloseIcon color="gray" />
          </button>
          <h2 className="font-main-font font-extrabold text-2xl text-[#00C4CC] mt-20 mb-10">
            Mes Messages
          </h2>

          {!isMatch && (
            <div>
              <div className="flex flex-col justify-center items-center">
                <img src={nomessage} alt="" className="w-full h-[40%" />
                <div className="w-[80%]">
                  <h3 className="font-bold font-main-font text-center">
                    Vous n'avez actuellement aucun message
                  </h3>
                  <p className="text-sm font-main-font text-center">
                    Lorsque vous vous connectez avec une personne, elle
                    apparaîtra ici où vous pourrez lui envoyer un message.
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <Button
                  colorScheme="#00C4CC"
                  size="sm"
                  className="mt-20 relative bottom-4 font-main-font shadow bg-[#00C4CC]"
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  Commencez à découvrir !
                </Button>
              </div>
            </div>
          )}

          {isMatch && (
            <div
              className="flex justify-between items-center w-full bg-slate-100 h-[10vh]
      "
            >
              <div className="flex flex-start ml-4">
                <Avatar
                  src={`${BACK_END_URL}/api/avatars/${userInfo.avatar}`}
                  size="large"
                />
                <div className="ml-4">
                  <h3 className="font-main-font font-bold">
                    @{userInfo.artistname}
                  </h3>
                  <p className="font-main-font text-sm">C'est un match ! 🎸</p>
                </div>
              </div>

              <div className="w-[30%]">
                <p className="mr-4">{date}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {(isDesktop || isTablet) && (
        <div className="w-full h-[100vh] bg-white flex flex-col items-center pb-4 ">
          <button
            type="button"
            className="w-[50px] h-[50px] rounded-full bg-gray-200 fixed left-[10rem] top-3"
            onClick={() => goBack()}
          >
            <CloseIcon color="gray" />
          </button>
          <h2 className="font-main-font font-extrabold text-6xl text-[#00C4CC] mt-20 mb-10">
            Mes Messages
          </h2>

          {!isMatch && (
            <div>
              <div className="flex flex-col justify-center items-center">
                <img src={nomessage} alt="" className="w-full h-[50vh]" />
                <div className="w-[80%]">
                  <h3 className="font-bold font-main-font text-center">
                    Vous n'avez actuellement aucun message
                  </h3>
                  <p className="text-sm font-main-font text-center">
                    Lorsque vous vous connectez avec une personne, elle
                    apparaîtra ici où vous pourrez lui envoyer un message.
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <Button
                  colorScheme="#00C4CC"
                  size="sm"
                  className="mt-20 relative bottom-4 font-main-font shadow bg-[#00C4CC]"
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  Commencez à découvrir !
                </Button>
              </div>
            </div>
          )}

          {isMatch && (
            <div
              className="flex justify-between items-center w-full bg-slate-100 h-[10vh]
      "
            >
              <div className="flex flex-start ml-4">
                <Avatar
                  src={`${BACK_END_URL}/api/avatars/${matchInfo.avatar}`}
                  size="large"
                />
                <div className="ml-4">
                  <h3 className="font-main-font font-bold">
                    @{matchInfo.artistname}
                  </h3>
                  <p className="font-main-font text-sm">C'est un match ! 🎸</p>
                </div>
              </div>

              <div>
                <p className="mr-4">3 fev</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Messages;
