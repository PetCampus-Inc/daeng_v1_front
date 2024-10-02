import PickDropInfo from "components/Enrollment/Form/PickDropInfo";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function TestPage() {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { ...defaultFormValues }
  });

  const requiredItemList = new Map<number, boolean>([
    [27, false],
    [28, false],
    [29, false],
    [30, false]
  ]);

  const onSubmit = () => {
    const res = methods.getValues();
    console.log("dd", res);
  };

  return (
    <FormProvider {...methods}>
      <button type="submit" onClick={onSubmit}>
        버튼!!
      </button>
      <PickDropInfo requiredItems={requiredItemList} />
    </FormProvider>
  );
}

const defaultFormValues = {
  pickDropNotice:
    "asdasdasdasdasd asd asdasdjaskldjklj ksjdkasldjqwiosdfndfsdklfjwil jkldklakldqolijk klsdmfkldsfolwkeofklm klsdfjklsdfj qiolr",
  pickDropInfo: "ㅇㄷㅇㄷㅇ"
};
