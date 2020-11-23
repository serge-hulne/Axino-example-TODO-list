import { Button } from "axino/button";
import { Div } from "axino/div";
import { colors } from "axino/constants";
import { CheckBox } from "axino/checkbox";
import { Widget } from "axino/widget";

//==================
// Task Widget     :
//==================

// Task Widget:
class Task extends Widget {
  // Data:
  wrapperDiv: Div;
  taskDiv: Div;
  checked: boolean;
  text: string;
  checkButton: CheckBox;
  deleteButton: Button;

  // Constructor:
  constructor(text: string, checked: boolean = false, props:any=null) {
    super();
    this.checked = checked;
    this.text = text;

    // Create wrapper Div:
    this.wrapperDiv = new Div(null);
    this.wrapperDiv.Margin("5px");
    this.wrapperDiv.Width("90%");
    this.wrapperDiv.Border();
    this.wrapperDiv.setBackgroundColor("white");
    this.wrapperDiv.appendTo(this);

    // Create inner Div:
    this.taskDiv = new Div(text);
    this.checked = this.checked;

    // Styling the Div:
    this.taskDiv.vertical();
    this.taskDiv.alignCenter();
    this.taskDiv.Border();
    this.taskDiv.Width("90%");
    this.taskDiv.Height("50px");
    this.taskDiv.Attribute("contenteditable", "true");
    this.taskDiv.Margin("10px");
    this.taskDiv.Padding("20px");

    // Text attribute of TaskDiv:
    this.taskDiv.node.innerHTML = text;
    this.taskDiv.appendTo(this.wrapperDiv);

    // CheckButton:
    this.checkButton = new CheckBox();
    this.checkButton.Margin("10px");
    this.checkButton.appendTo(this.wrapperDiv);

    // Initially checked :
    this.refresh();

    // Delete task button:
    this.deleteButton = new Button("-");
    this.deleteButton.Margin("10px");
    this.deleteButton.appendTo(this.wrapperDiv);

  }

  clone() : Task {
    return new Task(this.text, this.checked);
  }

  refresh() {
    if (this.checked) {
      this.taskDiv.setBackgroundColor(colors.lightgrey);
      this.checkButton.setChecked(true);
    } else {
      this.taskDiv.setBackgroundColor(colors.lightgoldenrodyellow);
      this.checkButton.setChecked(false);
    }
  }
}

export { Task };
