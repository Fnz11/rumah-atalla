import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound4040() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-screen bg-thirdyThin flex flex-col items-center justify-center ">
        <Button
          className={"mt-7"}
          variant={"secondary"}
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-house mr-2"></i>
          Back to Home
        </Button>
      </div>
    </>
  );
}
