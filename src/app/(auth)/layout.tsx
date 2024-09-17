import ChatbotIcon from "@/components/chat/chatbot-icon";
import MessagesIcon from "@/components/messages-icon";
import Header from "@/components/navigation/header";
import Sidebar, { MobileNav } from "@/components/navigation/sidebar";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-lvh justify-between w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 py-14">
        <Header />
        {children}
        <ChatbotIcon />
        <MessagesIcon />
      </div>
      <MobileNav />
    </div>
  );
}

export default Layout;
