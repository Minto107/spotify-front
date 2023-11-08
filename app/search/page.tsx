import getSongsByTitle from "@/actions/springboot/getSongsByTitle";
import { Header } from "@/components/Header";
import SearchInput from "@/components/search/SearchInput";
import SearchContent from "./components/SearchContent";
import { useSongsByTitle } from "@/hooks/springboot/useSongsByTitle";

const revalidate = 0;

interface props {
  searchParams: {
    title: string;
  }
}

const Search = ({ searchParams }: props) => {
  const { songs, loading } = useSongsByTitle(searchParams.title);

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs!}/>
    </div>
  )
}

export default Search;