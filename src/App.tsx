import React, { useState } from "react";
import BooksSearch from "./Components/BookSearch";
import ReadingList from "./Components/ReadingList";
import "./App.css";

const App: React.FC = () => {
  const [update, setUpdate] = useState(false);

  const callBackFn = () => {
    setUpdate(!update);
  };

  return (
    <div className='main'>
      <BooksSearch callBackFn={callBackFn} />
      <ReadingList update={update} />
    </div>
  );
};

export default App;
