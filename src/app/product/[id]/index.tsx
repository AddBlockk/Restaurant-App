import { GetServerSideProps } from "next";
import SingleProductPage from "@/app/product/[id]/index"; // Путь к компоненту SingleProductPage
import { pizzas, Product } from "@/data"; // Импорт данных о пиццах

type ProductPageProps = {
  product: Product;
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return <SingleProductPage product={product} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const product = pizzas.find((item) => item.id === Number(id)) || pizzas[0];

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
