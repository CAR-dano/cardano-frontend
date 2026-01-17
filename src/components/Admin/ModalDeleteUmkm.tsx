import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import SecondaryButton from "../Button/SecondaryButton";

interface ModalDeleteProps {
  data: any;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ data }) => {
  // const handleDelete = () => {
  //   dispatch(deleteUmkm(data._id))
  //     .unwrap()
  //     .then((res) => {
  //       toast({
  //         title: "Success",
  //         description: "Article has been deleted",
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast({
  //         title: "Error",
  //         description: err,
  //         variant: "destructive",
  //       });
  //     });
  // };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <SecondaryButton className="bg-[#D7713E]">Delete</SecondaryButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to delete{" "}
              <span className="font-bold"> {data.title}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction className="text-white" onClick={handleDelete}>
              Delete
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ModalDelete;
