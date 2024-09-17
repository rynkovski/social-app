import Image from "next/image";
import ExcavatorImage from "../../public/excavator.gif";

function UnderConstruction({ name }: { name: string }) {
  return (
    <div className="mx-auto grid flex-1 auto-rows-max gap-4">
      <div className="flex flex-col items-center gap-8 pt-12">
        <div className="text-center">
          <h1 className="text-4xl text-muted-foreground">Coming soon...</h1>
          <p className="text-muted-foreground">
            {name} Page is under construction
          </p>
        </div>
        <Image
          className="rounded-lg w-auto h-auto"
          src={ExcavatorImage}
          alt="Under construction"
          width={400}
          height={600}
          unoptimized
          priority
        />
      </div>
    </div>
  );
}

export default UnderConstruction;
