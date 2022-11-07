export default function Home() {
  return (
    <div>
      <h1>Event Notifications with QStash</h1>
      <button
        onClick={() => {
          // do something!
          fetch(`/api/trigger`, {
            method: "POST",
            body: JSON.stringify({ text: "New Sign Up 🥳" }),
          });
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
