import { FaShoppingCart } from "react-icons/fa";

export default function Icon({ name }) {
  if (name === "cart") return <FaShoppingCart />;
  return null;
}
