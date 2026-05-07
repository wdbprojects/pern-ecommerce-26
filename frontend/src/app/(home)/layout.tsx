import PublicLayout from "@/modules/layouts/public-layout";
import { LayoutPropsMain } from "@/config/types";

const HomeLayoutMain = ({ children }: LayoutPropsMain) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default HomeLayoutMain;
