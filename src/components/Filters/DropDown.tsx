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
  const [isOpen, setIsOpen] = useState(false);

  // when searchParams change, update our available Filters if we can
  useEffect(() => {
    const currentFilterParams = searchParams.getAll("filter");
    const options = availableFilters.filter((item) => {
      return !currentFilterParams.includes(item);
    });
    setAvailableFilters(options);
  }, [searchParams, availableFilters]);

  const onDropDownClick = () => {
    // TODO: if we have options setIsOpen => true
    setIsOpen(!isOpen);
  };

  const onFilterClick = (option: string) => {
    //push a new queryParam onto the existing URL
    searchParams.append("filter", option);
    setSearchParams(searchParams);
  };

  // set multiple urls
  // const removedItemOptions = dropDownOptions.filter(
  //   (item) => item !== option
  // );
  // setDropDownOptions(removedItemOptions);

  // const newSelectedFilters = [...selectedFilters];
  // newSelectedFilters.push(option);

  // setSelectedFilters(newSelectedFilters);
  // to keep the order preserved create the state here instead for the setDropDownOptions
  // we have the initial List then using our own state
  // all you care about is selectedFilers which will still update

  // can use the link component, and in the homepage I can get the searchParams

  const onRemovalButton = (option: string) => {
    // we are filtering on the name
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
};
