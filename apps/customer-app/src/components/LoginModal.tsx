import Link from "next/link";
import Button from "@repo/ui/button";

const LoginModal = () => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-grey-800">
          Sign In Required
        </h3>
        <p className="text-grey-600">
          Please sign in to add vehicles to your favorites list
        </p>
      </div>

      <div className="space-y-3">
        <Link href="/login" className="block">
          <Button color="primary" fullWidth>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
