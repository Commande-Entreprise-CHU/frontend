import React from "react";
import B1 from "./teeth/B1";
import B2 from "./teeth/B2";
import H5 from "./teeth/H5";
import H6 from "./teeth/H6";
import H4 from "./teeth/H4";
import H3 from "./teeth/H3";
import H7 from "./teeth/H7";
import H2 from "./teeth/H2";
import H1 from "./teeth/H1";
import B3 from "./teeth/B3";
import H8 from "./teeth/H8";
import B4 from "./teeth/B4";
import B5 from "./teeth/B5";
import B6 from "./teeth/B6";
import B8 from "./teeth/B8";
import B7 from "./teeth/B7";
const TeethSelector: React.FC = () => {
  return (
    <div className="flex flex-col w-1/2 gap-4 h-fit">
      <div className="flex gap-0.5 flex-row items-end ">
        <H8 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H7 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H6 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H5 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H4 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H3 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H2 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H1 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <H1 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <H2 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <H3 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <H4 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <H5 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <H6 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <H7 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <H8 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
      </div>

      <div className="flex gap-0.5 flex-row">
        <B8 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B7 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B6 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B5 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B4 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B3 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B2 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B1 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100" />
        <B1 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <B2 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <B3 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <B4 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <B5 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <B6 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <B7 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
        <B8 className="fill-base-300 h-fit hover:fill-primary transition-all duration-100 scale-x-[-1]" />
      </div>
    </div>
  );
};

export default TeethSelector;
