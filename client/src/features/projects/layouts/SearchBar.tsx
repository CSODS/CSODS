import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProjectSearchParameters } from "@/features/projects/types";
import { getProjectsPageLink } from "@/features/projects/utils";

export function SearchBar() {
  const [searchString, setSearchString] = useState<string>("");

  const handleType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value);
  };

  const navigate = useNavigate();
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      let searchParameters: IProjectSearchParameters = {};
      if (searchString.trim() !== "") {
        searchParameters["project_title"] = searchString;
      }
      const link = getProjectsPageLink(1, searchParameters);
      navigate(link);
      return;
    }
  };

  return (
    <div className="ms-1 me-auto col-md-5 col-sm-6 col d-lg-none d-flex">
      <div className="w-100 d-flex align-items-center justify-content-center bg-light-1 translucent-30 rounded-1">
        <input
          type="text"
          className="mx-1 my-1 w-100 fs-6 color-light-1"
          value={searchString}
          onChange={handleType}
          onKeyDown={handleKeyDown}
        />
        <div className="px-2 h-100 d-flex justify-content-center align-items-center bg-dark-3 translucent-70 rounded-end-1">
          <i className="px-1 bi bi-search color-light-1" />
        </div>
      </div>
    </div>
  );
}
