import Header from "../components/Header";
import FiltersCard from "../components/FiltersCard";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import PostCardUtc2 from "../components/PostCardUtc2";
import { handleGetNotificationPost } from "../redux/postUtc2/postUtc2Action";
import CustomPagination from "../components/CustomCustomPagination";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import SearchNotificationUtc2 from "../components/utc2/SearchNotificationUtc2";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const postUtc2 = useSelector((state) => state.postUtc2);
  const [currentPage, setCurrentPage] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const [keywordSearch, setKeywordSearch] = useState("");

  useEffect(() => {
    dispatch(handleGetNotificationPost());
  }, [location.pathname]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    dispatch(handleGetNotificationPost(selectedPage.selected + 1));
  };

  const handleSearch = async (event) => {
    if (event?.key === "Enter" || !event?.key) {
      if (keywordSearch) {
        navigate(`/thong-bao/search?query=${keywordSearch}`);
      }
    }
  };

  return (
    <>
      <div className="w-full px-0 pb-20 bg-gray-100 lg:rounded-lg h-screen overflow-hidden">
        <Header />
        <div className="w-screen mt-24 flex justify-center gap-2 lg:gap-4 pt-3 h-full">
          <div className="hidden w-1/6 h-full md:flex flex-col gap-6 overflow-y-auto bg-white">
            <Sidebar />
            <FiltersCard />
          </div>

          {/* CENTER */}
          <div className="w-1/2 h-full flex flex-col gap-2 overflow-y-auto rounded-lg bg-white">
            <div className="flex  mt-3 mx-3 pb-4 border-b justify-between">
              <div className=" mt-2 bg-white z-10 rounded-md flex">
                <div className="block px-4 py-2 text-gray-800 leading-8 text-2xl font-bold">
                  Thông báo
                </div>
              </div>

              <div className="flex items-center">
                <TextInput
                  name="searchnotification"
                  styles="mb-1 rounded-md border border-gray-200  text-gray-600 focus:shadow-md transition duration-300 ease-in"
                  placeholder="Tìm kiếm thông báo..."
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(currentPage);
                    }
                  }}
                />
                <CustomButton
                  id="btn_searchnotification"
                  title={<i className="fa-solid fa-magnifying-glass"></i>}
                  containerStyles={`bg-[#0444a4] text-white text-xl mt-1 py-3 px-4 rounded-md font-semibold text-sm`}
                  onClick={() => {
                    handleSearch(currentPage);
                  }}
                />
              </div>
            </div>
            {location.pathname === "/thong-bao/search" ? (
              <>
                <SearchNotificationUtc2 />
              </>
            ) : (
              <>
                {postUtc2.isLoading ? (
                  <Loading />
                ) : postUtc2?.rows?.length > 0 ? (
                  <>
                    {postUtc2?.rows?.map((item) => (
                      <PostCardUtc2
                        key={item?._id}
                        post={item}
                        link="student/post"
                      />
                    ))}
                    <div className="flex justify-center mb-10">
                      <CustomPagination
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(postUtc2?.count / 10)}
                        previousLabel="<"
                        currentPage={currentPage}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex w-full h-full items-center justify-center">
                    <p className="text-lg text-ascent-2">
                      Không tìm thấy thông báo nào
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
