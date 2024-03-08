import Avatar from "components/common/Avatar";

import { AvatarList } from "./styles";

interface AddDogAvatarProps {
  selectedDogs: any[];
  onRemove: (dogId: number) => void;
}

const AddDogAvatar = ({ selectedDogs, onRemove }: AddDogAvatarProps) => {
  return (
    <AvatarList>
      {selectedDogs.map((dog) => (
        <Avatar
          key={dog.dogId}
          id={dog.dogId}
          name={dog.dogName}
          handleClick={() => onRemove(dog.dogId)}
        />
      ))}
    </AvatarList>
  );
};

export default AddDogAvatar;
