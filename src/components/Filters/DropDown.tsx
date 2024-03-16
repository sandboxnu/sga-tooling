import React from "react";

// well eventually can or the types that comes in so for now Tags[]
// tags isn't typed yet so list of strings :)

interface DropDownComponentProps {
  dropDownOptions: string[];
  setDropDownOptions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
}

// TODO: boolean Parameter to change functionality between table? since I want to try to re-use this
// if not possible just make the default options here and the setter.

export const DropDownComponent = ({
  dropDownOptions,
  setDropDownOptions,
  selectedFilters,
  setSelectedFilters,
  label,
}: DropDownComponentProps) => {
  // in here defines the function that will be passed down to the other components

  // isn't very efficient creaing lots of copies in doing this:
  const onDropDownClick = (option: string) => {
    const removedItemOptions = dropDownOptions.filter(
      (item) => item !== option
    );
    setDropDownOptions(removedItemOptions);

    const newSelectedFilters = [...selectedFilters];
    newSelectedFilters.push(option);

    setSelectedFilters(newSelectedFilters);
  };

  const onRemovalButton = (option: string) => {
    // once we remove a filter, we should add back into our list
    // then also remove it from the other list:
    const removedFilter = selectedFilters.filter((item) => item !== option);
    setDropDownOptions(removedFilter);

    const addedFilter = [...dropDownOptions];
    addedFilter.push(option);

    setSelectedFilters(addedFilter);
    // TODO: would like to preserve the previous order of these filters
  };

  // TODO: implement hook for closing outside component
  // need to create a Ref, then pass it into here

  // also can make the filters sticky by applying to the search params...
  // that's a Todo after I implement breadcrumbs and see how that works

  return (
    <div className="flex">
      <div>
        {dropDownOptions.map((option) => (
          <div
            role="button"
            onClick={(e) => {
              onDropDownClick(option);
            }}
          >
            {option}
          </div>
        ))}
      </div>

      <div>
        {selectedFilters.map((item) => (
          <div
            role="button"
            onClick={(e) => {
              onRemovalButton(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  // this div should render the component and the row of items currently selected to filter
};
