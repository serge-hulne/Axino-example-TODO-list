
// Axino lib imports:
import { log } from "axino/core";
import { eventsFocus } from "axino/constants";

// local imports:
import { Task } from "./task";


class TaskAction extends Task {
  // Constructor:
  constructor(text: string, checked: boolean = false, props:any=null) {
    super(text);
    this.checked = checked;
    this.refresh();
    
    // CheckButton action:
    this.checkButton.onClick(() => {
      //log("CheckButton clicked (from TaskAction)");
      if (props != null) {
        if (props.check != null) {
          props.check.send(this);
        }
      }
    });

    // DeleteButton action:
    this.deleteButton.onClick(() => {
          if (props != null) {
          if (props.delete != null) {
            props.delete.send(this);
          }
        }
    });

    // eventsFocus action:
    this.taskDiv.onEvent(eventsFocus.blur, () => {
        this.text = this.taskDiv.node.innerHTML;
    });

  }
}

export { TaskAction };
