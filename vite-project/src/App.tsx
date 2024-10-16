import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getFutureTodos,
  getPastTodos,
  getPresentTodos,
  updateTodo,
  updateTodoToFuture,
  updateTodoToPast,
  updateTodoToPresent,
} from "./services/apiTodos";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Form from "./components/AddItemForm";
import { FaFeather } from "react-icons/fa6";
import {
  GetItem,
  CreateItem,
  LoginCredentials,
  SignUpCredentials,
} from "./types";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { userSignUp } from "./services/apiUsers";
import Main from "./layouts/Main";
import DeleteModal from "./components/DeleteModal";

function App() {
  const [selectedNavLink, setSelectedNavLink] = useState("present");
  const [pastData, setPastData] = useState<GetItem[]>([]);
  const [mainData, setMainData] = useState<GetItem[]>([]);
  const [futureData, setFutureData] = useState<GetItem[]>([]);
  const [formIsShown, setFormIsShown] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<GetItem | null>(null);
  const [signUpIsShown, setSignUpIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [deleteIsShown, setDeleteIsShown] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const pastData = await getPastTodos();
    const mainData = await getPresentTodos();
    const futureData = await getFutureTodos();
    setPastData(pastData);
    setMainData(mainData);
    setFutureData(futureData);
  }

  function handleLogin(loginCredentials: LoginCredentials) {
    console.log(loginCredentials);
  }

  async function handleSignUp(signUpCredentials: SignUpCredentials) {
    await userSignUp(signUpCredentials);
    console.log(signUpCredentials);

    setSignUpIsShown(false);
  }

  async function handleAddTodo(newTodo: CreateItem) {
    if (todoToEdit) {
      const updatedTodo = await updateTodo(todoToEdit.id, newTodo);
      setPastData((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setMainData((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setFutureData((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setTodoToEdit(null);
    } else {
      const createdTodo = await createTodo(newTodo);
      setMainData((prevData) => [...prevData, createdTodo[0]]);
    }
    setFormIsShown(false);
  }

  function handleDeleteTodo(id: number) {
    setTodoToDelete(id);
    setDeleteIsShown(true);
  }

  async function confirmDelete() {
    try {
      if (todoToDelete !== null) {
        await deleteTodo(todoToDelete);
      }

      setPastData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setMainData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setFutureData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setDeleteIsShown(false);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  function handleEditTodo(todo: GetItem) {
    setTodoToEdit(todo);
    setFormIsShown(true);
  }

  async function handleToPast(id: number) {
    try {
      await updateTodoToPast(id);

      const updatedTodo =
        mainData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setPastData((prevData) => [...prevData, updatedTodo]);
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToPresent(id: number) {
    try {
      await updateTodoToPresent(id);

      const updatedTodo =
        pastData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => [...prevData, updatedTodo]);
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToFuture(id: number) {
    try {
      await updateTodoToFuture(id);

      const updatedTodo =
        pastData.find((todo) => todo.id === id) ||
        mainData.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => [...prevData, updatedTodo]);
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  return (
    <div className="relative min-h-screen no-sx">
      <Navbar
        selectedNavLink={selectedNavLink}
        setSelectedNavLink={setSelectedNavLink}
      >
        <button
          onClick={() => setSignUpIsShown(true)}
          className="hidden bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full"
        >
          Sign Up
        </button>
        <button
          onClick={() => setLoginIsShown(true)}
          className="hidden bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full mx-5"
        >
          Login
        </button>
      </Navbar>
      <div className="mx-auto max-w-[1366px] px-4">
        <Main>
          {selectedNavLink === "past" && (
            <List
              key={0}
              title={"Daily Habit"}
              onClick={() => setSelectedNavLink("past")}
              data={pastData}
              bgColor="bg-emerald-300"
              selectedBgColor="bg-emerald-200"
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
              onPastClick={handleToPast}
              onPresentClick={handleToPresent}
              onFutureClick={handleToFuture}
            />
          )}

          {selectedNavLink === "present" && (
            <>
              <List
                key={1}
                title={"Today"}
                onClick={() => setSelectedNavLink("present")}
                data={mainData}
                bgColor="bg-sky-300"
                selectedBgColor="bg-sky-200"
                onDeleteTodo={handleDeleteTodo}
                onEditTodo={handleEditTodo}
                onPastClick={handleToPast}
                onPresentClick={handleToPresent}
                onFutureClick={handleToFuture}
              />
            </>
          )}

          {selectedNavLink === "future" && (
            <List
              key={2}
              title={"Todo List"}
              onClick={() => setSelectedNavLink("future")}
              data={futureData}
              bgColor="bg-orange-300"
              selectedBgColor="bg-orange-200"
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
              onPastClick={handleToPast}
              onPresentClick={handleToPresent}
              onFutureClick={handleToFuture}
            />
          )}
        </Main>
        <div
          onClick={() => {
            setFormIsShown(true);
            setTodoToEdit(null);
          }}
          className="fixed cursor-pointer animate-bounce bg-teal-500 p-5 rounded-full right-5 bottom-12 shadow-zinc-600 shadow-lg"
        >
          <FaFeather className="text-4xl" />
        </div>
      </div>

      {formIsShown && (
        <Form
          onClose={() => setFormIsShown(false)}
          onSubmit={handleAddTodo}
          initialData={todoToEdit}
        />
      )}
      {deleteIsShown && (
        <DeleteModal
          onClose={() => setDeleteIsShown(false)}
          onDelete={confirmDelete}
        />
      )}
      {loginIsShown && (
        <Login onClose={() => setLoginIsShown(false)} onSubmit={handleLogin} />
      )}
      {signUpIsShown && (
        <SignUp
          onClose={() => setSignUpIsShown(false)}
          onSubmit={handleSignUp}
        />
      )}
    </div>
  );
}

export default App;
