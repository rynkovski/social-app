import Image from "next/image";

function Logo() {
  return <Image src={"/logo.svg"} alt="logo" width={30} height={30} />;
}

export default Logo;
