import { Button } from "axino/button";
import { Div } from "axino/div";
import { Widget } from "axino/widget";
import { Component } from "axino/core";

class TaskList extends Widget {
  // Data:
  list: Component[];
  addButtonWrapper: Div;
  addButton: Button;

  // Constructor:
  constructor(props:any=null) {
    super();
    this.list = new Array<Component>();

    //this.vertical();
    this.setBackgroundColor("lightblue");
    this.Border();
    this.Padding("50px");
    this.Width("100%");

    this.addButtonWrapper = new Div(null);
    this.addButtonWrapper.appendTo(this);
    this.addButtonWrapper.alignCenter();
    this.addButtonWrapper.Width("100%");

    this.addButton = new Button("+");

    this.addButton.onClick(() => {
      //log("addButton clicked");
      if (props != null) {
        if (props.add != null) {
          props.add.send("add");
        }
      }
    });

    this.addButton.appendTo(this.addButtonWrapper);
    this.addButtonWrapper.Width("100%");
    this.addButton.Padding("5px");
  }
}

export { TaskList };
