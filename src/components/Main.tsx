import Chat from './Chat';
import Sidebar from './Sidebar';

export default function Main() {
  return (
    <div className="flex">
      <Sidebar />
      <Chat />
    </div>
  );
}
