import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// well eventually can or the types that comes in so for now Tags[]
// tags isn't typed yet so list of strings :)

interface DropDownComponentProps {
  dropDownOptions: string[];
  setDropDownOptions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
}

// If I'm really lazy, could just redfine this exact same logic for the Attendance Record Component
export const DropDownComponent = ({
  dropDownOptions,
  setDropDownOptions,
  selectedFilters,
  setSelectedFilters,
  label,
}: DropDownComponentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [availableFilters, setAvailableFilters] = useState(dropDownOptions);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  // when searchParams change, update our available Filters if we can
  useEffect(() => {
    const currentFilterParams = searchParams.getAll("filter");
    const options = dropDownOptions.filter((item) => {
      return !currentFilterParams.includes(item);
    });

    setAvailableFilters(options);
    setAppliedFilters(currentFilterParams);

    // it suggests to include availableFilters wihtin the dep array, however doing that causes this
    // useEffect to reload continously, which is not good..
    // eslint-disable-next-line
  }, [searchParams]);

  const onDropDownClick = () => {
    // TODO: if we have options setIsOpen => true
    setIsOpen(!isOpen);
  };

  const onFilterClick = (option: string) => {
    //push a new queryParam onto the existing URL
    searchParams.append("filter", option);
    setSearchParams(searchParams);
  };

  const onRemovalButton = (option: string) => {
    // we are filtering on the name
    // TODO: see if we can shorten this/use previous state?
    const currentFilters = searchParams.getAll("filter");
    const newParams = currentFilters.filter((f) => {
      return f !== option;
    });
    setSearchParams({ filter: newParams });
  };

  // TODO: implement hook for closing outside component
  // need to create a Ref, then pass it into here

  // also can make the filters sticky by applying to the search params...
  // that's a Todo after I implement breadcrumbs and see how that works

  // TODO: I also hate how much this shifts -> fix that as well...

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
