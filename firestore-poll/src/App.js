import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import PollForm from "./PollForm";
import PollResults from "./PollResults";

function App() {
  useEffect(() => {
    // Only runs once when the app loads
    async function addTestDocument() {
      try {
        await addDoc(collection(db, "pollResponses"), {
          text: "Toaster",
          upvotes: 0,
        });
        console.log("Test document added!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    addTestDocument();
  }, []);

  return (
    <div>
      <h1>If you were a kitchen appliance, what would you be?</h1>
      <PollForm />
      <PollResults />
    </div>
  );
}

export default App;