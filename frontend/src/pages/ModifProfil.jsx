/* eslint-disable react/no-this-in-sfc */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  EditablePreview,
  useColorModeValue,
  IconButton,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  EditableInput,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
} from "@chakra-ui/react";
import { AutoComplete } from "antd";

import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import { useCurrentResponsiveContext } from "../contexts/responsiveContext";

// FONCTION D'EDITION DES INPUTS

function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton
        icon={<CloseIcon boxSize={3} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null;
}

// CALL DU BACK

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

// TOASTER NOTIFICATION

const fail = () =>
  toast(" Upload échoué!", {
    duration: 700,
    position: "top-center",
    style: {
      background: "#121640",
      color: "#fff",
    },
    icon: "❌ ",
  });

const success = () =>
  toast(" Upload réussi !", {
    duration: 700,
    position: "top-center",
    style: {
      background: "#121640",
      color: "#fff",
    },
    icon: "✅",
  });

function ModifProfil() {
  const { isDesktop, isMobile, isTablet, isLittleMobile } =
    useCurrentResponsiveContext();
  const { user, setUser, token } = useCurrentUserContext();
  const navigate = useNavigate();

  // useState put user

  const [artistname, setArtistName] = useState(user.artistname);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [city, setCity] = useState(user.city);
  const [biography, setBiography] = useState(user.biography);
  const [soundcloud, setSoundcloud] = useState(user.soundcloud);
  const [youtube, setYoutube] = useState(user.youtube);

  // useState modif skill
  const [skillID, setSkillID] = useState();
  const [skillInfo, setSkillInfo] = useState([]);
  const [skillOption, setSkillOption] = useState([]);

  // useState modif style
  const [styleInfo, setStyleInfo] = useState([]);
  const [styleOption, setStyleOption] = useState([]);
  const [styleID, setStyleID] = useState();

  // useState pour rerender
  const [index, setIndex] = useState(0);

  // Fonction retour nav
  const goBack = () => navigate(-1);

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    // recupération des skills pour les options autocomplete

    fetch(`${BACK_END_URL}/api/skills`, requestOptions)
      .then((response) => response.json())
      .then((response) => setSkillOption(response))
      .catch(() => {});

    // recupération des skills par l'id

    fetch(`${BACK_END_URL}/api/skills/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        setSkillInfo(response);
      })
      .then(navigate("/modifprofil"))
      .catch(() => {});

    // recupération des styles pour les options autocomplete

    fetch(`${BACK_END_URL}/api/styles`, requestOptions)
      .then((response) => response.json())
      .then((response) => setStyleOption(response))
      .catch(() => {});

    // recupération des styles par l'id

    fetch(`${BACK_END_URL}/api/styles/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((response) => setStyleInfo(response))
      .catch(() => {});
  }, [index]);

  // Avatar
  const avatarRef = useRef(null);

  // modif avatar

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
        })
        .catch((error) => {
          console.error(error);
          fail();
        });
    }
  };

  // MODIFICATION INFO USER

  const handleChange = () => {
    // Request options pour la mise à jour de la bdd user

    const body = JSON.stringify({
      artistname,
      email,
      age,
      city,
      biography,
      soundcloud,
      youtube,
    });

    const myHeaders = new Headers({
      Authorization: `Bearer ${token}`,
    });
    myHeaders.append("Content-Type", "application/json");

    const PUTrequestOptions = {
      method: "PUT",
      headers: myHeaders,
      body,
    };
    fetch(`${BACK_END_URL}/api/users/${user.id}`, PUTrequestOptions).catch(
      console.error
    );
  };

  // AJOUT TAG STYLE

  const handleChangeStyle = () => {
    const myHeaders = new Headers({
      Authorization: `Bearer ${token}`,
    });
    myHeaders.append("Content-Type", "application/json");

    const POSTrequestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        style_id: styleID,
        user_id: user.id,
      }),
    };

    fetch(`${BACK_END_URL}/api/userhasstyles`, POSTrequestOptions)
      .then(setIndex(index + 1))
      .catch(console.error);
  };

  // AJOUT TAG SKILL

  const handleChangeSkill = () => {
    const myHeaders = new Headers({
      Authorization: `Bearer ${token}`,
    });
    myHeaders.append("Content-Type", "application/json");

    const POSTrequestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        skill_id: skillID,
        user_id: user.id,
      }),
    };

    fetch(`${BACK_END_URL}/api/userhasskills`, POSTrequestOptions)
      .then(setIndex(index + 1))
      .catch(console.error);
  };

  // SUPPRESSION TAG STYLE

  const handleDeleteStyle = (style_id) => {
    const myHeaders = new Headers({
      Authorization: `Bearer ${token}`,
    });
    myHeaders.append("Content-Type", "application/json");
    const DELETErequestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(
      `${BACK_END_URL}/api/userhasstyles/${style_id}/${user.id}`,
      DELETErequestOptions
    )
      .then(setIndex(index + 1))
      .catch(console.error);
  };

  // SUPPRESSION TAG STYLE
  const handleDeleteSkill = (skill_id) => {
    const myHeaders = new Headers({
      Authorization: `Bearer ${token}`,
    });
    myHeaders.append("Content-Type", "application/json");
    const DELETErequestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(
      `${BACK_END_URL}/api/userhasskills/${skill_id}/${user.id}`,
      DELETErequestOptions
    )
      .then(setIndex(index + 1))
      .catch(console.error);
  };

  // AJOUT DU FETCH DES TAG DANS L'AUTOCOMPLETE

  const { Option } = AutoComplete;

  return (
    <div>
      {(isMobile || isLittleMobile) && (
        <div className="w-full bg-white flex flex-col items-center pb-4">
          <button
            type="button"
            className="w-[50px] h-[50px] rounded-full bg-gray-200 fixed left-[20rem] top-3"
            onClick={() => {
              goBack();
            }}
          >
            <CloseIcon color="gray" />
          </button>
          <img
            src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
            alt=""
            className="w-full h-[55vh] object-cover mb-7"
          />

          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label
              htmlFor="file-upload"
              className="custom-file-upload mb-4 font-main-font text-sm"
            >
              Modifier image
              <input
                id="file-upload"
                type="file"
                ref={avatarRef}
                accept="image/png, image/jpeg"
              />
            </label>

            <Button
              colorScheme="#00C4CC"
              size="sm"
              className="font-main-font shadow bg-gray-600"
              type="submit"
            >
              Envoyer
            </Button>
          </form>

          <p className="w-full text-center font-main-font text-xl font-bold mt-10 ">
            Nom d'affichage
          </p>

          <Editable
            defaultValue={artistname}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setArtistName(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Email
          </p>

          <Editable
            defaultValue={email}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Âge
          </p>

          <Editable
            defaultValue={age}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setAge(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Ville
          </p>

          <Editable
            defaultValue={city}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setCity(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold">
            Je suis un(e)...
          </p>

          <div className="flex justify-around w-full mt-4 mb-4 flex-wrap ">
            {skillInfo.map((skill) => (
              <Tag
                key={skill.id}
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
                className="m-3"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                <TagLabel>{skill.skillname}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </div>

          <div className="flex items-center jusitfy-center">
            <AutoComplete
              value={false}
              style={{
                width: 200,
              }}
              placeholder="Ajouter des skills"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
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
                handleChangeSkill();
              }}
            />
          </div>

          <p className="w-full text-center font-main-font text-xl font-bold mt-5 flex-wrap">
            Mes genres préférés
          </p>

          <div className="flex justify-around mt-4 flex-wrap mb-4">
            {styleInfo.map((style) => (
              <Tag
                key={style.stylename}
                borderRadius="full"
                variant="solid"
                colorScheme="purple"
                className="m-3"
                onClick={() => handleDeleteStyle(style.id)}
              >
                <TagLabel>{style.stylename}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </div>

          <div className="flex items-center jusitfy-center">
            <AutoComplete
              value={false}
              style={{
                width: 200,
              }}
              placeholder="Ajouter des styles"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => setStyleID(data)}
            >
              {styleOption.map((element) => (
                <Option key={element.id}>{element.stylename}</Option>
              ))}
            </AutoComplete>
            <IconButton
              variant="outline"
              size="sm"
              colorScheme="purple"
              aria-label="check database"
              icon={<CheckIcon />}
              className="ml-4"
              onClick={() => {
                handleChangeStyle();
              }}
            />
          </div>
          <p className="w-full text-center font-main-font text-xl font-bold mt-4 mb-4">
            Biographie
          </p>

          <Editable
            defaultValue={biography}
            isPreviewFocusable
            selectAllOnFocus={false}
            onSubmit={handleChange}
            className="flex jusitfy-center items-center"
          >
            <div className="w-full text-center h-auto bg-gray-100 rounded-xl p-2 leading-4 mb-10">
              <EditablePreview
                py={2}
                px={4}
                _hover={{
                  background: useColorModeValue("gray.100", "gray.700"),
                }}
              />

              <Input
                py={2}
                px={4}
                as={EditableInput}
                onChange={(e) => setBiography(e.target.value)}
              />
              <EditableControls />
            </div>
          </Editable>

          <p className="w-auto text-center font-main-font text-xl font-bold mt-4">
            URL soundcloud
          </p>

          <Editable
            defaultValue={soundcloud}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-4"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
              className="w-[95vw]"
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setSoundcloud(e.target.value)}
            />
            <EditableControls />
          </Editable>
          <p className="w-auto text-center font-main-font text-xl font-bold mt-4 ml-4">
            URL Youtube
          </p>

          <Editable
            defaultValue={youtube}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-4"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
              className="w-[95vw]"
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setYoutube(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <Toaster />
        </div>
      )}
      {isTablet && (
        <div className="w-full bg-white flex flex-col items-center pb-4">
          <button
            type="button"
            className="w-[50px] h-[50px] rounded-full bg-gray-200 fixed left-[55rem] top-10"
            onClick={() => {
              goBack();
            }}
          >
            <CloseIcon color="gray" />
          </button>
          <img
            src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
            alt=""
            className="w-full h-[55vh] object-cover mb-7"
          />

          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label
              htmlFor="file-upload"
              className="custom-file-upload mb-4 font-main-font text-sm"
            >
              Modifier image
              <input
                id="file-upload"
                type="file"
                ref={avatarRef}
                accept="image/png, image/jpeg"
              />
            </label>

            <Button
              colorScheme="#00C4CC"
              size="sm"
              className="font-main-font shadow bg-gray-600"
              type="submit"
            >
              Envoyer
            </Button>
          </form>

          <p className="w-full text-center font-main-font text-xl font-bold mt-10 ">
            Nom d'affichage
          </p>

          <Editable
            defaultValue={artistname}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setArtistName(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Email
          </p>

          <Editable
            defaultValue={email}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Âge
          </p>

          <Editable
            defaultValue={age}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setAge(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Ville
          </p>

          <Editable
            defaultValue={city}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setCity(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold">
            Je suis un(e)...
          </p>

          <div className="flex justify-around w-full mt-4 mb-4 flex-wrap ">
            {skillInfo.map((skill) => (
              <Tag
                key={skill.id}
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
                className="m-3"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                <TagLabel>{skill.skillname}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </div>

          <div className="flex items-center jusitfy-center">
            <AutoComplete
              value={false}
              style={{
                width: 200,
              }}
              placeholder="Ajouter des skills"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
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
                handleChangeSkill();
              }}
            />
          </div>

          <p className="w-full text-center font-main-font text-xl font-bold mt-5 flex-wrap">
            Mes genres préférés
          </p>

          <div className="flex justify-around mt-4 flex-wrap mb-4">
            {styleInfo.map((style) => (
              <Tag
                key={style.stylename}
                borderRadius="full"
                variant="solid"
                colorScheme="purple"
                className="m-3"
                onClick={() => handleDeleteStyle(style.id)}
              >
                <TagLabel>{style.stylename}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </div>

          <div className="flex items-center jusitfy-center">
            <AutoComplete
              value={false}
              style={{
                width: 200,
              }}
              placeholder="Ajouter des styles"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => setStyleID(data)}
            >
              {styleOption.map((element) => (
                <Option key={element.id}>{element.stylename}</Option>
              ))}
            </AutoComplete>
            <IconButton
              variant="outline"
              size="sm"
              colorScheme="purple"
              aria-label="check database"
              icon={<CheckIcon />}
              className="ml-4"
              onClick={() => {
                handleChangeStyle();
              }}
            />
          </div>
          <p className="w-full text-center font-main-font text-xl font-bold mt-4 mb-4">
            Biographie
          </p>

          <Editable
            defaultValue={biography}
            isPreviewFocusable
            selectAllOnFocus={false}
            onSubmit={handleChange}
            className="flex jusitfy-center items-center"
          >
            <div className="w-full text-center h-auto bg-gray-100 rounded-xl p-2 leading-4 mb-10">
              <EditablePreview
                py={2}
                px={4}
                _hover={{
                  background: useColorModeValue("gray.100", "gray.700"),
                }}
              />

              <Input
                py={2}
                px={4}
                as={EditableInput}
                onChange={(e) => setBiography(e.target.value)}
              />
              <EditableControls />
            </div>
          </Editable>

          <p className="w-auto text-center font-main-font text-xl font-bold mt-4">
            URL soundcloud
          </p>

          <Editable
            defaultValue={soundcloud}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-4"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
              className="w-[95vw]"
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setSoundcloud(e.target.value)}
            />
            <EditableControls />
          </Editable>
          <p className="w-auto text-center font-main-font text-xl font-bold mt-4 ml-4">
            URL Youtube
          </p>

          <Editable
            defaultValue={youtube}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-4"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
              className="w-[95vw]"
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setYoutube(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <Toaster />
        </div>
      )}{" "}
      {isDesktop && (
        <div className="w-full h-[100vh] bg-white flex flex-col items-center pb-4">
          <button
            type="button"
            className="w-[70px] h-[70px] rounded-full bg-gray-200 fixed left-[100rem] top-20"
            onClick={() => goBack()}
          >
            <CloseIcon color="gray" />
          </button>
          <img
            src={`${BACK_END_URL}/api/avatars/${user.avatar}`}
            alt=""
            className="w-[40vw] h-[90vh] object-cover mb-7 rounded-3xl ml-10 mt-20"
          />

          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label
              htmlFor="file-upload"
              className="custom-file-upload mb-4 font-main-font text-sm"
            >
              Modifier image
              <input
                id="file-upload"
                type="file"
                ref={avatarRef}
                accept="image/png, image/jpeg"
              />
            </label>

            <Button
              colorScheme="#00C4CC"
              size="sm"
              className="font-main-font shadow bg-gray-600"
              type="submit"
            >
              Envoyer
            </Button>
          </form>

          <p className="w-full text-center font-main-font text-xl font-bold mt-10 ">
            Nom d'affichage
          </p>

          <Editable
            defaultValue={artistname}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setArtistName(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Email
          </p>

          <Editable
            defaultValue={email}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setEmail(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Âge
          </p>

          <Editable
            defaultValue={age}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setAge(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold ">
            Ville
          </p>

          <Editable
            defaultValue={city}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-5"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setCity(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <p className="w-full text-center font-main-font text-xl font-bold">
            Je suis un(e)...
          </p>

          <div className="flex justify-around w-full mt-4 mb-4 flex-wrap ">
            {skillInfo.map((skill) => (
              <Tag
                key={skill.id}
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
                className="m-3"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                <TagLabel>{skill.skillname}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </div>

          <div className="flex items-center jusitfy-center">
            <AutoComplete
              value={false}
              style={{
                width: 200,
              }}
              placeholder="Ajouter des skills"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
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
                handleChangeSkill();
              }}
            />
          </div>

          <p className="w-full text-center font-main-font text-xl font-bold mt-5 flex-wrap">
            Mes genres préférés
          </p>

          <div className="flex justify-around mt-4 flex-wrap mb-4">
            {styleInfo.map((style) => (
              <Tag
                key={style.stylename}
                borderRadius="full"
                variant="solid"
                colorScheme="purple"
                className="m-3"
                onClick={() => handleDeleteStyle(style.id)}
              >
                <TagLabel>{style.stylename}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </div>

          <div className="flex items-center jusitfy-center">
            <AutoComplete
              value={false}
              style={{
                width: 200,
              }}
              placeholder="Ajouter des styles"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => setStyleID(data)}
            >
              {styleOption.map((element) => (
                <Option key={element.id}>{element.stylename}</Option>
              ))}
            </AutoComplete>
            <IconButton
              variant="outline"
              size="sm"
              colorScheme="purple"
              aria-label="check database"
              icon={<CheckIcon />}
              className="ml-4"
              onClick={() => {
                handleChangeStyle();
              }}
            />
          </div>
          <p className="w-full text-center font-main-font text-xl font-bold mt-4 mb-4">
            Biographie
          </p>

          <Editable
            defaultValue={biography}
            isPreviewFocusable
            selectAllOnFocus={false}
            onSubmit={handleChange}
            className="flex jusitfy-center items-center"
          >
            <div className="w-full text-center h-auto bg-gray-100 rounded-xl p-2 leading-4 mb-10">
              <EditablePreview
                py={2}
                px={4}
                _hover={{
                  background: useColorModeValue("gray.100", "gray.700"),
                }}
              />

              <Input
                py={2}
                px={4}
                as={EditableInput}
                onChange={(e) => setBiography(e.target.value)}
              />
              <EditableControls />
            </div>
          </Editable>

          <p className="w-auto text-center font-main-font text-xl font-bold mt-4">
            URL soundcloud
          </p>

          <Editable
            defaultValue={soundcloud}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-4"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
              className="w-[95vw]"
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setSoundcloud(e.target.value)}
            />
            <EditableControls />
          </Editable>
          <p className="w-auto text-center font-main-font text-xl font-bold mt-4 ml-4">
            URL Youtube
          </p>

          <Editable
            defaultValue={youtube}
            isPreviewFocusable
            selectAllOnFocus={false}
            className="mb-4"
            onSubmit={handleChange}
          >
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
              className="w-[95vw]"
            />

            <Input
              py={2}
              px={4}
              as={EditableInput}
              onChange={(e) => setYoutube(e.target.value)}
            />
            <EditableControls />
          </Editable>

          <Toaster />
        </div>
      )}
    </div>
  );
}

export default ModifProfil;
