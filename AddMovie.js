import {  useMemo, useRef } from "react";

function AddMovie(props) {
  const titleRef = useRef();
  const textRef = useRef();
  const dateRef = useRef();
  const submitHandler = () => {
    const movie={
        title:titleRef.current.value,
        releaseDate:textRef.current.value,
        openingText:dateRef.current.value
    }
    props.onAddMovie(movie);
  };
  return (
    <form onSubmit={submitHandler}>
      <label>Title</label>
      <input type="text" ref={titleRef}></input>
      <label>opening text</label>
      <input type="text" ref={textRef}></input>
      <label>release date</label>
      <input type="text" ref={dateRef}></input>
      <button type="submit">Add movie</button>
    </form>
  );
}

export default AddMovie;
