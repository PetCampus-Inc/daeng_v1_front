import AddIcon from "assets/svg/add-icon";
import { Modal } from "components/common/Modal";
import { useOverlay } from "hooks/common/useOverlay";
import React from "react";
import { useRecoilCallback } from "recoil";
import { ticketCounterState } from "store/form";

import { CounterBottomSheet } from "./CounterBottomSheet";
import * as Styled from "./styles";
import { TicketGroup } from "./TicketGroup";
import { useTicketFieldArray } from "./useTicketFieldArray";

const INIT_COUNTER = 2;

type TicketTypeProps = {
  name: string;
  ticketType: "ROUND" | "MONTHLY";
  defaultValues?: number[];
};

export const TicketType = React.memo(
  ({ name, ticketType, defaultValues = [] }: TicketTypeProps) => {
    const FIELD_NAME = name;
    const MAX_ITEMS = 6;
    const MIN_ITEMS = 1;
    const TICKET_TYPE = ticketType === "ROUND" ? "회차권" : "정기권";
    const TIMES = ticketType === "ROUND" ? "회" : "주";

    const { fields, append, remove } = useTicketFieldArray({
      fieldName: FIELD_NAME,
      defaultValues
    });

    const overlay = useOverlay();

    const handleAddRadio = useRecoilCallback(
      ({ set, snapshot }) =>
        async () => {
          const counter = await snapshot.getPromise(ticketCounterState);
          if (fields.length < MAX_ITEMS) {
            append(counter);
            overlay.close();
            set(ticketCounterState, INIT_COUNTER);
          } else {
            alert("더 이상 추가할 수 없습니다.");
          }
        },
      [fields]
    );

    const handleRemove = (index: number) => {
      if (fields.length > MIN_ITEMS) {
        remove(index);
      } else {
        openDeleteModal();
      }
    };

    const openTicketCounter = () =>
      overlay.open(({ isOpen, close }) => (
        <CounterBottomSheet
          isOpen={isOpen}
          close={close}
          ticketType={ticketType}
          fields={fields}
          action={handleAddRadio}
        />
      ));

    const openDeleteModal = () =>
      overlay.open(({ isOpen, close }) => (
        <Modal isOpen={isOpen} close={close}>
          <Modal.Content>
            <Modal.Title
              title="모두 삭제할 수 없어요"
              subtitle={`최소 1개 이상의 ${TICKET_TYPE} 옵션을 추가해 주세요`}
            />
            <Modal.Button actionText="닫기" actionFn={close} />
          </Modal.Content>
        </Modal>
      ));

    return (
      <>
        <TicketGroup suffix={TIMES} name={FIELD_NAME} fields={fields} remove={handleRemove} />
        <Styled.AddButton
          type="button"
          onClick={openTicketCounter}
          disabled={fields.length >= MAX_ITEMS}
        >
          <AddIcon />
          {TICKET_TYPE} 직접 추가
        </Styled.AddButton>
      </>
    );
  }
);
