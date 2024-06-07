import BoxMessage from "../icons/BoxMessage";
import Notification from "../icons/Notification";

const NavBar = () => {
  return (
    <div className="h-16 flex items-center justify-between px-10 border-b">
      <div className="flex gap-10">
        <h1 className="font-bold">About Us</h1>
        <h1 className="font-bold">Services</h1>
        <h1 className="font-bold">Jobs</h1>
      </div>

      <div className="">
        <h1 className="text-4xl font-bold font-spaceGrotesk">SREC</h1>
      </div>

      <div className="flex gap-10 items-center">
        <Notification></Notification>
        <BoxMessage></BoxMessage>

        <div className="pl-2">
          <div className="rounded-full bg-primary100 w-full h-full p-6"></div>
        </div>

      </div>
    </div>
  );
};

export default NavBar;
