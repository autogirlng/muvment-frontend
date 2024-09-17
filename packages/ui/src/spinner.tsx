import Icons from "@repo/ui/icons";

type Props = {};

export function FullPageSpinner({}: Props) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="animate-spin w-fit *:w-8 *:h-8 text-grey-500">
        {Icons.ic_spinner}
      </div>
    </div>
  );
}

export function Spinner({}: Props) {
  return (
    <div className="animate-spin w-fit *:w-6 *:h-6 text-grey-500">
      {Icons.ic_spinner}
    </div>
  );
}
