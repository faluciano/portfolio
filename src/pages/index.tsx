import { type NextPage } from "next";
import HeadNav from "../../components/headnav";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    <>
      <HeadNav/>
    </>
  );
};

export default Home;
