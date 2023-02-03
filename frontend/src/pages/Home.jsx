import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Drawer, AutoComplete } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import CardUser from "../components/CardUser";
import BottomNav from "../components/BottomNav";
import AddAvatar from "./AddAvatar";
import { useCurrentUserContext } from "../contexts/userContext";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

// APPEL DU BACK

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  // context
  const { user, setUserID, userID, token, setUser, setGetSlide } =
    useCurrentUserContext();
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();

  // navigation
  const navigate = useNavigate();

  // Ouverture/fermeture des drawers
  const [openMenu, setOpenMenu] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const showDrawerMenu = () => {
    setOpenMenu(true);
  };

  const showDrawerFilter = () => {
    setOpenFilter(true);
  };
  const onClose = () => {
    setOpenMenu(false);
    setOpenFilter(false);
  };

  // useState FILTER
  const [skillOption, setSkillOption] = useState([]);
  const [skillID, setSkillID] = useState();
  const [activeFilter, setActiveFIlter] = useState(false);

  // counter pour rerender
  const [counter, setCounter] = useState(0);

  // TOAST
  const pass = () =>
    toast(" Vous avez skip!", {
      duration: 700,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "❌ ",
    });

  const like = () =>
    toast(" Vous avez liké!", {
      duration: 700,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "🎶",
    });

  const match = () =>
    toast(" C'est un match !", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#00C4CC",
        color: "white",
        fontStyle: "bold",
      },
      icon: "🎉",
    });

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    headers: myHeaders,
  };

  useEffect(() => {
    // check connexion
    if (!user.id) {
      navigate("/login");
    }

    // recupération des skills pour les options autocomplete

    fetch(`${BACK_END_URL}/api/skills`, requestOptions)
      .then((response) => response.json())
      .then((response) => setSkillOption(response))
      .catch(() => {});
  }, []);

  const { Option } = AutoComplete;

  // DECONNEXION

  const handleDisconnection = () => {
    // gestion de la deconnexion
    localStorage.clear();
    setUser({});
    setGetSlide(0);
    navigate("/login");
  };

  return (
    <div>
      {user.avatar === null && <AddAvatar />}
      {(isMobile || isLittleMobile) && user.avatar !== null && (
        <div className=" w-full h-screen bg-[#121640] flex flex-col justify-between ">
          <TopBar showDrawerFilter={showDrawerFilter} />

          <CardUser
            pass={pass}
            like={like}
            match={match}
            activeFilter={activeFilter}
            skillID={skillID}
            setCounter={setCounter}
            counter={counter}
          />
          <BottomNav showDrawerMenu={showDrawerMenu} />
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            open={openMenu}
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
                alt=""
                className="w-[200px] h-[200px] object-cover rounded-full"
              />
              <h2 className="font-main-font text-2xl mt-8">
                Hello <span className="font-bold">{user.artistname}</span> 🎸
              </h2>
              <Button
                colorScheme="#121640"
                size="lg"
                className="mt-16 mb-10 w-[60%] bg-[#121640]"
                onClick={() => {
                  setUserID(user.id);
                  navigate(`/profil/${userID}`);
                }}
              >
                Voir profil
              </Button>
              <Button
                colorScheme="#121640"
                size="lg"
                className="w-[60%] bg-[#121640]"
                onClick={() => navigate("/modifprofil")}
              >
                Modifier profil
              </Button>
              <div className="w-full h-[30vh] flex justify-center items-end">
                <Button
                  colorScheme="cyan"
                  size="sm"
                  className="w-[40%]"
                  onClick={() => handleDisconnection()}
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </Drawer>
          <Drawer
            title="Filtres"
            placement="bottom"
            width={500}
            onClose={onClose}
            open={openFilter}
          >
            <p className="font-main-font mb-8">Que recherchez-vous ?</p>
            <div className="flex items-center jusitfy-center">
              <AutoComplete
                value={false}
                style={{
                  width: 200,
                }}
                placeholder="Ajouter des skills"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={(data) => setSkillID(data)}
              >
                {skillOption.map((element) => (
                  <Option key={element.id}>{element.skillname}</Option>
                ))}
              </AutoComplete>

              <IconButton
                variant="outline"
                size="sm"
                colorScheme="blue"
                aria-label="check database"
                icon={<CheckIcon />}
                className="ml-4"
                onClick={() => {
                  setActiveFIlter(!activeFilter);
                  setCounter(counter + 1);
                }}
              />
            </div>
          </Drawer>
          <Toaster />
        </div>
      )}

      {isTablet && user.avatar !== null && (
        <div className=" w-full h-screen bg-[#121640] flex flex-col justify-between ">
          <TopBar showDrawerFilter={showDrawerFilter} />

          <CardUser
            pass={pass}
            like={like}
            match={match}
            activeFilter={activeFilter}
            skillID={skillID}
            setCounter={setCounter}
            counter={counter}
          />
          <BottomNav showDrawerMenu={showDrawerMenu} />
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            open={openMenu}
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
                alt=""
                className="w-[200px] h-[200px] object-cover rounded-full"
              />
              <h2 className="font-main-font text-2xl mt-8">
                Hello <span className="font-bold">{user.artistname}</span> 🎸
              </h2>
              <Button
                colorScheme="#121640"
                size="lg"
                className="mt-16 mb-10 w-[60%] bg-[#121640]"
                onClick={() => {
                  setUserID(user.id);
                  navigate(`/profil/${userID}`);
                }}
              >
                Voir profil
              </Button>
              <Button
                colorScheme="#121640"
                size="lg"
                className="w-[60%] bg-[#121640]"
                onClick={() => navigate("/modifprofil")}
              >
                Modifier profil
              </Button>

              <div className="w-full h-[30vh] flex justify-center items-end">
                <Button
                  colorScheme="cyan"
                  size="sm"
                  className="w-[40%]"
                  onClick={() => handleDisconnection()}
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </Drawer>
          <Drawer
            title="Filtres"
            placement="bottom"
            width={500}
            onClose={onClose}
            open={openFilter}
          >
            <p className="font-main-font mb-8">Que recherchez-vous ?</p>
            <div className="flex items-center jusitfy-center">
              <AutoComplete
                value={false}
                style={{
                  width: 200,
                }}
                placeholder="Ajouter des skills"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={(data) => setSkillID(data)}
              >
                {skillOption.map((element) => (
                  <Option key={element.id}>{element.skillname}</Option>
                ))}
              </AutoComplete>

              <IconButton
                variant="outline"
                size="sm"
                colorScheme="blue"
                aria-label="check database"
                icon={<CheckIcon />}
                className="ml-4"
                onClick={() => {
                  setActiveFIlter(!activeFilter);
                }}
              />
            </div>
          </Drawer>
          <Toaster />
        </div>
      )}

      {isDesktop && user.avatar !== null && (
        <div className=" w-full h-screen bg-[#121640] flex flex-col justify-between ">
          <TopBar showDrawerFilter={showDrawerFilter} />
          <CardUser
            pass={pass}
            like={like}
            match={match}
            activeFilter={activeFilter}
            skillID={skillID}
            setCounter={setCounter}
            counter={counter}
          />
          <Drawer
            title="Menu"
            placement="left"
            open
            autoFocus={false}
            closable={false}
            mask={false}
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
                alt=""
                className="w-[200px] h-[200px] object-cover rounded-full"
              />
              <h2 className="font-main-font text-2xl mt-8">
                Hello <span className="font-bold">{user.artistname}</span> 🎸
              </h2>
              <Button
                colorScheme="#121640"
                size="lg"
                className="mt-16 mb-10 w-[60%] bg-[#121640]"
                onClick={() => {
                  setUserID(user.id);
                  navigate(`/profil/${userID}`);
                }}
              >
                Voir profil
              </Button>
              <Button
                colorScheme="#121640"
                size="lg"
                className="w-[60%] bg-[#121640] mb-10 "
                onClick={() => navigate("/modifprofil")}
              >
                Modifier profil
              </Button>
              <Button
                colorScheme="#121640"
                size="lg"
                className="w-[60%] bg-[#121640] mb-20"
                onClick={() => navigate("/messages")}
              >
                Messagerie
              </Button>
              <p className="font-main-font mb-8">Que recherchez-vous ?</p>
              <div className="flex w-full justify-center items-center">
                <AutoComplete
                  value={false}
                  style={{
                    width: 200,
                  }}
                  placeholder="Ajouter des skills"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onSelect={(data) => setSkillID(data)}
                >
                  {skillOption.map((element) => (
                    <Option key={element.id}>{element.skillname}</Option>
                  ))}
                </AutoComplete>
                <IconButton
                  variant="outline"
                  size="sm"
                  colorScheme="blue"
                  aria-label="check database"
                  icon={<CheckIcon />}
                  className="ml-4"
                  onClick={() => {
                    setActiveFIlter(!activeFilter);
                  }}
                />
              </div>

              <div className="w-full h-[10vh] flex justify-center items-end">
                <Button
                  colorScheme="cyan"
                  size="sm"
                  className="w-[40%]"
                  onClick={() => handleDisconnection()}
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </Drawer>

          <Toaster />
        </div>
      )}
    </div>
  );
}

export default Home;
