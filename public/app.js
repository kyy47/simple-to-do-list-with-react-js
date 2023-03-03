const root = document.querySelector("#root");
function App() {
  let [activity, setActivity] = React.useState("");
  let [listTodo, setListToDo] = React.useState([]);
  let [editMode, setEditMode] = React.useState(false);
  let [toDoEdit, setTodoEdit] = React.useState({});
  const activityRef = React.useRef('');
  React.useEffect(() => {
    if (activity) {
      setListToDo([...listTodo, activity]);
      setActivity("");
    }
  }, [activity]);
  const addKey = () => {
    return Date.now();
  };
  const deleteToDo = toDoDelete => {
    const newListTodo = listTodo.filter(toDo => {
      return toDo.id !== toDoDelete.id;
    });
    setListToDo(newListTodo);
  };
  const saveActivity = event => {
    event.preventDefault();
    if (!editMode) {
      !activityRef.current.value ? alert("masukin atuhhh") : setActivity({
        id: addKey(),
        activity: activityRef.current.value
      });
    } else {
      toDoEdit.activity = activityRef.current.value;
      newListTodo = listTodo.map(toDo => toDo.activity !== toDoEdit.activity ? toDo : toDoEdit);
      setEditMode(false);
      setListToDo(newListTodo);
    }
    activityRef.current.value = "";
  };
  const editTodo = toDo => {
    activityRef.current.value = toDo.activity;
    setTodoEdit(toDo);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Belajar To Do List"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    onSubmit: saveActivity,
    className: "row"
  }, /*#__PURE__*/React.createElement("input", {
    name: "activity",
    placeholder: "create an activity",
    ref: activityRef
  }), /*#__PURE__*/React.createElement("button", null, editMode ? "Ubah" : "Tambah"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("ul", null, listTodo.map(toDo => {
    return /*#__PURE__*/React.createElement("li", {
      key: toDo.id
    }, /*#__PURE__*/React.createElement("p", null, toDo.activity), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setEditMode(true);
        editTodo(toDo);
      }
    }, "Edit"), /*#__PURE__*/React.createElement("button", {
      onClick: deleteToDo.bind(this, toDo)
    }, "Hapus"));
  }))));
}
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);