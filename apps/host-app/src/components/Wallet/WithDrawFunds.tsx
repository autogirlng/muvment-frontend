import Button from "@repo/ui/button";
import { BlurredDialog } from "@repo/ui/dialog";
import Withdraw from "@/components/Wallet/Withdraw";
import Image from "next/image";
import VerifyOtp from "@/components/Wallet/VerifyOtp";
import useWithdrawFunds from "@/components/Wallet/hooks/useWithdrawFunds";

type Props = {};

export default function WithDrawFunds({}: Props) {
  const {
    sendOtp,
    verifyOtp,
    amount,
    setAmount,
    otp,
    setOtp,

    openWithdrawModal,
    handleWithdrawModal,
    openVerifyOtpModal,
    handleVerifyOtpModal,
  } = useWithdrawFunds();
  return (
    <>
      <BlurredDialog
        open={openWithdrawModal}
        onOpenChange={handleWithdrawModal}
        trigger={
          <Button
            variant="filled"
            color="primary"
            className="!py-3 3xl:!py-4 !px-5 3xl:!px-6 !text-base 3xl:!text-xl"
          >
            Withdraw Funds
          </Button>
        }
        content={
          <Withdraw
            amount={amount}
            setAmount={setAmount}
            handleWithdrawal={() => sendOtp.mutate()}
            handleModal={handleWithdrawModal}
            isLoading={false}
          />
        }
        width="max-w-[750px] 3xl:max-w-[950px]"
      />
      {openVerifyOtpModal && (
        <BlurredDialog
          title={
            <Image src="/icons/mailbox.png" alt="" width={140} height={93} />
          }
          open={openVerifyOtpModal}
          onOpenChange={handleVerifyOtpModal}
          trigger={<button />}
          content={
            <VerifyOtp
              handleVerifyOtp={() => verifyOtp.mutate(otp)}
              handleModal={handleWithdrawModal}
              isLoading={sendOtp.isPending}
              otp={otp}
              setOtp={setOtp}
              handleResendOtp={() => sendOtp.mutate()}
            />
          }
          width="max-w-[750px] 3xl:max-w-[950px]"
        />
      )}
    </>
  );
}
