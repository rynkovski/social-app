import { ChatLayout } from "@/components/chat/chat-layout";

function Index() {
  return (
    <main className="flex justify-center items-center m-2 ">
      <div className=" border rounded-lg max-w-2xl w-full text-sm lg:flex ">
        <ChatLayout navCollapsedSize={8} />
      </div>
    </main>
  );
}

export default Index;
