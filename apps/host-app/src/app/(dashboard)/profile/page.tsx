"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { getCountryCallingCode } from "react-phone-number-input";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import PhoneNumberAndCountryField from "@repo/ui/phoneNumberAndCountryField";
import TextArea from "@repo/ui/textarea";
import SelectInput from "@repo/ui/select";
import ProfilePhotoUpload from "@repo/ui/profilePhotoUpload";
import AppSwitch from "@repo/ui/switch";
import { HorizontalDivider } from "@repo/ui/divider";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { useAppSelector } from "@/lib/hooks";
import { ProfileFormValues } from "@/utils/types";
import { citiesOptions } from "@/utils/data";
import {
  getInitialsFromName,
  replaceCharactersWithString,
} from "@/utils/functions";
import { profileFormValidationSchema } from "@/utils/validationSchema";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.user);
  const [isProfileEditable, setIsProfileEditable] = useState<boolean>(false);
  const { updateProfileMutation, uploadImage } =
    useUpdateProfile(setIsProfileEditable);

  return (
    <main className="py-[56px] md:space-y-11 text-grey-700">
      <h5 className="text-h5 md:text-h3 3xl:text-4xl !font-bold">My Account</h5>
      <Formik
        initialValues={
          {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            ...(user?.phoneVerified
              ? {}
              : { phoneNumber: user?.phoneNumber || "" }),
            country: user?.country || "NG",
            countryCode: user?.countryCode || "+234",
            // email: "",
            bio: user?.bio || "",
            profileImage: user?.profileImage || "",
            city: user?.city || "",
            isBusiness: user?.isBusiness,
            businessAddress: user?.businessAddress || null,
            businessEmail: user?.businessEmail || null,
            businessLogo: user?.businessLogo || "",
            businessName: user?.businessName || null,
            businessPhoneNumber: user?.businessPhoneNumber || null,
            businessCountry: "NG",
            businessCountryCode: "+234",
          } as ProfileFormValues
        }
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);

          const {
            businessCountry,
            businessCountryCode,
            profileImage,
            businessLogo,
            ...submittedValues
          } = values;

          updateProfileMutation.mutate(submittedValues);
          setSubmitting(false);
        }}
        validationSchema={profileFormValidationSchema}
        // enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isValid,
            dirty,
            handleBlur,
            handleChange,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
            resetForm,
          } = props;

          return (
            <div className="md:bg-grey-50 md:rounded-[52px] py-[60px] md:py-10 md:px-[52px] md:space-y-[60px] relative">
              <h4 className="hidden md:block text-h5 3xl:text-h4 !font-bold">
                PROFILE INFORMATION
              </h4>

              <Form className="max-w-[800px] space-y-[60px]">
                <div className="space-y-7">
                  <ProfilePhotoUpload
                    title="Profile Picture"
                    id="profileImage"
                    name="profileImage"
                    label=""
                    value={values?.profileImage || ""}
                    image={user?.profileImage || null}
                    onChange={async (fieldName, file) => {
                      setFieldTouched(fieldName, true);
                      setFieldValue(fieldName, file);

                      if (file) {
                        const formData = new FormData();
                        formData.append(fieldName, file);
                        console.log(formData);

                        uploadImage.mutate(formData);
                      }
                    }}
                    isLoading={uploadImage.isPending}
                    showButton={isProfileEditable}
                    disabled={!isProfileEditable}
                    initials={
                      user
                        ? getInitialsFromName(user.firstName, user.lastName)
                        : ""
                    }
                  />
                  <div className="md:max-w-[370px] space-y-7">
                    <InputField
                      name="firstName"
                      id="firstName"
                      type="text"
                      label="First name"
                      placeholder="Enter first name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors.firstName && touched.firstName
                          ? errors.firstName
                          : ""
                      }
                      disabled={!isProfileEditable}
                    />
                    <InputField
                      name="lastName"
                      id="lastName"
                      type="text"
                      label="Last name"
                      placeholder="Enter last name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors.lastName && touched.lastName
                          ? errors.lastName
                          : ""
                      }
                      disabled={!isProfileEditable}
                    />
                    <PhoneNumberAndCountryField
                      inputName="phoneNumber"
                      selectName="country"
                      inputId="phoneNumber"
                      selectId="country"
                      label="Phone Number"
                      inputPlaceholder="Enter phone number"
                      selectPlaceholder="+234"
                      inputValue={
                        user?.phoneVerified
                          ? user?.phoneNumber
                          : values.phoneNumber
                      }
                      selectValue={
                        user?.phoneVerified ? user?.country : values.country
                      }
                      inputOnChange={(event) => {
                        const number = replaceCharactersWithString(
                          event.target.value
                        );
                        setFieldTouched("phoneNumber", true);
                        setFieldValue("phoneNumber", number);
                      }}
                      selectOnChange={(value: string) => {
                        const countryCode = `+${getCountryCallingCode(value as any)}`;
                        setFieldValue("country", value);
                        setFieldValue("countryCode", countryCode);
                      }}
                      inputOnBlur={handleBlur}
                      selectOnBlur={handleBlur}
                      selectClassname="!w-[170px]"
                      inputDisabled={!isProfileEditable || user?.phoneVerified}
                      selectDisabled={!isProfileEditable || user?.phoneVerified}
                    />

                    <InputField
                      name="email"
                      id="email"
                      type="email"
                      label="Email"
                      placeholder="Enter email address"
                      value={user?.email}
                      disabled
                    />
                  </div>
                  <TextArea
                    name="bio"
                    id="bio"
                    type="text"
                    label="Bio"
                    placeholder="Add Bio"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.bio && touched.bio ? errors.bio : ""}
                    disabled={!isProfileEditable}
                  />

                  <div className="md:max-w-[370px] space-y-7">
                    <SelectInput
                      id="city"
                      label="City"
                      placeholder="Select location"
                      variant="outlined"
                      options={citiesOptions}
                      value={values.city}
                      onChange={(value: string) => {
                        setFieldTouched("city", true);
                        setFieldValue("city", value);
                      }}
                      error={errors.city && touched.city ? errors.city : ""}
                      disabled={!isProfileEditable}
                    />

                    {user?.averageRating && (
                      <div className="space-y-1.5">
                        <Label label="Host rating" />
                        <h3 className="text-h4 3xl:text-h3 text-success-500">
                          {user?.averageRating}
                        </h3>
                      </div>
                    )}

                    <div className="flex items-center gap-7">
                      <Label label="Are You Operating As A Business?" />
                      <AppSwitch
                        id="isBusiness"
                        name="isBusiness"
                        value={values.isBusiness}
                        className=""
                        onChange={(checked: boolean) => {
                          setFieldTouched("isBusiness", true);
                          setFieldValue("isBusiness", checked);
                        }}
                        disabled={!isProfileEditable}
                      />
                    </div>
                  </div>
                </div>

                {/* business */}
                <HorizontalDivider variant="dark" />

                {values.isBusiness && (
                  <>
                    <h4 className="hidden md:block text-h5 3xl:text-h4 !font-bold">
                      BUSINESS INFORMATION
                    </h4>

                    <div className="md:max-w-[370px] space-y-7">
                      <ProfilePhotoUpload
                        title="Business Logo"
                        id="businessLogo"
                        name="businessLogo"
                        label=""
                        value={values?.businessLogo || ""}
                        image={user?.businessLogo || null}
                        onChange={async (fieldName, file) => {
                          setFieldTouched(fieldName, true);
                          setFieldValue(fieldName, file);

                          if (file) {
                            const formData = new FormData();
                            formData.append(fieldName, file);
                            console.log(formData);

                            uploadImage.mutate(formData);
                          }
                        }}
                        isLoading={uploadImage.isPending}
                        disabled={!isProfileEditable}
                        showButton={isProfileEditable}
                      />
                      <InputField
                        name="businessName"
                        id="businessName"
                        type="text"
                        label="Business name"
                        placeholder="Enter business name"
                        value={values.businessName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.businessName && touched.businessName
                            ? errors.businessName
                            : ""
                        }
                        disabled={!isProfileEditable}
                      />
                      <InputField
                        name="businessAddress"
                        id="businessAddress"
                        type="text"
                        label="Business Address"
                        placeholder="Enter Business Address"
                        value={values.businessAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.businessAddress && touched.businessAddress
                            ? errors.businessAddress
                            : ""
                        }
                        disabled={!isProfileEditable}
                      />
                      <PhoneNumberAndCountryField
                        inputName="businessPhoneNumber"
                        selectName="businessCountry"
                        inputId="businessPhoneNumber"
                        selectId="businessCountry"
                        label="Business Phone Number"
                        inputPlaceholder="Enter phone number"
                        selectPlaceholder="+234"
                        inputValue={values.businessPhoneNumber}
                        selectValue={values.businessCountry}
                        inputOnChange={(event) => {
                          const number = replaceCharactersWithString(
                            event.target.value
                          );
                          setFieldTouched("businessPhoneNumber", true);
                          setFieldValue("businessPhoneNumber", number);
                        }}
                        selectOnChange={(value: string) => {
                          const countryCode = `+${getCountryCallingCode(value as any)}`;
                          setFieldValue("businessCountry", value);
                          setFieldValue("businessCountryCode", countryCode);
                        }}
                        inputOnBlur={handleBlur}
                        selectOnBlur={handleBlur}
                        // inputClassname
                        selectClassname="!w-[170px]"
                        inputError={
                          errors.businessPhoneNumber &&
                          touched.businessPhoneNumber
                            ? errors.businessPhoneNumber
                            : ""
                        }
                        selectError={
                          errors.businessCountry && touched.businessCountry
                            ? errors.businessCountry
                            : ""
                        }
                        inputDisabled={!isProfileEditable}
                        selectDisabled={!isProfileEditable}
                      />

                      <InputField
                        name="businessEmail"
                        id="businessEmail"
                        type="businessEmail"
                        label="Business Email Address"
                        placeholder="Enter email address"
                        value={user?.businessEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.businessEmail && touched.businessEmail
                            ? errors.businessEmail
                            : ""
                        }
                        disabled={!isProfileEditable}
                      />
                    </div>
                  </>
                )}
                <div className="absolute -top-11 md:top-7 right-0 md:right-[52px] !m-0">
                  {isProfileEditable ? (
                    <div className="flex gap-3 items-center">
                      <Button
                        variant="filled"
                        color="primary"
                        type="submit"
                        className="!py-3 !px-5 !text-sm 3xl:!text-base"
                        loading={
                          isSubmitting || updateProfileMutation.isPending
                        }
                        disabled={
                          isSubmitting ||
                          updateProfileMutation.isPending ||
                          !(isValid && dirty)
                        }
                      >
                        Save Profile
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsProfileEditable(false);
                          resetForm();
                        }}
                        className="!py-2.5 !px-5 !text-sm 3xl:!text-base"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="!py-3 !px-5 !text-sm 3xl:!text-base"
                      variant="outlined"
                      onClick={() => setIsProfileEditable(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </main>
  );
}

const Label = ({ label }: { label: string }) => (
  <p className="text-sm block font-medium text-nowrap text-grey-900">{label}</p>
);
