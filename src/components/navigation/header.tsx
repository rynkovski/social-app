import RedeemCoinsButton from "../buttons/redeem-coins-button";
import UserDropdown from "../user/user-dropdown";
import UserInfo from "../user/user-info";

function Header() {
  return (
    <header className="fixed isolate w-full top-0 z-50 flex h-14 items-center justify-between  gap-4 border-b bg-background px-4 sm:static sm:h-14 sm:border-0 sm:bg-transparent sm:px-6">
      <RedeemCoinsButton />
      <div className="flex justify-center items-center gap-2">
        <UserInfo className="flex justify-center items-center gap-2" />
        <span className="hidden sm:block">
          <UserDropdown />
        </span>
      </div>
    </header>
  );
}

export default Header;
