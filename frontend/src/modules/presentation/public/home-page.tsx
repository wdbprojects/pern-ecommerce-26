import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1>Welcome love and abundance</h1>
      <Button>Testing ShadCN</Button>
      <Button variant="outline" size="sm">
        <Link href={routes.about}>About Us</Link>
      </Button>
      <Button variant="outline" size="sm">
        <Link href={routes.dashboard}>Dashboard</Link>
      </Button>
    </div>
  );
};

export default HomePage;
