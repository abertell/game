import React, { useCallback, useState } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { parse } from "../../../../shared/level";
import { useStore } from "../../store";
import { TAS } from "../../../../game/classes/john/TAS";
import styles from "./CommandPane.module.scss";

export interface CommandPaneProps {
  className?: string;
}

export const CommandPane = observer<CommandPaneProps>(function CommandPane(
  props
) {
  const { modal, game } = useStore();
  const { className } = props;

  const [modalId, setModalId] = useState<number | null>(null);

  const onPractice = useCallback(() => {
    if (modal.instances.some((i) => i.id === modalId)) {
      return;
    }

    setModalId(
      modal.present({
        type: "select-level",
        onEnterLevel: (level) => {
          game.focus();
          game.stage?.__withContext(() => {
            if (typeof level === "number") {
              game.main?.startPracticeLevel(level);
            } else {
              game.main?.setUserLevel(parse(level));
              game.main?.startPracticeLevel(999);
            }
          })();
        },
      })
    );
  }, [modal, modalId, game]);

  const onLoadInputs = useCallback(() => {
    if (modal.instances.some((i) => i.id === modalId)) {
      return;
    }
    TAS.inputsToString();

    setModalId(
      modal.present({
        type: "import-code",
        onEnterCode: (level) => {
          TAS.buffer = level;
          TAS.stringToInputs();
        },
      })
    );
  }, [modal, modalId, game]);

  return (
    <div className={cn(className, styles.pane)}>
      <h2 className={styles.title}>Commands</h2>
      <button type="button" className={styles.action} onClick={onPractice}>
        Practice Level
      </button>
      <button type="button" className={styles.action} onClick={onLoadInputs}>
        Import/Export Inputs
      </button>
      <br></br>
      &nbsp;&nbsp;&nbsp;Frame key order: [W, A, S, D, Flow, P, K, None]
      <br></br>
      &nbsp;&nbsp;&nbsp;Last entry is 2 if frame is the save state
      <br></br>
      &nbsp;
      <br></br>
      &nbsp;&nbsp;&nbsp;Player Modes:
      <br></br>
      &nbsp;&nbsp;&nbsp;Red - Recording inputs
      <br></br>
      &nbsp;&nbsp;&nbsp;Green - Playing back inputs
      <br></br>
      &nbsp;&nbsp;&nbsp;Blue - None
      <br></br>
      &nbsp;
      <br></br>
      &nbsp;&nbsp;&nbsp;Key Controls:
      <br></br>
      &nbsp;&nbsp;&nbsp;1 - Pause/play
      <br></br>
      &nbsp;&nbsp;&nbsp;2 - Advance by a frame
      <br></br>
      &nbsp;&nbsp;&nbsp;R - Start/stop recording
      <br></br>
      &nbsp;&nbsp;&nbsp;M - Make current frame the save state
      <br></br>
      &nbsp;&nbsp;&nbsp;L - Load save state
    </div>
  );
});
