import Tips from "../Tips";

const AvailabilityAndPricingTips = () => {
  return (
    <Tips>
      <div className="hidden md:block">
        <p className="text-xl font-semibold"> Set your own rates</p>
        <p className="text-sm">
          A competitive price can significantly increase your chances of getting
          booked. Consider offering a special discount for longer rental
          periods, as this can make your listing even more appealing.
        </p>
      </div>
    </Tips>
  );
};

export default AvailabilityAndPricingTips;
