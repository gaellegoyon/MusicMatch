import React, { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCurrentUserContext } from "../contexts/userContext";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

function Login() {
  // oeil password
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  // context
  const { setUser, setToken } = useCurrentUserContext();
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();

  // useState LOGIN verifuser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // nav
  const navigate = useNavigate();

  // les toasts
  const fail = () =>
    toast("L'email et/ou ton mot de passe est invalide", {
      duration: 5000,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "❌ ",
    });

  const success = () =>
    toast(" Tu es connecté(e) !", {
      duration: 1000,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "✅",
    });

  // AUTH

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    if (email && password) {
      // on appelle le back
      fetch("http://localhost:5000/api/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          success();
          setUser(result.user);
          setToken(result.token);

          setTimeout(() => {
            navigate("/");
          }, "1000");
        })
        .catch(console.error);
    } else {
      fail();
    }
  };

  return (
    <div className="bg-[#121640] h-[100vh] w-full flex justify-center">
      {(isMobile || isLittleMobile) && (
        <div className="flex flex-col items-center justify-center w-full">
          <form
            className="w-[90%] h-[80vh] background rounded-[10rem] shadow flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-[80%] h-[25vh] bg-logo bg-center bg-cover bg-no-repeat " />
            <h2 className="font-main-font text-white font-bold text-xl mt-4">
              SE CONNECTER
            </h2>

            <div className="w-[70%] mt-10">
              <Input
                variant="flushed"
                placeholder="Adresse Email"
                className="text-white font-main-font mb-7"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
              <InputGroup size="md">
                <Input
                  variant="flushed"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="text-white font-main-font"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
                <InputRightElement width="4.5rem" onClick={handleClick}>
                  {show ? (
                    <ViewIcon color="white" />
                  ) : (
                    <ViewOffIcon color="white" />
                  )}
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-3">
              <span className="text-white font-main-font text-sm">
                Tu as oublié ton mot de passe ?
              </span>
              <button
                className="button-1 font-main-font font-bold mt-6 mb-5"
                type="submit"
              >
                {" "}
                CONNEXION
              </button>
              <span
                aria-hidden
                className="text-white font-main-font text-sm"
                onClick={() => {
                  navigate(`/signUp`);
                }}
              >
                S'inscrire
              </span>
            </div>
          </form>
        </div>
      )}

      {isTablet && (
        <div className="flex flex-col items-center justify-center w-full">
          <form
            className="w-[70%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-[80%] h-[30vh] bg-logo bg-center bg-cover bg-no-repeat " />
            <h2 className="font-main-font text-white font-bold text-xl mt-4">
              SE CONNECTER
            </h2>

            <div className="w-[70%] mt-10">
              <Input
                variant="flushed"
                placeholder="Adresse Email"
                className="text-white font-main-font mb-7"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
              <InputGroup size="md">
                <Input
                  variant="flushed"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="text-white font-main-font"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
                <InputRightElement width="4.5rem" onClick={handleClick}>
                  {show ? (
                    <ViewIcon color="white" />
                  ) : (
                    <ViewOffIcon color="white" />
                  )}
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-3">
              <span className="text-white font-main-font text-sm">
                Tu as oublié ton mot de passe ?
              </span>
              <button
                className="button-1 font-main-font font-bold mt-6 mb-5"
                type="submit"
              >
                {" "}
                CONNEXION
              </button>
              <span
                aria-hidden
                className="text-white font-main-font text-sm"
                onClick={() => {
                  navigate(`/signUp`);
                }}
              >
                S'inscrire
              </span>
            </div>
          </form>
        </div>
      )}

      {isDesktop && (
        <div className="flex flex-col items-center justify-center w-full">
          <form
            className="w-[40%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-[80%] h-[30vh] bg-logo bg-center bg-cover bg-no-repeat " />
            <h2 className="font-main-font text-white font-bold text-xl mt-4">
              SE CONNECTER
            </h2>

            <div className="w-[70%] mt-10">
              <Input
                variant="flushed"
                placeholder="Adresse Email"
                className="text-white font-main-font mb-7"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
              <InputGroup size="md">
                <Input
                  variant="flushed"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="text-white font-main-font"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
                <InputRightElement width="4.5rem" onClick={handleClick}>
                  {show ? (
                    <ViewIcon color="white" />
                  ) : (
                    <ViewOffIcon color="white" />
                  )}
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-3">
              <span className="text-white font-main-font text-sm">
                Tu as oublié ton mot de passe ?
              </span>
              <button
                className="button-1 font-main-font font-bold mt-6 mb-5"
                type="submit"
              >
                {" "}
                CONNEXION
              </button>
              <span
                aria-hidden
                className="text-white font-main-font text-sm"
                onClick={() => {
                  navigate(`/signUp`);
                }}
              >
                S'inscrire
              </span>
            </div>
          </form>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default Login;
