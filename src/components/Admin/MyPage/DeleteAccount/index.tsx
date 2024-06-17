import Header from "components/common/Header";

interface DeleteAccountProps {
  setStep: (step: number) => void;
}

const DeleteAccount = ({ setStep }: DeleteAccountProps) => {
  return (
    <>
      <Header type="back" handleClick={() => setStep(0)} />
    </>
  );
};

export default DeleteAccount;
