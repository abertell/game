import React, { useCallback } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import styles from "./ImportCode.module.scss";
import { TAS } from "../../../../game/classes/john/TAS";

interface Props {
  className?: string;
  modalId: number;
  onEnterCode: (code: string) => void;
}

interface FormData {
  inputCode: string;
}

export const ImportCode = observer<Props>(function ImportCode(props) {
  const { modalId, onEnterCode } = props;
  const { modal } = useStore();
  const buffer = TAS.buffer;

  const { register, handleSubmit } = useForm<
    FormData
  >({
    defaultValues: {
      inputCode: buffer,
    }
  });

  const onClose = useCallback(() => {
    modal.dismiss(modalId);
  }, [modal, modalId]);

  const onFormSubmit = useCallback(
    (data: FormData) => {
      modal.dismiss(modalId);
      onEnterCode(data.inputCode.replace("\r", ""));
    },
    [modal, modalId, onEnterCode]
  );

  return (
    <Modal.Dialog className={cn(styles.dialog, props.className)}>
      <Modal.Header closeButton onHide={onClose}>
        <Modal.Title>Import/Export Inputs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="inputCode"
          className={styles.form}
          noValidate
          onSubmit={handleSubmit(onFormSubmit)}

        >
          <Form.Group className={styles.userLevel}>
            <Form.Control
              name="inputCode"
              className={styles.codeArea}
              size="sm"
              as="textarea"
              placeholder="Frame Inputs"
              spellCheck={false}
              ref={register}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" form="inputCode">
          Import
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
});
