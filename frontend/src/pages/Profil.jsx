import React, { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import music from "../assets/music.svg";
import { useCurrentUserContext } from "../contexts/userContext";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

// CALL DU BACK

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

function Profil() {
  // context
  const { token, userID } = useCurrentUserContext();
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();

  // useState user
  const [userInfo, setUserInfo] = useState([]);

  // useState skill
  const [skillInfo, setSkillInfo] = useState([]);

  // useState style
  const [styleInfo, setStyleInfo] = useState([]);

  // navigation
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    // recupération des user par l'id
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${BACK_END_URL}/api/users/${userID}`, requestOptions)
      .then((response) => response.json())
      .then((response) => setUserInfo(response))
      .catch(() => {
        navigate("/login");
      });

    // recupération des skills par l'id

    fetch(`${BACK_END_URL}/api/skills/${userID}`, requestOptions)
      .then((response) => response.json())
      .then((response) => setSkillInfo(response))
      .catch(() => {});

    // recupération des styles par l'id

    fetch(`${BACK_END_URL}/api/styles/${userID}`, requestOptions)
      .then((response) => response.json())
      .then((response) => setStyleInfo(response))
      .catch(() => {});
  }, []);

  return (
    <div>
      {(isLittleMobile || isMobile) && (
        <div className="w-full h-auto bg-white flex flex-col items-center pb-4">
          <button
            type="button"
            className="w-[50px] h-[50px] rounded-full bg-gray-200 fixed left-[20rem] top-3"
            onClick={() => goBack()}
          >
            <CloseIcon color="gray" />
          </button>
          <img
            src={`${BACK_END_URL}/api/avatars/${userInfo.avatar}`}
            alt=""
            className="w-full h-[55vh] object-cover"
          />

          <button
            type="button"
            className="relative bottom-7 button-2 w-[50px] h-[50px] flex justify-center items-center z-50"
          >
            <img src={music} alt="" className="w-[50%]" />
          </button>
          <h2 className="font-main-font font-bold text-2xl mb-2">
            {userInfo.artistname},{" "}
            <span className="font-light">{userInfo.age}</span>
          </h2>
          <p className="font-main-font text-[0.8rem]">{userInfo.city}</p>
          <div className="flex justify-around w-[70%] mt-4 flex-wrap">
            {skillInfo.map((skill) => (
              <Tag
                colorScheme="cyan"
                className="mb-2 w-auto h-auto"
                key={skill.id}
              >
                {skill.skillname}
              </Tag>
            ))}
          </div>
          <div className="flex justify-around w-[70%] mt-4 flex-wrap">
            {styleInfo.map((style) => (
              <Tag
                key={style.id}
                colorScheme="purple"
                className="mb-2 w-auto h-auto"
              >
                #{style.stylename}
              </Tag>
            ))}
          </div>

          <p className="w-[90%] text-left font-main-font text-sm mt-4 mb-4 ml-4">
            Biographie
          </p>
          <div className="w-[90%] h-auto bg-gray-200 rounded-xl p-4 leading-4">
            <span className="font-main-font text-[0.7rem]">
              {userInfo.biography}
            </span>
          </div>

          <p className="w-[90%] text-left font-main-font text-sm mt-4 mb-4 ml-4">
            Réseaux sociaux
          </p>
          <div className="flex justify-center items-center">
            <a href={userInfo.youtube} className="w-[15%] mr-8">
              <img
                alt=""
                className="object-contain "
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c545.png"
              />
            </a>
            <a href={userInfo.soundcloud} className="w-[15%] ml-8">
              <img
                alt=""
                className=" object-contain "
                src="https://upload.wikimedia.org/wikipedia/fr/b/bb/SoundCloud_logo.png"
              />
            </a>
          </div>
        </div>
      )}{" "}
      {isTablet && (
        <div className="w-full h-auto bg-white flex flex-col items-center pb-4">
          <button
            type="button"
            className="w-[50px] h-[50px] rounded-full bg-gray-200 fixed left-[55rem] top-20"
            onClick={() => goBack()}
          >
            <CloseIcon color="gray" />
          </button>
          <img
            src={`${BACK_END_URL}/api/avatars/${userInfo.avatar}`}
            alt=""
            className="w-full h-[55vh] object-cover"
          />

          <button
            type="button"
            className="relative bottom-7 button-2 w-[50px] h-[50px] flex justify-center items-center z-50"
          >
            <img src={music} alt="" className="w-[50%]" />
          </button>
          <h2 className="font-main-font font-bold text-2xl mb-2">
            {userInfo.artistname},{" "}
            <span className="font-light">{userInfo.age}</span>
          </h2>
          <p className="font-main-font text-[0.8rem]">{userInfo.city}</p>
          <div className="flex justify-around w-[70%] mt-4 flex-wrap">
            {skillInfo.map((skill) => (
              <Tag
                colorScheme="cyan"
                className="mb-2 w-auto h-auto"
                key={skill.id}
              >
                {skill.skillname}
              </Tag>
            ))}
          </div>
          <div className="flex justify-around w-[70%] mt-4 flex-wrap">
            {styleInfo.map((style) => (
              <Tag
                key={style.id}
                colorScheme="purple"
                className="mb-2 w-auto h-auto"
              >
                #{style.stylename}
              </Tag>
            ))}
          </div>

          <p className="w-[90%] text-left font-main-font text-sm mt-4 mb-4 ml-4">
            Biographie
          </p>
          <div className="w-[90%] h-auto bg-gray-200 rounded-xl p-4 leading-4">
            <span className="font-main-font text-[0.7rem]">
              {userInfo.biography}
            </span>
          </div>

          <p className="w-[90%] text-left font-main-font text-sm mt-4 mb-4 ml-4">
            Réseaux sociaux
          </p>
          <div className="flex justify-center items-center">
            <a href={userInfo.youtube} className="w-[15%] mr-8">
              <img
                alt=""
                className="object-contain "
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c545.png"
              />
            </a>
            <a href={userInfo.soundcloud} className="w-[15%] ml-8">
              <img
                alt=""
                className=" object-contain "
                src="https://upload.wikimedia.org/wikipedia/fr/b/bb/SoundCloud_logo.png"
              />
            </a>
          </div>
        </div>
      )}{" "}
      {isDesktop && (
        <div className="w-full h-[100vh] bg-[#121640]  justify-center flex items-center pb-4">
          <button
            type="button"
            className="w-[80px] h-[80px] rounded-full bg-gray-200 fixed left-[100rem] top-8"
            onClick={() => goBack()}
          >
            <CloseIcon color="gray" />
          </button>
          <img
            src={`${BACK_END_URL}/api/avatars/${userInfo.avatar}`}
            alt=""
            className="w-[30%] h-[80vh] object-cover rounded-3xl mt-20 ml-20"
          />

          <div className="flex flex-col w-full items-center">
            <h2 className="font-main-font text-white font-bold text-7xl mb-2 mt-40">
              {userInfo.artistname},{" "}
              <span className="font-light">{userInfo.age}</span>
            </h2>
            <p className="font-main-font text-[0.8rem]">{userInfo.city}</p>
            <div className="flex justify-around w-[30%] mt-4 flex-wrap">
              {skillInfo.map((skill) => (
                <Tag
                  colorScheme="cyan"
                  className="mb-2 w-auto h-auto"
                  size="lg"
                  key={skill.id}
                >
                  {skill.skillname}
                </Tag>
              ))}
            </div>
            <div className="flex justify-around w-[30%] mt-20 flex-wrap">
              {styleInfo.map((style) => (
                <Tag
                  key={style.id}
                  colorScheme="purple"
                  className="mb-2 w-auto h-auto"
                  size="lg"
                >
                  #{style.stylename}
                </Tag>
              ))}
            </div>

            <p className="w-[90%] text-left font-main-font text-sm mt-4 mb-4 ml-4">
              Biographie
            </p>
            <div className="w-[40%] h-auto bg-gray-200 rounded-xl p-8 leading-4">
              <span className="font-main-font text-[1.1rem]">
                {userInfo.biography}
              </span>
            </div>

            <p className="w-[90%] text-left font-main-font text-sm mt-4 mb-4 ml-4">
              Réseaux sociaux
            </p>
            <div className="flex justify-center items-center mb-20 mt-20">
              <a href={userInfo.youtube} className="w-[13%] mr-8">
                <img
                  alt=""
                  className="object-contain "
                  src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c545.png"
                />
              </a>
              <a href={userInfo.soundcloud} className="w-[13%] ml-8">
                <img
                  alt=""
                  className=" object-contain "
                  src="https://upload.wikimedia.org/wikipedia/fr/b/bb/SoundCloud_logo.png"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profil;
