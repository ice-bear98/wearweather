import PageTitle from '../components/common/PageTitle';
import FooterNavi from '../components/common/FooterNavi';
import PostList from '../components/post/PostList';

export default function Post() {
  return (
    <div className="flex flex-col">
      <PageTitle title="코디" />
      <div className="px-5">
        <div className="text-center my-4 text-lg font-bold">날씨</div>
        <div className="text-center mb-4 text-lg font-bold">필터</div>
      </div>
      <PostList />
      <FooterNavi />
    </div>
  );
}
