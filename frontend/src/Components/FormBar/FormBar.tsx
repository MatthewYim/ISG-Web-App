import React, { useState } from "react";

interface Props {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
}

const FormBar = (props: Props) => {
  const [state, setState] = useState<Props>({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "row", gap: "10px" }}
    >
      <div>
        <label htmlFor="input1">Input 1:</label>
        <input
          id="input1"
          name="input1"
          value={state.input1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="input2">Input 2:</label>
        <input
          id="input2"
          name="input2"
          value={state.input2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="input3">Input 3:</label>
        <input
          id="input3"
          name="input3"
          value={state.input3}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="input4">Input 4:</label>
        <input
          id="input4"
          name="input4"
          value={state.input4}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormBar;
