import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between ">
      <Link href="/" className="font-bold text-base md:text-xl uppercase">
        Boltach
      </Link>
      <p className="text-sm md:text-base cursor-default">
        © ВСЕ ПРАВА ЗАЩИЩЕНЫ
      </p>
    </div>
  );
};

export default Footer;
