import { Formik, Form } from "formik";
import SelectInput from "@repo/ui/select";
import AppSwitch from "@repo/ui/switch";
import Tooltip from "@repo/ui/tooltip";
import Collapse from "@repo/ui/collapsible";
import Icons from "@repo/ui/icons";
import { outskirtsLocationOptions } from "@/utils/data";
import { availabilityAndPricingSchema } from "@/utils/validationSchema";
import { StepperNavigation } from "@repo/ui/stepper";
import { GroupCheckBox } from "@repo/ui/checkbox";
import FormRow from "./FormRow";
import PricingRow from "./PricingRow";
import DiscountRow from "./DiscountRow";
import OutskirtRow from "./OutskirtRow";
import useAvailabilityAndPricingForm from "./useAvailabilityAndPricingForm";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const AvailabilityAndPricingForm = ({ steps,setCurrentStep,currentStep }: Props) => {
  const {

    submitStep4,
    saveStep4,
    mapValuesToApiPayload,
    initialValues,
    showOuskirts,
    setShowOuskirts,
  } = useAvailabilityAndPricingForm({currentStep,setCurrentStep});
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={availabilityAndPricingSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form values:", values);
        const payload = mapValuesToApiPayload(values);
        submitStep4.mutate(payload);
        setSubmitting(false);
      }}
    >
      {({
        values,
        touched,
        errors,
        isValid,
        dirty,
        handleBlur,
        handleChange,
        setFieldTouched,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form className="w-full md:w-[calc(100%-250px)] space-y-[72px]">
          <div className="max-w-[800px] w-full space-y-[72px]">
            <FormRow
              title="Advance notice"
              description=" How much advance notice do you need before the trip starts?"
            >
              <SelectInput
                id="advanceNoticeInDays"
                label="Advance notice"
                placeholder="1 day"
                variant="outlined"
                className="max-w-[375px]"
                options={[
                  { value: "1 day", option: "1 day" },
                  { value: "2 days", option: "2 days" },
                  { value: "3 days", option: "3 days" },
                  { value: "1 week", option: "1 week" },
                ]}
                value={values.advanceNoticeInDays}
                onChange={(value: string) => {
                  setFieldTouched("advanceNoticeInDays", true);
                  setFieldValue("advanceNoticeInDays", value);
                }}
                error={
                  errors.advanceNoticeInDays && touched.advanceNoticeInDays
                    ? errors.advanceNoticeInDays
                    : ""
                }
                info
                tooltipTitle=""
                tooltipDescription=""
              />
            </FormRow>
            <FormRow
              title="Trip duration"
              description="What’s the shortest and longest trip you’ll accept?"
            >
              <div className="max-w-[770px] flex flex-col sm:flex-row gap-5">
                <SelectInput
                  id="minTripDurationInDays"
                  label="Minimum trip duration"
                  placeholder="1 day"
                  variant="outlined"
                  options={[{ value: "1 day", option: "1 day" }]}
                  value={values.minTripDurationInDays}
                  disabled
                  info
                  tooltipTitle=""
                  tooltipDescription=""
                />
                <SelectInput
                  id="maxTripDurationInDays"
                  label="Maximum trip duration"
                  placeholder="1 day"
                  variant="outlined"
                  options={[
                    { value: "1 day", option: "1 day" },
                    { value: "2 days", option: "2 days" },
                    { value: "3 days", option: "3 days" },
                    { value: "1 week", option: "1 week" },
                  ]}
                  value={values.maxTripDurationInDays}
                  onChange={(value: string) => {
                    setFieldTouched("maxTripDurationInDays", true);
                    setFieldValue("maxTripDurationInDays", value);
                  }}
                  error={
                    errors.maxTripDurationInDays &&
                    touched.maxTripDurationInDays
                      ? errors.maxTripDurationInDays
                      : ""
                  }
                  info
                  tooltipTitle=""
                  tooltipDescription=""
                />
              </div>
            </FormRow>

            {/* <FormRow title="Self-drive eligibility">
              <SelectInput
                id="selfDrive"
                label="Is your vehicle for self-driving services?"
                placeholder="No"
                variant="outlined"
                className="max-w-[375px]"
                options={[
                  { value: "yes", option: "Yes" },
                  { value: "no", option: "No" },
                ]}
                value={values.selfDrive}
                onChange={(value: string) => {
                  setFieldTouched("selfDrive", true);
                  setFieldValue("selfDrive", value);
                }}
                error={
                  errors.selfDrive && touched.selfDrive ? errors.selfDrive : ""
                }
                info
                tooltipTitle=""
                tooltipDescription=""
              />
            </FormRow> */}
            <FormRow title="Additional Services">
              <div className="max-w-[770px] flex flex-col sm:flex-row gap-5">
                <SelectInput
                  id="driverProvided"
                  label="Will you provide a driver?"
                  placeholder="1 day"
                  variant="outlined"
                  options={[
                    { value: "yes", option: "Yes" },
                    { value: "no", option: "No" },
                  ]}
                  value={values.driverProvided}
                  onChange={(value: string) => {
                    setFieldTouched("driverProvided", true);
                    setFieldValue("driverProvided", value);
                  }}
                  error={
                    errors.driverProvided && touched.driverProvided
                      ? errors.driverProvided
                      : ""
                  }
                  info
                  tooltipTitle=""
                  tooltipDescription=""
                />
                <SelectInput
                  id="fuelProvided"
                  label="Will you provide at least 20 liters of fuel?"
                  placeholder="1 day"
                  variant="outlined"
                  options={[
                    { value: "yes", option: "Yes" },
                    { value: "no", option: "No" },
                  ]}
                  value={values.fuelProvided}
                  onChange={(value: string) => {
                    setFieldTouched("fuelProvided", true);
                    setFieldValue("fuelProvided", value);
                  }}
                  error={
                    errors.fuelProvided && touched.fuelProvided
                      ? errors.fuelProvided
                      : ""
                  }
                  info
                  tooltipTitle=""
                  tooltipDescription=""
                />
              </div>
            </FormRow>
          </div>

          <div className="space-y-8">
            <p className="text-h6 3xl:text-h5 font-medium text-black">
              Pricing
            </p>
            <div className="space-y-8 3xl:space-y-[50px]">
              <PricingRow
                title="What is your daily rate?"
                rateLabel="You'll receive"
                rateName="dailyRate"
                ratePlaceholder="NGN0"
                rateUnit="/day"
                serviceFeeName="serviceFeeDaily"
                guestWillSeeName="guestWillSeeDaily"
                rateValue={values.dailyRate}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <PricingRow
                title="What is your extra hourly rate?"
                rateLabel="You'll receive"
                rateName="extraHourRate"
                ratePlaceholder="NGN0"
                rateUnit="/hr"
                serviceFeeName="serviceFeeHourly"
                guestWillSeeName="guestWillSeeHourly"
                rateValue={values.extraHourRate}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <PricingRow
                title="Airport pickups & dropoffs"
                rateLabel="You'll receive"
                rateName="airportPickup"
                ratePlaceholder="NGN0"
                rateUnit="/hr"
                serviceFeeName="serviceFeeAirport"
                guestWillSeeName="guestWillSeeAirport"
                rateValue={values.airportPickup}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                optional
              />
            </div>
          </div>

          <div className="space-y-8">
            <Collapse
              title={
                <p className="text-h6 3xl:text-h5 font-medium text-black">
                  Discounts
                </p>
              }
              closeText={
                <p className="text-primary-500 font-medium text-sm 3xl:text-xl flex items-center gap-1 ">
                  {Icons.ic_add} <span>Add Discounts</span>
                </p>
              }
              openText={
                <p className="text-primary-500 font-medium text-sm 3xl:text-xl flex items-center gap-1">
                  {Icons.ic_remove} <span>Remove Discounts</span>
                </p>
              }
            >
              <div className="space-y-8 3xl:space-y-[50px] pt-8">
                <DiscountRow
                  title="3+ days discount"
                  percentageLabel="Percentage discount"
                  percentageName="threeDaysDiscount"
                  percentagePlaceholder="10%"
                  rateUnit="for 3+ days trips"
                  serviceFeeName="serviceFeeDaily"
                  rateValue={values.threeDaysDiscount}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  dailyRateValue={values.dailyRate}
                />
                <DiscountRow
                  title="7+ days discount"
                  percentageLabel="Percentage discount"
                  percentageName="sevenDaysDiscount"
                  percentagePlaceholder="10%"
                  rateUnit="for 7+ days trips"
                  serviceFeeName="serviceFeeDaily"
                  rateValue={values.sevenDaysDiscount}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  dailyRateValue={values.dailyRate}
                />
                <DiscountRow
                  title="30+ days discount"
                  percentageLabel="Percentage discount"
                  percentageName="thirtyDaysDiscount"
                  percentagePlaceholder="10%"
                  rateUnit="for 30+ days trips"
                  serviceFeeName="serviceFeeDaily"
                  rateValue={values.thirtyDaysDiscount}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  dailyRateValue={values.dailyRate}
                />
              </div>
            </Collapse>
          </div>

          <div>
            <div className="flex justify-between gap-3">
              <p className="text-h6 3xl:text-h5 font-medium text-black">
                Do you charge extra for outskirt locations?
              </p>
              <AppSwitch
                id="outskirtLocations"
                name="outskirtLocations"
                value={showOuskirts}
                onChange={(checked) => setShowOuskirts(checked)}
              />
            </div>
            {showOuskirts && (
              <div className="space-y-8">
                <OutskirtRow
                  rateName="outskirtsPrice"
                  rateUnit="/day"
                  regularFeeName="regularFeeOutskirt"
                  guestWillSeeName="guestWillSeeOutskirt"
                  rateValue={values.outskirtsPrice}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  dailyRateValue={values.dailyRate}
                />
                <div className="space-y-3">
                  <label
                    htmlFor="features"
                    className="text-sm block font-medium text-black"
                  >
                    Outskirt Locations
                  </label>
                  <p className="text-sm text-grey-600">
                    Uncheck locations you do not want to visit with your vehicle
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-8">
                    {outskirtsLocationOptions.map((feature) => (
                      <GroupCheckBox
                        key={feature}
                        feature={feature}
                        checkedValues={values.outskirtsLocation}
                        onChange={(feature: string, isChecked: boolean) => {
                          if (isChecked) {
                            const newValues = [
                              ...values.outskirtsLocation,
                              feature,
                            ];
                            setFieldValue("outskirtsLocation", newValues);
                          } else {
                            const newValues = values.outskirtsLocation.filter(
                              (value) => value !== feature
                            );
                            setFieldValue("outskirtsLocation", newValues);
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <StepperNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleSaveDraft={() => {
              const payload = mapValuesToApiPayload(values);
              saveStep4.mutate(payload);
            }}
            isSaveDraftloading={saveStep4.isPending}
            isNextLoading={isSubmitting || submitStep4.isPending}
            disableNextButton={
              !isValid || isSubmitting || submitStep4.isPending
              // ||disableNextButton
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default AvailabilityAndPricingForm;
