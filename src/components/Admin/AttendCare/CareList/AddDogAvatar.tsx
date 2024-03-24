import Avatar from "components/common/Avatar";

import { AvatarList } from "./styles";
import { useSelectedDogs } from "../hooks/useSelectedDogs";

const AddDogAvatar = () => {
  const [selectedDogs, dispatch] = useSelectedDogs();
  if (selectedDogs.length === 0) return null;

  const removeDog = (dogId: number) => {
    dispatch({ type: "REMOVE_DOG", payload: dogId });
  };

  return (
    <AvatarList>
      {selectedDogs.map((dog) => (
        <Avatar
          key={dog.dogId}
          id={dog.dogId}
          name={dog.dogName}
          handleClick={() => removeDog(dog.dogId)}
        />
      ))}
    </AvatarList>
  );
};

export default AddDogAvatar;
