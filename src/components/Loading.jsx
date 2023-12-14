import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center ga">
        <ReactLoading
          type="spinningBubbles"
          color="#F9A602"
          height={200}
          width={150}
        />
      </div>
    </div>
  );
};

export default Loading;
