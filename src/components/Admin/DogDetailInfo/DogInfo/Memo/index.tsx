import PencilIcon from "assets/svg/pencil-icon";
import { InfoTop } from "../AboutDog/styles";
import { TextAreaInput } from "components/common/TextArea/styles";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import TextAreaModal from "components/common/TextAreaModal";
import { DogDetailInfoText } from "../styles";

const Memo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getValues, register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    // TODO: post API 연동
    setIsOpen(false);
  });

  return (
    <>
      <InfoTop>
        <DogDetailInfoText className="big">메모</DogDetailInfoText>
        <PencilIcon
          handleTouch={() => {
            setIsOpen(true);
          }}
        />
      </InfoTop>
      {/* FIXME: 나영이 작업 머지되면 수정하기 */}
      <TextAreaInput
        $isChecked={false}
        resizable={false}
        placeholder="메모를 입력해주세요"
        onClick={() => {
          setIsOpen(true);
        }}
        readOnly
        value={getValues("memoModal")}
      />
      <AnimatePresence>
        {isOpen && (
          <TextAreaModal
            actionbutton="저장"
            closebutton="취소"
            closefunc={() => setIsOpen(false)}
            name="memoModal"
            register={register}
            actionfunc={onSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Memo;
