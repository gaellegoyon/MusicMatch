/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import music from "../assets/music.svg";
import cross from "../assets/cross.svg";
import { useCurrentUserContext } from "../contexts/userContext";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

// APPEL DU BACK

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

function CardUser({
  pass,
  like,
  match,
  activeFilter,
  skillID,
  setCounter,
  counter,
}) {
  // CONTEXT
  const {
    token,
    user,
    userID,
    setUserID,
    setIsMatch,
    isMatch,
    setMatchInfo,
    getSlide,
    setGetSlide,
  } = useCurrentUserContext();
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();

  // List USER pour le map des cartes
  const [userList, setUserList] = useState([]);

  // STATES POUR LE POST DES LIKES
  const [user1_id] = useState(user.id);
  const [user2_id, setUser2ID] = useState();
  const [isliked, setIsLiked] = useState();
  const [isshown, setIsShown] = useState();

  // STATE POUR LE FILTRE
  const [userListFiltered, setUserListFiltered] = useState([]);

  // recupération des likes.
  const [likeList, setLikeList] = useState([]);

  // USER LIKE DONC ON VIRE LA CARTE
  const [likeActive, setLikeActive] = useState(false);

  // USER DISLIKE on garde la carte
  const [dislikeActive, setDislikeActive] = useState(false);

  // navigation
  const navigate = useNavigate();

  // REF POUR LE CAROUSSEL DES CARTES
  const carousel = React.createRef();

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    headers: myHeaders,
  };

  useEffect(() => {
    // recupération des users.

    fetch(`${BACK_END_URL}/api/users`, requestOptions)
      .then((response) => response.json())
      .then((response) => setUserList(response))
      .catch(() => {
        navigate("/login");
      });
  }, [counter]);

  // recupération des users filtrés.
  useEffect(() => {
    if (activeFilter) {
      fetch(`${BACK_END_URL}/api/filter/${skillID}`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          setUserListFiltered(response);
        })
        .catch(() => {
          navigate("/login");
        });
    }
  }, [counter]);

  useEffect(() => {
    // recupération des likes.

    fetch(`${BACK_END_URL}/api/likes/${1}/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((response) => setLikeList(response))
      .catch(() => {
        console.warn("pas de match...");
      });
  }, [counter]);

  const handleLike = (person) => {
    // ON VERIFIE SI LIKE OU MATCH
    if (likeList.length === 1) {
      if (likeList[0].user1_id === person) {
        setIsMatch(!isMatch);
        setMatchInfo(person);
        match();
      } else {
        like();
      }
    } else if (likeList.length > 1) {
      const check = likeList.find((element) => element.user1_id === person);

      if (check !== undefined) {
        setIsMatch(!isMatch);
        setMatchInfo(person);
        match();
      } else {
        like();
      }
    } else {
      like();
    }

    setLikeActive(true);
  };

  // POST DES LIKES DU USER

  const body = JSON.stringify({
    user1_id,
    user2_id,
    isliked,
    isshown,
  });

  const POSTrequestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  useEffect(() => {
    if (likeActive === true || dislikeActive === true) {
      fetch(`${BACK_END_URL}/api/likes`, POSTrequestOptions)
        .then((response) => response.json())
        .then(() => {
          setLikeActive(false);
          setCounter(counter + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  // FONCTION DISLIKE
  const handleDislike = () => {
    pass();

    setDislikeActive(true);
  };

  // POST DISLIKE
  useEffect(() => {
    if (dislikeActive === true && likeActive === false) {
      fetch(`${BACK_END_URL}/api/likes`, POSTrequestOptions)
        .then((response) => response.json())
        .then(() => {
          setDislikeActive(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const onChange = (currentSlide) => {
    setGetSlide(currentSlide);
  };

  return (
    <div>
      {(isMobile || isLittleMobile) && (
        <div>
          <Carousel
            ref={carousel}
            speed="300"
            afterChange={onChange}
            initialSlide={getSlide}
          >
            {!activeFilter &&
              userList
                .filter((person) => person.id !== user.id)
                .map((character) => (
                  <div key={character.id} className="flex justify-center">
                    <div className="w-auto bg-white rounded-lg h-[77vh] flex flex-col items-center ml-5 mr-5 bg-musicActive">
                      <img
                        src={`${BACK_END_URL}/api/avatars/${character.avatar}`}
                        alt=""
                        className="w-full h-[55vh] object-cover rounded-t-lg"
                      />

                      <Button
                        colorScheme="#00C4CC"
                        size="sm"
                        className="relative bottom-4 font-main-font shadow bg-gray-600"
                        onClick={() => {
                          setUserID(character.id);

                          navigate(`/profil/${userID}`);
                        }}
                      >
                        Voir le profil
                      </Button>
                      <div className="flex w-[88%] justify-between pt-4">
                        <button
                          type="button"
                          className="relative bottom-4 button-3 w-[50px] h-[50px] flex justify-center items-center"
                          onClick={() => {
                            setUser2ID(character.id);
                            setIsLiked(false);
                            setIsShown(true);
                            handleDislike();
                            carousel.current.next();
                          }}
                        >
                          <img src={cross} alt="" className="w-[45%]" />
                        </button>

                        <button
                          type="button"
                          className="relative bottom-4 button-2 w-[50px] h-[50px] flex justify-center items-center z-50"
                          onClick={() => {
                            setUser2ID(character.id);
                            setIsLiked(true);
                            setIsShown(false);
                            handleLike(character.id);
                            carousel.current.next();
                          }}
                        >
                          <img src={music} alt="" className="w-[50%]" />
                        </button>
                      </div>

                      <h2 className="font-main-font font-bold text-2xl mb-1 mt-[-4rem]">
                        {character.artistname},{" "}
                        <span className="font-light">{character.age}</span>
                      </h2>
                      <p className="font-main-font text-[0.8rem] mb-2">
                        {character.city}
                      </p>

                      <div className="flex w-full justify-center items-center">
                        <img
                          alt=""
                          className="w-[12%] object-contain "
                          src="https://www.specialolympics.asso.fr/wp-content/uploads/2020/04/youtube-logo-icon-transparent-32.png"
                        />
                        <img
                          alt=""
                          className="w-[11%] object-contain "
                          src="http://store-images.s-microsoft.com/image/apps.39427.14398308773733109.53eed167-276f-443c-a7a5-c0d635242775.5b476efc-087d-4b27-8b9d-10b26705472d"
                        />
                      </div>
                    </div>
                  </div>
                ))}

            {activeFilter &&
              userListFiltered
                .filter((person) => person.id !== user.id)
                .map((character) => (
                  <div key={character.id} className="flex justify-center">
                    <div className="w-auto bg-white rounded-lg h-[77vh] flex flex-col items-center ml-5 mr-5 bg-musicActive">
                      <img
                        src={`${BACK_END_URL}/api/avatars/${character.avatar}`}
                        alt=""
                        className="w-full h-[55vh] object-cover rounded-t-lg"
                      />

                      <Button
                        colorScheme="#00C4CC"
                        size="sm"
                        className="relative bottom-4 font-main-font shadow bg-gray-600"
                        onClick={() => {
                          setUserID(character.id);

                          navigate(`/profil/${userID}`);
                        }}
                      >
                        Voir le profil
                      </Button>
                      <div className="flex w-[88%] justify-between pt-4">
                        <button
                          type="button"
                          className="relative bottom-4 button-3 w-[50px] h-[50px] flex justify-center items-center"
                          onClick={() => {
                            setUser2ID(character.id);

                            setIsLiked(false);
                            setIsShown(true);
                            handleDislike();
                            carousel.current.next();
                          }}
                        >
                          <img src={cross} alt="" className="w-[45%]" />
                        </button>

                        <button
                          type="button"
                          className="relative bottom-4 button-2 w-[50px] h-[50px] flex justify-center items-center z-50"
                          onClick={() => {
                            setUser2ID(character.id);

                            setIsLiked(true);
                            setIsShown(false);

                            handleLike(character.id);

                            carousel.current.next();
                          }}
                        >
                          <img src={music} alt="" className="w-[50%]" />
                        </button>
                      </div>

                      <h2 className="font-main-font font-bold text-2xl mb-1 mt-[-4rem]">
                        {character.artistname},{" "}
                        <span className="font-light">{character.age}</span>
                      </h2>
                      <p className="font-main-font text-[0.8rem] mb-2">
                        {character.city}
                      </p>

                      <div className="flex w-full justify-center items-center">
                        <img
                          alt=""
                          className="w-[12%] object-contain "
                          src="https://www.specialolympics.asso.fr/wp-content/uploads/2020/04/youtube-logo-icon-transparent-32.png"
                        />
                        <img
                          alt=""
                          className="w-[11%] object-contain "
                          src="http://store-images.s-microsoft.com/image/apps.39427.14398308773733109.53eed167-276f-443c-a7a5-c0d635242775.5b476efc-087d-4b27-8b9d-10b26705472d"
                        />
                      </div>
                    </div>
                  </div>
                ))}
          </Carousel>
        </div>
      )}

      {isDesktop && (
        <div>
          <Carousel
            ref={carousel}
            swipe={false}
            speed="300"
            afterChange={onChange}
            initialSlide={getSlide}
          >
            {!activeFilter &&
              userList
                .filter((person) => person.id !== user.id)
                .map((character) => (
                  <div
                    key={character.id}
                    className="flex justify-center ml-[45vw]"
                  >
                    <div className="w-[30%] bg-white rounded-xl h-[77vh] flex flex-col items-center ml-5 mr-5 bg-musicActive ">
                      <img
                        src={`${BACK_END_URL}/api/avatars/${character.avatar}`}
                        alt=""
                        className="w-full h-[55vh] object-cover rounded-t-lg"
                      />

                      <Button
                        colorScheme="#00C4CC"
                        size="md"
                        className="relative bottom-4 font-main-font shadow bg-gray-600"
                        onClick={() => {
                          setUserID(character.id);

                          navigate(`/profil/${userID}`);
                        }}
                      >
                        Voir le profil
                      </Button>
                      <div className="flex w-[88%] justify-between pt-4">
                        <button
                          type="button"
                          className="relative bottom-4 button-3 w-[60px] h-[60px] flex justify-center items-center"
                          onClick={() => {
                            setUser2ID(character.id);
                            setIsLiked(false);
                            setIsShown(true);
                            handleDislike();
                            carousel.current.next();
                          }}
                        >
                          <img src={cross} alt="" className="w-[45%]" />
                        </button>

                        <button
                          type="button"
                          className="relative bottom-4 button-2 w-[60px] h-[60px] flex justify-center items-center z-50"
                          onClick={() => {
                            setUser2ID(character.id);
                            setIsLiked(true);
                            setIsShown(false);
                            handleLike(character.id);
                            carousel.current.next();
                          }}
                        >
                          <img src={music} alt="" className="w-[50%]" />
                        </button>
                      </div>

                      <h2 className="font-main-font font-bold text-3xl mb-1 mt-[-4rem]">
                        {character.artistname},{" "}
                        <span className="font-light">{character.age}</span>
                      </h2>
                      <p className="font-main-font text-[1rem] mb-2">
                        {character.city}
                      </p>

                      <div className="flex w-full justify-center items-center">
                        <img
                          alt=""
                          className="w-[12%] object-contain "
                          src="https://www.specialolympics.asso.fr/wp-content/uploads/2020/04/youtube-logo-icon-transparent-32.png"
                        />
                        <img
                          alt=""
                          className="w-[11%] object-contain "
                          src="http://store-images.s-microsoft.com/image/apps.39427.14398308773733109.53eed167-276f-443c-a7a5-c0d635242775.5b476efc-087d-4b27-8b9d-10b26705472d"
                        />
                      </div>
                    </div>
                  </div>
                ))}

            {activeFilter &&
              userListFiltered
                .filter((person) => person.id !== user.id)
                .map((character) => (
                  <div key={character.id} className="flex justify-center">
                    <div className="w-auto bg-white rounded-lg h-[77vh] flex flex-col items-center ml-5 mr-5 bg-musicActive">
                      <img
                        src={`${BACK_END_URL}/api/avatars/${character.avatar}`}
                        alt=""
                        className="w-full h-[55vh] object-cover rounded-t-lg"
                      />

                      <Button
                        colorScheme="#00C4CC"
                        size="sm"
                        className="relative bottom-4 font-main-font shadow bg-gray-600"
                        onClick={() => {
                          setUserID(character.id);

                          navigate(`/profil/${userID}`);
                        }}
                      >
                        Voir le profil
                      </Button>
                      <div className="flex w-[88%] justify-between pt-4">
                        <button
                          type="button"
                          className="relative bottom-4 button-3 w-[50px] h-[50px] flex justify-center items-center"
                          onClick={() => {
                            setUser2ID(character.id);

                            setIsLiked(false);
                            setIsShown(true);
                            handleDislike();
                            carousel.current.next();
                          }}
                        >
                          <img src={cross} alt="" className="w-[45%]" />
                        </button>

                        <button
                          type="button"
                          className="relative bottom-4 button-2 w-[50px] h-[50px] flex justify-center items-center z-50"
                          onClick={() => {
                            setUser2ID(character.id);

                            setIsLiked(true);
                            setIsShown(false);

                            handleLike(character.id);

                            carousel.current.next();
                          }}
                        >
                          <img src={music} alt="" className="w-[50%]" />
                        </button>
                      </div>

                      <h2 className="font-main-font font-bold text-2xl mb-1 mt-[-4rem]">
                        {character.artistname},{" "}
                        <span className="font-light">{character.age}</span>
                      </h2>
                      <p className="font-main-font text-[0.8rem] mb-2">
                        {character.city}
                      </p>

                      <div className="flex w-full justify-center items-center">
                        <img
                          alt=""
                          className="w-[12%] object-contain "
                          src="https://www.specialolympics.asso.fr/wp-content/uploads/2020/04/youtube-logo-icon-transparent-32.png"
                        />
                        <img
                          alt=""
                          className="w-[11%] object-contain "
                          src="http://store-images.s-microsoft.com/image/apps.39427.14398308773733109.53eed167-276f-443c-a7a5-c0d635242775.5b476efc-087d-4b27-8b9d-10b26705472d"
                        />
                      </div>
                    </div>
                  </div>
                ))}
          </Carousel>
        </div>
      )}

      {isTablet && (
        <div className="">
          <Carousel
            ref={carousel}
            swipe={false}
            initialSlide={getSlide}
            speed="300"
            afterChange={onChange}
          >
            {!activeFilter &&
              userList
                .filter((person) => person.id !== user.id)
                .map((character) => (
                  <div
                    key={character.id}
                    className="flex justify-center ml-[13vw]"
                  >
                    <div className="w-[70%] bg-white rounded-xl h-[77vh] flex flex-col items-center ml-5 mr-5 bg-musicActive">
                      <img
                        src={`${BACK_END_URL}/api/avatars/${character.avatar}`}
                        alt=""
                        className="w-full h-[55vh] object-cover rounded-t-lg"
                      />

                      <Button
                        colorScheme="#00C4CC"
                        size="lg"
                        className="relative bottom-4 font-main-font shadow bg-gray-600"
                        onClick={() => {
                          setUserID(character.id);

                          navigate(`/profil/${userID}`);
                        }}
                      >
                        Voir le profil
                      </Button>
                      <div className="flex w-[88%] justify-between pt-4">
                        <button
                          type="button"
                          className="relative bottom-4 button-3 w-[80px] h-[80px] flex justify-center items-center"
                          onClick={() => {
                            setUser2ID(character.id);
                            setIsLiked(false);
                            setIsShown(true);
                            handleDislike();
                            carousel.current.next();
                          }}
                        >
                          <img src={cross} alt="" className="w-[45%]" />
                        </button>

                        <button
                          type="button"
                          className="relative bottom-4 button-2 w-[80px] h-[80px] flex justify-center items-center z-50"
                          onClick={() => {
                            setUser2ID(character.id);
                            setIsLiked(true);
                            setIsShown(false);
                            handleLike(character.id);
                            carousel.current.next();
                          }}
                        >
                          <img src={music} alt="" className="w-[50%]" />
                        </button>
                      </div>

                      <h2 className="font-main-font font-bold text-4xl mb-1 mt-[-4rem]">
                        {character.artistname},{" "}
                        <span className="font-light">{character.age}</span>
                      </h2>
                      <p className="font-main-font text-[1.4rem] mb-2">
                        {character.city}
                      </p>

                      <div className="flex w-full justify-center items-center">
                        <img
                          alt=""
                          className="w-[15%] object-contain "
                          src="https://www.specialolympics.asso.fr/wp-content/uploads/2020/04/youtube-logo-icon-transparent-32.png"
                        />
                        <img
                          alt=""
                          className="w-[14%] object-contain "
                          src="http://store-images.s-microsoft.com/image/apps.39427.14398308773733109.53eed167-276f-443c-a7a5-c0d635242775.5b476efc-087d-4b27-8b9d-10b26705472d"
                        />
                      </div>
                    </div>
                  </div>
                ))}

            {activeFilter &&
              userListFiltered
                .filter((person) => person.id !== user.id)
                .map((character) => (
                  <div key={character.id} className="flex justify-center">
                    <div className="w-auto bg-white rounded-lg h-[77vh] flex flex-col items-center ml-5 mr-5 bg-musicActive">
                      <img
                        src={`${BACK_END_URL}/api/avatars/${character.avatar}`}
                        alt=""
                        className="w-full h-[55vh] object-cover rounded-t-lg"
                      />

                      <Button
                        colorScheme="#00C4CC"
                        size="sm"
                        className="relative bottom-4 font-main-font shadow bg-gray-600"
                        onClick={() => {
                          setUserID(character.id);

                          navigate(`/profil/${userID}`);
                        }}
                      >
                        Voir le profil
                      </Button>
                      <div className="flex w-[88%] justify-between pt-4">
                        <button
                          type="button"
                          className="relative bottom-4 button-3 w-[50px] h-[50px] flex justify-center items-center"
                          onClick={() => {
                            setUser2ID(character.id);

                            setIsLiked(false);
                            setIsShown(true);
                            handleDislike();
                            carousel.current.next();
                          }}
                        >
                          <img src={cross} alt="" className="w-[45%]" />
                        </button>

                        <button
                          type="button"
                          className="relative bottom-4 button-2 w-[50px] h-[50px] flex justify-center items-center z-50"
                          onClick={() => {
                            setUser2ID(character.id);

                            setIsLiked(true);
                            setIsShown(false);

                            handleLike(character.id);

                            carousel.current.next();
                          }}
                        >
                          <img src={music} alt="" className="w-[50%]" />
                        </button>
                      </div>

                      <h2 className="font-main-font font-bold text-2xl mb-1 mt-[-4rem]">
                        {character.artistname},{" "}
                        <span className="font-light">{character.age}</span>
                      </h2>
                      <p className="font-main-font text-[0.8rem] mb-2">
                        {character.city}
                      </p>

                      <div className="flex w-full justify-center items-center">
                        <img
                          alt=""
                          className="w-[12%] object-contain "
                          src="https://www.specialolympics.asso.fr/wp-content/uploads/2020/04/youtube-logo-icon-transparent-32.png"
                        />
                        <img
                          alt=""
                          className="w-[11%] object-contain "
                          src="http://store-images.s-microsoft.com/image/apps.39427.14398308773733109.53eed167-276f-443c-a7a5-c0d635242775.5b476efc-087d-4b27-8b9d-10b26705472d"
                        />
                      </div>
                    </div>
                  </div>
                ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default CardUser;
