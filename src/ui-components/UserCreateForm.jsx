/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UserCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    username: "",
    phone: "",
    uniqueId: "",
    gender: "",
    avatar: "",
    bio: "",
    website: "",
    isPrivate: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [username, setUsername] = React.useState(initialValues.username);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [uniqueId, setUniqueId] = React.useState(initialValues.uniqueId);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [avatar, setAvatar] = React.useState(initialValues.avatar);
  const [bio, setBio] = React.useState(initialValues.bio);
  const [website, setWebsite] = React.useState(initialValues.website);
  const [isPrivate, setIsPrivate] = React.useState(initialValues.isPrivate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setUsername(initialValues.username);
    setPhone(initialValues.phone);
    setUniqueId(initialValues.uniqueId);
    setGender(initialValues.gender);
    setAvatar(initialValues.avatar);
    setBio(initialValues.bio);
    setWebsite(initialValues.website);
    setIsPrivate(initialValues.isPrivate);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    username: [{ type: "Required" }],
    phone: [{ type: "Required" }],
    uniqueId: [],
    gender: [{ type: "Required" }],
    avatar: [],
    bio: [],
    website: [],
    isPrivate: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          username,
          phone,
          uniqueId,
          gender,
          avatar,
          bio,
          website,
          isPrivate,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new User(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              username,
              phone,
              uniqueId,
              gender,
              avatar,
              bio,
              website,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username: value,
              phone,
              uniqueId,
              gender,
              avatar,
              bio,
              website,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={true}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username,
              phone: value,
              uniqueId,
              gender,
              avatar,
              bio,
              website,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Unique id"
        isRequired={false}
        isReadOnly={false}
        value={uniqueId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username,
              phone,
              uniqueId: value,
              gender,
              avatar,
              bio,
              website,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.uniqueId ?? value;
          }
          if (errors.uniqueId?.hasError) {
            runValidationTasks("uniqueId", value);
          }
          setUniqueId(value);
        }}
        onBlur={() => runValidationTasks("uniqueId", uniqueId)}
        errorMessage={errors.uniqueId?.errorMessage}
        hasError={errors.uniqueId?.hasError}
        {...getOverrideProps(overrides, "uniqueId")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={true}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username,
              phone,
              uniqueId,
              gender: value,
              avatar,
              bio,
              website,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <TextField
        label="Avatar"
        isRequired={false}
        isReadOnly={false}
        value={avatar}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username,
              phone,
              uniqueId,
              gender,
              avatar: value,
              bio,
              website,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.avatar ?? value;
          }
          if (errors.avatar?.hasError) {
            runValidationTasks("avatar", value);
          }
          setAvatar(value);
        }}
        onBlur={() => runValidationTasks("avatar", avatar)}
        errorMessage={errors.avatar?.errorMessage}
        hasError={errors.avatar?.hasError}
        {...getOverrideProps(overrides, "avatar")}
      ></TextField>
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username,
              phone,
              uniqueId,
              gender,
              avatar,
              bio: value,
              website,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <TextField
        label="Website"
        isRequired={false}
        isReadOnly={false}
        value={website}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username,
              phone,
              uniqueId,
              gender,
              avatar,
              bio,
              website: value,
              isPrivate,
            };
            const result = onChange(modelFields);
            value = result?.website ?? value;
          }
          if (errors.website?.hasError) {
            runValidationTasks("website", value);
          }
          setWebsite(value);
        }}
        onBlur={() => runValidationTasks("website", website)}
        errorMessage={errors.website?.errorMessage}
        hasError={errors.website?.hasError}
        {...getOverrideProps(overrides, "website")}
      ></TextField>
      <SwitchField
        label="Is private"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isPrivate}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              username,
              phone,
              uniqueId,
              gender,
              avatar,
              bio,
              website,
              isPrivate: value,
            };
            const result = onChange(modelFields);
            value = result?.isPrivate ?? value;
          }
          if (errors.isPrivate?.hasError) {
            runValidationTasks("isPrivate", value);
          }
          setIsPrivate(value);
        }}
        onBlur={() => runValidationTasks("isPrivate", isPrivate)}
        errorMessage={errors.isPrivate?.errorMessage}
        hasError={errors.isPrivate?.hasError}
        {...getOverrideProps(overrides, "isPrivate")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
