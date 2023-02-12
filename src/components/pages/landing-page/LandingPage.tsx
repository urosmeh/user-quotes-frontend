import { useState, useEffect } from "react";
import { Quote } from "../../../interfaces/Quote";
import { QuoteCard } from "../../ui/QuoteCard";
import classes from "./LandingPage.module.css";
import { LandingPageHeader } from "./LandingPageHeader";
import { useSelector } from "react-redux";
import { RootState, useGetQuotesQuery } from "../../../store";
import { StaticQuoteCard } from "../../ui/StaticQuoteCard";
import { Link } from "react-router-dom";
import { Button } from "../../ui/Button";
import avatar1 from "../../../assets/img/avatar.png";
import avatar2 from "../../../assets/img/avatar2.png";

export const LandingPage: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetQuotesQuery();
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const { token, userId } = useSelector((state: RootState) => state.authToken);

  useEffect(() => {
    if (!randomQuote && data && isSuccess) {
      setRandomQuote(data[Math.floor(Math.random() * data.length)]);
    }
  }, [data, isSuccess, randomQuote]);

  return (
    <div>
      {token && (
        <div>
          <LandingPageHeader
            title="Quote of the day"
            subtitle="Quote of the day is randomly chosen quote"
          />
          {isLoading && <h4>Loading</h4>}
          {randomQuote && (
            <div key={randomQuote.id} className={classes.quotes}>
              <QuoteCard
                id={randomQuote.id}
                quote={randomQuote.quote}
                user={randomQuote.user}
                upvotes={randomQuote.upvotes}
                downvotes={randomQuote.downvotes}
                isUpvoted={
                  randomQuote.votes?.findIndex(
                    (vote) =>
                      vote.userId.toString() === userId && vote.type === 0
                  ) === -1
                    ? false
                    : true
                }
                isDownvoted={
                  randomQuote.votes?.findIndex(
                    (vote) =>
                      vote.userId.toString() === userId && vote.type === 1
                  ) === -1
                    ? false
                    : true
                }
              />
            </div>
          )}
        </div>
      )}
      {!token && (
        <>
          <div className={classes["welcome-section"]}>
            <div className={classes["welcome-text"]}>
              <h1>
                Welcome to <span className="orange">Quotastic</span>
              </h1>
              <p>
                Quotastic is free online platform for you to explore the quips,
                quotes, and proverbs. Sign up and express yourself.
              </p>
              <Link style={{ textDecoration: "none" }} to="/signup">
                <Button
                  title="Sign up"
                  type="primary"
                  onClickHandler={() => console.log("1test")}
                />
              </Link>
            </div>
            {
              <div className={classes["cards-section"]}>
                {/* StaticQuoteCard */}
                <StaticQuoteCard
                  downvotes={10}
                  upvotes={154}
                  isUpvoted={true}
                  isDownvoted={false}
                  quote={
                    "All our dreams can come true, if we have the courage to pursue them."
                  }
                  username={"Static user"}
                  isBlurred={true}
                  position="top"
                  img={"https://cdn-icons-png.flaticon.com/512/219/219986.png"}
                />
                <StaticQuoteCard
                  downvotes={0}
                  upvotes={154}
                  isUpvoted={true}
                  isDownvoted={false}
                  quote={
                    "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover."
                  }
                  username={"Marvin McKinney"}
                  isBlurred={false}
                  position="center"
                  img={avatar1}
                />
                <StaticQuoteCard
                  downvotes={10}
                  upvotes={100}
                  isUpvoted={true}
                  isDownvoted={false}
                  quote={
                    "What lies behind us and what lies before us are tiny matters compared to what lies within us."
                  }
                  username={"Eleanor Pena"}
                  isBlurred={true}
                  position="bottom"
                  img={avatar2}
                />
              </div>
            }
          </div>
          <div className={classes.explore}>
            <h2>
              Explore the world of
              <span className="orange">&nbsp;fantastic quotes</span>
            </h2>
          </div>
        </>
      )}
      <LandingPageHeader
        title="Most upvoted quotes"
        subtitle="Most upvoted quotes on the platform. Give a like to the ones you like to
        keep them saved in your profile."
        paddingTop={true}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {data &&
          data
            .filter((quote: Quote) => {
              return quote.id !== randomQuote?.id;
            })
            .map((quote: Quote) => {
              return (
                <QuoteCard
                  id={quote.id}
                  quote={quote.quote}
                  user={quote.user}
                  upvotes={quote.upvotes}
                  downvotes={quote.downvotes}
                  isUpvoted={
                    quote.votes?.findIndex(
                      (vote) =>
                        vote.userId.toString() === userId && vote.type === 1
                    ) === -1
                      ? false
                      : true
                  }
                  isDownvoted={
                    quote.votes?.findIndex(
                      (vote) =>
                        vote.userId.toString() === userId && vote.type === 0
                    ) === -1
                      ? false
                      : true
                  }
                  key={quote.id}
                />
              );
            })}
      </div>
      <div className={classes.signup}>
        <Link
          style={{
            textDecoration: "none",
            display: "block",
            textAlign: "center",
          }}
          to="/signup"
        >
          <Button
            title="Sign up to see more"
            type="alternative"
            onClickHandler={() => console.log("1test")}
          />
        </Link>
      </div>
    </div>
  );
};
