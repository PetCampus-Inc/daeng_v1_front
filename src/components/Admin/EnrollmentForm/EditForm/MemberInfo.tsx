import { FIELD, FIELD_KEYS } from "constants/field";

import { TextInput, ToggleLabel } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";
import { Controller, Form, useFormContext } from "react-hook-form";

import { Card } from "../styles";

export function MemberInfo() {
  const { control } = useFormContext();

  return (
    <Form control={control}>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.MEMBER_NAME}`}
          render={({ field }) => (
            <ToggleLabel {...field} readOnly showToggle>
              이름
            </ToggleLabel>
          )}
        />
        <TextInput placeholder="견주 이름을 입력하는 칸이에요" disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.MEMBER_GENDER}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle>
              성별
            </ToggleLabel>
          )}
        />
        <SingleRadio radiosText={["남", "여"]} disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.MEMBER_ADDRESS}`}
          render={({ field }) => (
            <ToggleLabel {...field} readOnly showToggle>
              주소
            </ToggleLabel>
          )}
        />
        <SearchInputField placeholder="주소를 입력하는 칸이에요" disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.MEMBER_PHONE}`}
          render={({ field }) => (
            <ToggleLabel {...field} readOnly showToggle>
              연락처
            </ToggleLabel>
          )}
        />
        <TextInput placeholder="견주가 연락처를 입력하는 칸이에요" disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.EMERGENCY_NUMBER}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle>
              비상 연락처
            </ToggleLabel>
          )}
        />
        <TextInput placeholder="견주가 비상연락처를 입력하는 칸이에요" disabled />
      </Card>
    </Form>
  );
}
