const root = document.querySelector("#root");


function App() {
    let [activity, setActivity] = React.useState("");
    let [listTodo, setListToDo] = React.useState([]);
    let [editMode, setEditMode] = React.useState(false);
    let [toDoEdit, setTodoEdit] = React.useState({});
    const activityRef = React.useRef('');
    
    React.useEffect(() => {
        if(activity){
            setListToDo([...listTodo, activity]);
            setActivity("");
        }
    },[activity])

    const addKey = () =>{
        return Date.now();
    }
    const deleteToDo = (toDoDelete) =>{
        const newListTodo = listTodo.filter((toDo) =>{
            return toDo.id !== toDoDelete.id;
        })
        setListToDo(newListTodo);
    }

    const saveActivity = (event) => {
        event.preventDefault();
        if(!editMode){
            !activityRef.current.value ? alert("masukin atuhhh") : 
            setActivity({
                id : addKey(),
                activity : activityRef.current.value,
            });
        }else{
            toDoEdit.activity = activityRef.current.value;
            newListTodo =  listTodo.map(toDo => toDo.activity !== toDoEdit.activity ?  toDo :  toDoEdit
                );
                setEditMode(false)
                setListToDo(newListTodo);
            }
            activityRef.current.value = "";
        
        
    }
    
    const editTodo = (toDo) => {
        activityRef.current.value = toDo.activity;
        setTodoEdit(toDo);
    }
    
    return (
        <div>
            <h1 >Belajar To Do List</h1>
            <div>
                <form onSubmit={saveActivity} className="row">
                    <input name="activity" placeholder="create an activity" 
                        ref={activityRef} />
                    <button>{editMode ? "Ubah" : "Tambah"}</button>
                </form>

            </div>
            <div className="container">
                <ul>
                    { 
                    listTodo.map(toDo => {
                        return <li key={toDo.id}>
                            <p>{toDo.activity}</p>
                            <button onClick={(() => {
                                setEditMode(true)
                                editTodo(toDo);
                                })}>Edit</button>
                            <button onClick={deleteToDo.bind(this, toDo)}>Hapus</button>
                        </li>
                    })}
                
                </ul>
            </div>
        </div>
    )
}
ReactDOM.render(<App />, root)
