import Chat from "./Chat";
import Sidebar from "./Sidebar";

export default function Main() {
  return (
    <div className="grid grid-cols-[1fr_3fr] h-screen w-screen">
      <Sidebar />
      <Chat />
    </div>
  );
}
