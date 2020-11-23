// Axino lib importa:
import { Div } from "axino/div";
import { colors } from "axino/constants";
// Local (custom) widgets imports:
import { TaskList } from "./tasklist";
import { TaskAction } from "./task_action";
import { Channel } from "axino/channel";
import { log } from "axino/core";
import { Vector } from "axino/vector";


function logState() {
  log({ all_tasks: all_tasks });
  log({ todo_tasks: todo_tasks });
  log({ checkded_tasks: checked_tasks });
}

//===================
// State            :
//===================
let all_tasks = new Vector<TaskAction>();
let checked_tasks = new Vector<TaskAction>();
let todo_tasks = new Vector<TaskAction>();

//=====================
// To-do-Div: main Div:
//=====================
var todoDiv = new Div(null);
todoDiv.appendToApp();
todoDiv.Width("100%");
todoDiv.setBackgroundColor(colors.lightcyan);
todoDiv.Padding("30px");
todoDiv.appendToApp();


//=================================================
// Channels for transmitting events between widgets:
//==================================================
const channel_checked = new Channel("check");
const channel_delete = new Channel("delete");
const channel_add = new Channel("add");

//==================================
// Adding TaskListWidget to todoDiv:
//==================================
let taskListWidget = new TaskList({add: channel_add});
taskListWidget.appendTo(todoDiv);

//========================
// Populate list_of_tasks:
//========================
all_tasks.append(
  new TaskAction("Task 1", false, {
    add: channel_add,
    delete: channel_delete,
    check: channel_checked,
  })
);
all_tasks.append(
  new TaskAction("Task 2", true, {
    add: channel_add,
    delete: channel_delete,
    check: channel_checked,
  })
);

logState();

//==============================
// Display initial list_of_tasks:
//==============================
all_tasks.forEach((tsk) => {
  if (tsk.checked) {
    checked_tasks.append(tsk);
  } else {
    todo_tasks.append(tsk);
  }
});
taskListWidget.appendChildren(all_tasks.toArray());


//=========================================================
// Listen to the events triggered by the TakAction Widgets:
//=========================================================

// Check:
channel_checked.listen((message) => {
  //log(message.detail);
  logState();
  // Toggle task check status:
  message.detail.value.checked = !message.detail.value.checked;
  // Refresh task for new check status:
  message.detail.value.refresh();
  // Move current task around depending on status:
  if (message.detail.value.checked) {
    checked_tasks.append(message.detail.value);
    todo_tasks.delete(message.detail.value);
  } else {
    todo_tasks.append(message.detail.value);
    checked_tasks.delete(message.detail.value);
  }
  all_tasks = todo_tasks.concat(checked_tasks);

  // Refresh TaskList display:
  taskListWidget.deleteChildren(all_tasks.toArray());
  taskListWidget.appendChildren(all_tasks.toArray());
  logState();
});

// Delete:
channel_delete.listen((message) => {
  log(message.detail);
  all_tasks.delete(message.detail.value);
  if (message.detail.value.checked) {
    checked_tasks.delete(message.detail.value);
  } else {
    todo_tasks.delete(message.detail.value);    
  }
  taskListWidget.deleteChild(message.detail.value);
  logState();
});

// Add:
channel_add.listen( (message) => {
  taskListWidget.deleteChildren(all_tasks.toArray());
  log(message.detail.value);
  let temp:TaskAction = new TaskAction("", false, {
    add: channel_add,
    delete: channel_delete,
    check: channel_checked,
  })
  todo_tasks.append(temp);
  all_tasks = todo_tasks.concat(checked_tasks); 
  taskListWidget.appendChildren(all_tasks.toArray());
  logState();
});
