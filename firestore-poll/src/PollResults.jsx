import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

function PollResults() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "pollResponses"), orderBy("upvotes", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setResponses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const upvote = async (id) => {
    const ref = doc(db, "pollResponses", id);
    await updateDoc(ref, { upvotes: increment(1) });
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {responses.map(({ id, text, upvotes }) => (
        <li key={id} style={{ marginBottom: "0.75rem" }}>
          <strong>{text}</strong> — {upvotes} votes
          <button
            onClick={() => upvote(id)}
            style={{ marginLeft: "1rem", padding: "0.25rem 0.5rem" }}
          >
            👍 Upvote
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PollResults;
