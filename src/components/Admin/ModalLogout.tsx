import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { logout } from "@/lib/features/auth/authSlice";
import { Toaster } from "../ui/toaster";

const ModalLogout: React.FC = () => {
  // const handleLogout = () => {
  //   dispatch(logout())
  //     .unwrap()
  //     .then(() => {
  //       toast({
  //         title: "Logout",
  //         description: "You have been logged out",
  //       });
  //     });

  //   setTimeout(() => {
  //     router.push("/logintoadmin");
  //   }, 2000);
  // };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className=" px-2 py-1 text-sm rounded-sm bg-[#D7713E] text-secondary-foreground border-[0.8px]  hover:shadow-btn_sec transition-all">
          Logout
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you user to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction className="text-white" onClick={handleLogout}>
              Logout
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
        <Toaster />
      </AlertDialog>
    </>
  );
};

export default ModalLogout;
