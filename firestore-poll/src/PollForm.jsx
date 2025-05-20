import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function PollForm() {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "pollResponses"), {
      text: input.trim(),
      upvotes: 0
    });

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Response"
        style={{ padding: "0.5rem", width: "60%" }}
      />
      <button type="submit" style={{ padding: "0.5rem" }}>
        Submit
      </button>
    </form>
  );
}

export default PollForm;
