import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Vector from "../../assets/Vector.svg";
import { SGATags } from "../../util/Types";

export const DropDownComponent = () => {
  // availableTags to filter by: SGATags
  const dropDownOptions = Object.values(SGATags);

  const [searchParams, setSearchParams] = useSearchParams();
  const [availableFilters, setAvailableFilters] = useState(dropDownOptions);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentParms = searchParams.getAll("filter");
    const options = dropDownOptions.filter(
      (item) => !currentParms.includes(item)
    );

    setAvailableFilters(options);
    setAppliedFilters(currentParms);
    // eslint-disable-next-line
  }, [searchParams]);

  const onDropDownClick = () => {
    if (availableFilters.length !== 0) {
      setIsOpen(!isOpen);
    }
  };

  // TODO: cleanup of when there are no filters

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
      <div className="relative">
        {/* Plus icon*/}
        <button
          className="rounded font-bold "
          onClick={(e) => onDropDownClick()}
        >
          Filters
        </button>
        {isOpen && (
          <div className="rounded absolute border z-10 w-36">
            <ul>
              {availableFilters.map((option) => (
                <li
                  className="bg-gray-100"
                  role="button"
                  key={option}
                  onClick={(e) => {
                    onFilterClick(option);
                    e.stopPropagation();
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        {/* Check out the applied Filters styling from Cargurus Page, also reuse the comopoent from EventTag*/}
        {appliedFilters.map((item) => (
          <div
            className="bg-tag-green break-words rounded-xl text-sm font-bold font-sans px-4 py-1"
            role="button"
            onClick={(e) => {
              onRemovalButton(item);
            }}
          >
            <img src={Vector} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
