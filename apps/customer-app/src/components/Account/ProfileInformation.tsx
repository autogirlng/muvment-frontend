import { useState } from "react";
import { Form, Formik } from "formik";
import { getCountryCallingCode } from "react-phone-number-input";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import PhoneNumberAndCountryField from "@repo/ui/phoneNumberAndCountryField";
import ProfilePhotoUpload from "@repo/ui/profilePhotoUpload";
import {
  getInitialsFromName,
  replaceCharactersWithString,
} from "@/utils/functions";
import { profileFormValidationSchema } from "@/utils/validationSchema";
import { useAppSelector } from "@/lib/hooks";
import FormRow from "../FormRow";
import useUpdateProfile from "@/hooks/useUpdateProfile";

type Props = {};

export default function ProfileInformation({}: Props) {
  const { user } = useAppSelector((state) => state.user);
  const [isProfileEditable, setIsProfileEditable] = useState<boolean>(false);
  const { updateProfileMutation, uploadImage } =
    useUpdateProfile(setIsProfileEditable);

  return (
    <Formik
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phoneNumber: user?.phoneNumber || "",
        country: user?.country || "NG",
        countryCode: user?.countryCode || "+234",
        // email: user?.email || "",
        profileImage: user?.profileImage || "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);

        const { profileImage, ...submittedValues } = values;

        updateProfileMutation.mutate(submittedValues);
        setSubmitting(false);
      }}
      validationSchema={profileFormValidationSchema}
      enableReinitialize={true}
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
                  disabled={!isProfileEditable}
                  initials={
                    user
                      ? getInitialsFromName(user.firstName, user.lastName)
                      : ""
                  }
                />
                <div className="md:max-w-[770px] space-y-7">
                  <FormRow>
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
                  </FormRow>
                  <div className="md:max-w-[370px] space-y-7">
                    <PhoneNumberAndCountryField
                      inputName="phoneNumber"
                      selectName="country"
                      inputId="phoneNumber"
                      selectId="country"
                      label="Phone Number"
                      inputPlaceholder="Enter phone number"
                      selectPlaceholder="+234"
                      inputValue={values.phoneNumber}
                      selectValue={values.country}
                      inputOnChange={(event) => {
                        const number = replaceCharactersWithString(
                          event.target.value
                        );
                        setFieldTouched("phoneNumber", true);
                        setFieldValue("phoneNumber", number);
                      }}
                      selectOnChange={(value: string) => {
                        const countryCode = `+${getCountryCallingCode(
                          value as any
                        )}`;
                        setFieldValue("country", value);
                        setFieldValue("countryCode", countryCode);
                      }}
                      inputOnBlur={handleBlur}
                      selectOnBlur={handleBlur}
                      selectClassname="!w-[170px]"
                      inputDisabled={!isProfileEditable}
                      selectDisabled={!isProfileEditable}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-end gap-1">
                      <InputField
                        name="email"
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Enter email address"
                        value={user?.email}
                        disabled
                      />
                      {user?.emailConfirmed && (
                        <div className="bg-success-50 border border-success-500 rounded-2xl p-3 sm:p-4 h-fit w-fit text-success-600 text-sm 3xl:text-base">
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-11 md:top-7 right-0 md:right-[52px] !m-0">
                {isProfileEditable ? (
                  <div className="flex gap-3 items-center">
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
                    <Button
                      variant="filled"
                      color="primary"
                      type="submit"
                      className="!py-3 !px-5 !text-sm 3xl:!text-base"
                      loading={isSubmitting}
                      disabled={isSubmitting || !(isValid && dirty)}
                    >
                      Save Changes
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
  );
}
