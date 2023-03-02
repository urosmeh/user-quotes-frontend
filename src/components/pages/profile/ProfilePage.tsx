import { useParams } from "react-router-dom";
import { Quote } from "../../../interfaces/Quote";
import {
  useGetUserByIdQuery,
  useGetUserLikedByIdQuery,
  useGetUserQuotesByIdQuery,
} from "../../../store";
import { QuoteCard } from "../../ui/QuoteCard";
import pAvatar from "../../../assets/img/uploadAvatar.png";
import { useState } from "react";
import { Button } from "../../ui/Button";

type ProfilePageParams = {
  userId: string;
};

export const ProfilePage = () => {
  let { userId } = useParams<ProfilePageParams>();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery({
    id: userId,
  });

  const [likedPage, setLikedPage] = useState(1);
  const [quotesPage, setQuotesPage] = useState(1);

  const {
    data: liked,
    isLoading: isLikedListLoading,
    refetch: refetchLiked,
  } = useGetUserLikedByIdQuery({ id: userId, page: likedPage });

  const {
    data: userQuotes,
    isLoading: isUserQuotesLoading,
    refetch: refetchUserQuotes,
  } = useGetUserQuotesByIdQuery({ id: userId, page: quotesPage });

  const onLoadMoreLiked = () => {
    setLikedPage(likedPage + 1);
    refetchLiked();
  };

  const onLoadMoreQuotes = () => {
    setQuotesPage(quotesPage + 1);
    refetchUserQuotes();
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "70px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src={
            userData?.avatar
              ? `http://localhost:3000/users/avatar/${userData.avatar}`
              : pAvatar
          }
          alt="user"
        ></img>

        {userData?.username}
        <p>Quotes: 100</p>
        <p>Karma: 100</p>
      </div>
      {isUserLoading && <div>Loading user data</div>}
      {isUserError && <div>Error loading user</div>}
      {isLikedListLoading && <div>Loading liked list</div>}
      {liked && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            marginTop: "20px",
          }}
        >
          {userData?.likes && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ margin: 0 }} className="orange">
                Most liked quotes
              </p>
              {userData?.likes?.map((q: Quote) => (
                <QuoteCard
                  id={q.id}
                  quote={q.quote}
                  user={q.user}
                  upvotes={q.upvotes}
                  downvotes={q.downvotes}
                  isUpvoted={
                    q.votes?.findIndex(
                      (vote) =>
                        vote.userId.toString() === userId && vote.type === 0
                    ) === -1
                      ? false
                      : true
                  }
                  isDownvoted={
                    q.votes?.findIndex(
                      (vote) =>
                        vote.userId.toString() === userId && vote.type === 1
                    ) === -1
                      ? false
                      : true
                  }
                />
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ margin: 0 }}>User likes</p>
            {liked?.data.map((q: Quote) => (
              <QuoteCard
                id={q.id}
                quote={q.quote}
                user={q.user}
                upvotes={q.upvotes}
                downvotes={q.downvotes}
                isUpvoted={
                  q.votes?.findIndex(
                    (vote) =>
                      vote.userId.toString() === userId && vote.type === 0
                  ) === -1
                    ? false
                    : true
                }
                isDownvoted={
                  q.votes?.findIndex(
                    (vote) =>
                      vote.userId.toString() === userId && vote.type === 1
                  ) === -1
                    ? false
                    : true
                }
              />
            ))}
            {likedPage < liked.lastPage && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  type="alternative"
                  title="Load more"
                  onClickHandler={onLoadMoreLiked}
                />
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ margin: 0 }}>Most recent</p>
            {userQuotes &&
              userQuotes.data.map((q: Quote) => (
                <QuoteCard
                  id={q.id}
                  quote={q.quote}
                  user={q.user}
                  upvotes={q.upvotes}
                  downvotes={q.downvotes}
                  isUpvoted={
                    q.votes?.findIndex(
                      (vote) =>
                        vote.userId.toString() === userId && vote.type === 0
                    ) === -1
                      ? false
                      : true
                  }
                  isDownvoted={
                    q.votes?.findIndex(
                      (vote) =>
                        vote.userId.toString() === userId && vote.type === 1
                    ) === -1
                      ? false
                      : true
                  }
                />
              ))}
            {userQuotes && quotesPage < userQuotes?.lastPage && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  type="alternative"
                  title="Load more"
                  onClickHandler={onLoadMoreQuotes}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
