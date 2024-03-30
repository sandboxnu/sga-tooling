import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SGATags } from "../../util/Types";

export const DropDownComponent = () => {
  // availableTags to filter by: SGATags
  const dropDownOptions = Object.values(SGATags);

  const [searchParams, setSearchParams] = useSearchParams();
  const [availableFilters, setAvailableFilters] = useState(dropDownOptions);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // searchParams are all under the queryParam "filter"
    const currentParms = searchParams.getAll("filter");
    const options = dropDownOptions.filter(
      (item) => !currentParms.includes(item)
    );

    setAvailableFilters(options);
    setAppliedFilters(currentParms);
    // eslint-disable-next-line
  }, [searchParams]);

  const onDropDownClick = () => {
    // TODO: add more to this check
    setIsOpen(!isOpen);
  };

  const onFilterClick = (option: string) => {
    //push a new queryParam onto the existing URL
    searchParams.append("filter", option);
    setSearchParams(searchParams);
  };

  const onRemovalButton = (option: string) => {
    // filter upon the name
    const currentFilters = searchParams.getAll("filter");
    const newParams = currentFilters.filter((f) => {
      return f !== option;
    });
    setSearchParams({ filter: newParams });
  };

  return (
    <div className="flex">
      <div>
        <div role="button" onClick={(e) => onDropDownClick()}>
          Filters
        </div>
        {isOpen &&
          availableFilters.map((option) => (
            <div
              role="button"
              onClick={(e) => {
                onFilterClick(option);
                e.stopPropagation();
              }}
            >
              {option}
            </div>
          ))}
      </div>

      <div>
        {appliedFilters.map((item) => (
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
};
