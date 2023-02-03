import React, { useRef } from "react";

import toast, { Toaster } from "react-hot-toast";

import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";

function AddAvatar() {
  // context
  const { user, setUser, token } = useCurrentUserContext();
  // avatar
  const avatarRef = useRef(null);
  // navigation
  const navigate = useNavigate();

  // les Toasts (pas de rillette malheureusement)
  const fail = () =>
    toast(" Upload échoué", {
      duration: 700,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "❌ ",
    });

  const success = () =>
    toast(" Upload réussie!", {
      duration: 1500,
      position: "top-center",
      style: {
        background: "#121640",
        color: "#fff",
      },
      icon: "✅",
    });

  // POST IMAGE AVATAR

  if (!token) {
    navigate("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatarRef.current.files[0]) {
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("avatar", avatarRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body: formData,
      };
      // on appelle le back
      fetch("http://localhost:5000/api/avatars", requestOptions)
        .then((response) => response.json())
        .then((results) => {
          // maj avatar
          setUser({ ...user, avatar: results.avatar });
          success();

          setTimeout(() => {
            navigate("/");
          }, "1500");
        })
        .catch((error) => {
          console.error(error);
          fail();
        });
    }
  };

  return (
    <div>
      <form
        className="bg-[#121640] h-[100vh] w-full flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-[90%] h-[70vh] background rounded-[10rem] shadow flex flex-col justify-center items-center">
          <div className="w-[90%] h-[20vh] bg-logo bg-center bg-cover mb-4" />
          <h2 className="font-main-font text-white font-bold text-xl mb-4">
            Ma photo de profil
          </h2>

          <div className="w-[80%] mt-10 flex items-center flex-col">
            <label
              htmlFor="file-upload"
              className="custom-file-upload mb-4 font-main-font text-white text-sm"
            >
              Choisir une image
              <input
                id="file-upload"
                type="file"
                ref={avatarRef}
                accept="image/png, image/jpeg"
              />
            </label>

            <div className="flex justify-around items-center w-full">
              <Button
                colorScheme="cyan"
                size="sm"
                className="font-main-font shadow"
                type="submit"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
        <Toaster />
      </form>
    </div>
  );
}

export default AddAvatar;
