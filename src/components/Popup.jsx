import { ExitIcon } from "./icons";

const Popup = ({ handleClick, children }) => {
  return (
    <div className="bg-transparent w-screen min-h-screen h-auto fixed z-50 top-0 left-0 backdrop-blur-md opacity-100 flex justify-center items-center">
      <div className="fixed z-40 bg-amber-100 w-screen h-screen top-0 left-0 opacity-70" />
      <div className="bg-white rounded-2xl p-10 w-fit z-50 max-h-[calc(100vh-32px)] overflow-y-auto">
        <div
          className="flex w-full justify-end items-end pb-4"
        >
          <ExitIcon onClick={handleClick}/>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
