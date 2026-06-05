import { LayoutPropsMain } from "@/config/types";
import HeaderMain from "@/modules/components/layout/header-main";
import FooterMain from "../components/layout/footer-main";

const PublicLayout = ({ children }: LayoutPropsMain) => {
  return (
    <div>
      <HeaderMain />
      <main className="container mx-auto pt-12">{children}</main>
      <FooterMain />
    </div>
  );
};

export default PublicLayout;
