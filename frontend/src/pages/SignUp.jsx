import React, { useState } from "react";

import { Toaster, toast } from "react-hot-toast";

import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

function SignUp() {
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();
  // useState pour stepper
  const [step, setStep] = React.useState("0");

  // useState pour signup
  const [email, setEmail] = useState("");
  const [artistname, setArtistName] = useState("");
  const [age, setAge] = useState();
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  // nav
  const navigate = useNavigate();

  const fail = () =>
    toast(" Inscription échouée", {
      duration: 700,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "❌ ",
    });

  const success = () =>
    toast(" Inscription réussie!", {
      duration: 1500,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "✅",
    });

  // POST SIGNUP
  const handleForm = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      artistname,
      age,
      city,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    e.preventDefault();
    // on créé et on redirige
    fetch("http://localhost:5000/api/register", requestOptions)
      .then(() => {
        success();
        setTimeout(() => {
          navigate("/login");
        }, "1000");
      })
      .catch(fail());
  };

  return (
    <div>
      {isMobile && (
        <form
          onSubmit={handleForm}
          className="flex flex-col items-center justify-center w-full h-screen "
        >
          {step === "0" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[73vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[24vh] bg-logo bg-center bg-cover mb-6" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font ">
                    {" "}
                    Entrez votre adresse email
                    <Input
                      variant="flushed"
                      placeholder="Adresse Email"
                      className="text-white font-main-font mb-7 mt-8"
                      onChange={(e) => setEmail(e.target.value)}
                      errorBorderColor="red"
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button colorScheme="blue" variant="outline">
                      Précédent
                    </Button>

                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "1" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[73vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[24vh] bg-logo bg-center bg-cover mb-6" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font ">
                    {" "}
                    Mon nom d'artiste est...
                    <Input
                      variant="flushed"
                      placeholder="Nom d'artiste"
                      className="text-white font-main-font mb-8 mt-8"
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("0")}
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "2" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[73vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[24vh] bg-logo bg-center bg-cover mb-6" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font  ">
                    {" "}
                    Mon âge...
                    <Input
                      placeholder="Âge"
                      size="md"
                      type="number"
                      color="white"
                      className="mt-10 mb-10"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "3" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[73vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[24vh] bg-logo bg-center bg-cover mb-6" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font  ">
                    {" "}
                    J'habite à...
                    <Input
                      placeholder="Ville"
                      size="md"
                      color="white"
                      className="mt-10 mb-10"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("4")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}

          {step === "4" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[73vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[24vh] bg-logo bg-center bg-cover mb-6" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[80%] mt-10 flex items-center flex-col">
                  <label className="text-white text-xl font-main-font  ">
                    {" "}
                    Ton mot de passe est...
                  </label>

                  <div className="flex justify-center w-[80%]">
                    <Input
                      placeholder="Mot de passe"
                      size="md"
                      type="password"
                      color="white"
                      className="mt-10 mb-10"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                    >
                      Précédent
                    </Button>

                    <button
                      type="submit"
                      className="bg-[#8905b1] font-main-font font-bold text-white rounded p-2"
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
        </form>
      )}
      {isLittleMobile && (
        <form
          onSubmit={handleForm}
          className="flex flex-col items-center justify-center w-full h-screen "
        >
          {step === "0" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[20vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font ">
                    {" "}
                    Entrez votre adresse email
                    <Input
                      variant="flushed"
                      placeholder="Adresse Email"
                      className="text-white font-main-font mb-7 mt-8"
                      onChange={(e) => setEmail(e.target.value)}
                      errorBorderColor="red"
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button colorScheme="blue" variant="outline">
                      Précédent
                    </Button>

                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "1" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[20vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font ">
                    {" "}
                    Mon nom d'artiste est...
                    <Input
                      variant="flushed"
                      placeholder="Nom d'artiste"
                      className="text-white font-main-font mb-8 mt-8"
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("0")}
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "2" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[20vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font  ">
                    {" "}
                    Mon âge...
                    <Input
                      placeholder="Âge"
                      size="md"
                      type="number"
                      color="white"
                      className="mt-10 mb-10"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "3" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[20vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-xl font-main-font  ">
                    {" "}
                    J'habite à...
                    <Input
                      placeholder="Ville"
                      size="md"
                      color="white"
                      className="mt-10 mb-10"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("4")}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}

          {step === "4" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[90%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[20vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-xl">
                  INSCRIPTION
                </h2>
                <div className="w-[80%] mt-10 flex items-center flex-col">
                  <label className="text-white text-xl font-main-font  ">
                    {" "}
                    Ton mot de passe est...
                  </label>

                  <div className="flex justify-center w-[80%]">
                    <Input
                      placeholder="Mot de passe"
                      size="md"
                      type="password"
                      color="white"
                      className="mt-10 mb-10"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                    >
                      Précédent
                    </Button>

                    <button
                      type="submit"
                      className="bg-[#8905b1] font-main-font font-bold text-white rounded p-2"
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-sm mt-8"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
        </form>
      )}

      {isTablet && (
        <form
          onSubmit={handleForm}
          className="flex flex-col items-center justify-center w-full h-screen "
        >
          {step === "0" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[80%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font ">
                    {" "}
                    Entrez votre adresse email
                    <Input
                      variant="flushed"
                      placeholder="Adresse Email"
                      size="large"
                      className="text-white font-main-font mb-12 mt-8"
                      onChange={(e) => setEmail(e.target.value)}
                      errorBorderColor="red"
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button colorScheme="blue" variant="outline" size="lg">
                      Précédent
                    </Button>

                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "1" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[80%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font ">
                    {" "}
                    Mon nom d'artiste est...
                    <Input
                      variant="flushed"
                      size="large"
                      placeholder="Nom d'artiste"
                      className="text-white font-main-font mb-12 mt-8"
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("0")}
                      size="lg"
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font mt-20 text-xl"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "2" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[80%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font  ">
                    {" "}
                    Mon âge...
                    <Input
                      placeholder="Âge"
                      size="lg"
                      type="number"
                      color="white"
                      className="mt-8 mb-12"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                      size="lg"
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "3" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[80%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font  ">
                    {" "}
                    J'habite à...
                    <Input
                      placeholder="Ville"
                      size="lg"
                      color="white"
                      className="mt-8 mb-12"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                      size="lg"
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("4")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}

          {step === "4" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[80%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10 flex items-center flex-col">
                  <label className="text-white text-2xl font-main-font  ">
                    {" "}
                    Ton mot de passe est...
                  </label>

                  <div className="flex justify-center w-[80%]">
                    <Input
                      placeholder="Mot de passe"
                      size="lg"
                      type="password"
                      color="white"
                      className="mt-8 mb-12"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-around items-center w-full">
                    <Button
                      size="lg"
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                    >
                      Précédent
                    </Button>

                    <button
                      type="submit"
                      className="bg-[#8905b1] text-lg font-main-font font-bold text-white rounded-lg p-4"
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
        </form>
      )}
      {isDesktop && (
        <form
          onSubmit={handleForm}
          className="flex flex-col items-center justify-center w-full h-screen "
        >
          {step === "0" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[40%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font ">
                    {" "}
                    Entrez votre adresse email
                    <Input
                      variant="flushed"
                      placeholder="Adresse Email"
                      size="large"
                      className="text-white font-main-font mb-12 mt-8"
                      onChange={(e) => setEmail(e.target.value)}
                      errorBorderColor="red"
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button colorScheme="blue" variant="outline" size="lg">
                      Précédent
                    </Button>

                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "1" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[40%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font ">
                    {" "}
                    Mon nom d'artiste est...
                    <Input
                      variant="flushed"
                      size="large"
                      placeholder="Nom d'artiste"
                      className="text-white font-main-font mb-12 mt-8"
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("0")}
                      size="lg"
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font mt-20 text-xl"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "2" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[40%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font  ">
                    {" "}
                    Mon âge...
                    <Input
                      placeholder="Âge"
                      size="lg"
                      type="number"
                      color="white"
                      className="mt-8 mb-12"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("1")}
                      size="lg"
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
          {step === "3" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[40%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10">
                  <label className="text-white text-2xl font-main-font  ">
                    {" "}
                    J'habite à...
                    <Input
                      placeholder="Ville"
                      size="lg"
                      color="white"
                      className="mt-8 mb-12"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-around items-center w-full">
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("2")}
                      size="lg"
                    >
                      Précédent
                    </Button>
                    <Button
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("4")}
                      size="lg"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}

          {step === "4" && (
            <div className="bg-[#121640] h-[100vh] w-full flex justify-center items-center">
              <div className="w-[40%] h-[90vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
                <div className="w-[90%] h-[27vh] bg-logo bg-center bg-cover mb-10" />
                <h2 className="font-main-font text-white font-bold text-4xl">
                  INSCRIPTION
                </h2>
                <div className="w-[70%] mt-10 flex items-center flex-col">
                  <label className="text-white text-2xl font-main-font  ">
                    {" "}
                    Ton mot de passe est...
                  </label>

                  <div className="flex justify-center w-[80%]">
                    <Input
                      placeholder="Mot de passe"
                      size="lg"
                      type="password"
                      color="white"
                      className="mt-8 mb-12"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-around items-center w-full">
                    <Button
                      size="lg"
                      colorScheme="cyan"
                      variant="solid"
                      onClick={() => setStep("3")}
                    >
                      Précédent
                    </Button>

                    <button
                      type="submit"
                      className="bg-[#8905b1] text-lg font-main-font font-bold text-white rounded-lg p-4"
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-white font-main-font text-xl mt-20"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Se connecter
                </span>
              </div>
            </div>
          )}
        </form>
      )}
      <Toaster />
    </div>
  );
}

export default SignUp;
