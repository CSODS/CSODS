import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioBtnPill } from "@/components";
import { useAllTags, useTagCategoryMap } from "@/hooks";
import { IProjectSearchParameters } from "@/types";
import { getPageLink } from "../utils";

export default function SearchBar() {
  const tagCategoryMap = useTagCategoryMap();
  const [searchString, setSearchString] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const handleType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value);
  }

  const handleRadioBtnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(evt.target.value);
  }

  const navigate = useNavigate();
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      let searchParameters: IProjectSearchParameters = {};
      const tagDetails = tagCategoryMap.get(searchFilter);
      if (tagDetails) {
        const tagCategory = tagDetails.tagCategory;
        const tagId = tagDetails.tagId;
        searchParameters = { [tagCategory]: tagId };
      }
      if (searchString.trim() !== '') {
        searchParameters.projectTitle = searchString;
      }
      const link = getPageLink(1, searchParameters);
      navigate(link);
      return;
    }
  }

  return(
    <div className="d-md-block d-none">
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <div className='py-3 px-4 col-md-6 d-flex align-items-center justify-content-start border border-light-1 rounded-pill bg-light-3 translucent-20'>
          <i className="bi bi-search color-light-1 me-3"></i>
          <input type='text' className='m-0 fs-6 w-100 color-light-1' placeholder='Search projects...' value={searchString} onChange={handleType} onKeyDown={handleKeyDown}/>
        </div>
      </div>
      <FilterButtons onRadioBtnChange={handleRadioBtnChange}/>
      {/* <div className='mt-4'>
        <button type='button' className='btn btn-dark-3 hover-invert translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>All</button>
        <button type='button' className='btn btn-dark-3 hover-invert translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>JavaScript</button>
        <button type='button' className='btn btn-dark-3 hover-invert translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>Python</button>
        <button type='button' className='btn btn-dark-3 hover-invert translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C#</button>
        <button type='button' className='btn btn-dark-3 hover-invert translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C</button>
      </div> */}
    </div>
  );
}

interface FilterButtonsProps {
  onRadioBtnChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function FilterButtons({ onRadioBtnChange }: FilterButtonsProps) {
  const allTags = useAllTags();
  //  TO DO: include the filter button contents in FilterButtonProps
  const devTypes = allTags.DevTypes;

  return (
    <div className="mt-4 d-flex flex-wrap justify-content-center">
      <RadioBtnPill
        key='filter-nofilter'
        componentId='filter-nofilter-option'
        componentName='filter-options'
        bgColor='dark-3'
        hoverBehavior='invert'
        opacity={60}
        margin={[{y: 1, x: 2}]} 
        padding={[{x: 3, y: 1}]} 
        border={{width: 1, color:'light-1'}} 
        componentValue='All'
        onRadioBtnChange={onRadioBtnChange}
        defaultChecked
      />
      {
        devTypes.map((devType) => {
          const filterId = devType.DevTypeId;
          const filterName = devType.DevTypeName;
          const componentKey = `filter-devType-${filterId}`;
          const componentId = `filter-devType-option-${filterId}`;
          return (
            <RadioBtnPill
              key={componentKey}
              componentId={componentId}
              componentName="filter-options"
              bgColor='dark-3'
              hoverBehavior='invert' 
              opacity={60} 
              margin={[{y: 1, x: 2}]} 
              padding={[{x: 3, y: 1}]} 
              border={{width: 1, color:'light-1'}} 
              componentValue={filterName}
              onRadioBtnChange={onRadioBtnChange}
            />
          )
        })
      }
    </div>
  )
}