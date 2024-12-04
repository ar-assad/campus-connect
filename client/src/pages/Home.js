import { Row, Col, Form, Container } from "react-bootstrap";
import TopicItem from "../components/Topic/TopicItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllTopics, setSortOption } from "../redux/slices/topicSlice";
import { resetUserProfile, getUserComments } from "../redux/slices/profileSlice";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import SkeletonTopicItem from "../components/Skeletons/SkeletonTopicItem";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsClockFill } from "react-icons/bs";
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const space = searchParams.get("space");
  const filter = searchParams.get("filter");
  const { topics, getAllTopicsIsLoading } = useSelector((state) => state.topic);
  const { userComments, commentsIsLoading } = useSelector((state) => state.profile);
  const { sortOption, searchQuery } = useSelector((state) => state.topic);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = space 
      ? `${space} Topics | Campus Connect`
      : filter === "my-topics"
      ? "My Topics | Campus Connect"
      : filter === "my-answers"
      ? "My Answers | Campus Connect"
      : `Home | Campus Connect`;
  }, [space, filter]);

  useEffect(() => {
    dispatch(resetUserProfile());
    if (filter === "my-answers" && user?.username) {
      dispatch(getUserComments(user.username));
    } else {
      dispatch(getAllTopics({ sortOption, searchQuery, space }));
    }
  }, [dispatch, sortOption, searchQuery, space, filter, user]);

  const filteredContent = useMemo(() => {
    if (filter === "my-topics") {
      return topics.filter(topic => topic.author.username === user?.username);
    }
    if (filter === "my-answers") {
      return userComments || [];
    }
    return topics;
  }, [topics, userComments, filter, user]);

  return (
    <>
      <main>
        <Container>
          <Row>
            <LeftSidebar />
            <Col lg={6} className="main-content">
              <div className="filter">
                {space && (
                  <h4 className="space-title mb-4">
                    {space}
                  </h4>
                )}
                {filter === "my-topics" && (
                  <h4 className="space-title mb-4">
                    My Topics
                  </h4>
                )}
                {filter === "my-answers" && (
                  <h4 className="space-title mb-4">
                    My Answers
                  </h4>
                )}
                {filter !== "my-answers" && (
                  <Form.Select
                    name="topicsSort"
                    className="custom-select"
                    onChange={(e) => dispatch(setSortOption(e.target.value))}
                  >
                    <option value="latest">Latest topics</option>
                    <option value="popular">Most popular topics</option>
                    <option value="most_replied">Most replied topics</option>
                    <option value="most_upvoted">Most upvoted topics</option>
                  </Form.Select>
                )}
              </div>
              <div className="topics">
                {(getAllTopicsIsLoading || commentsIsLoading) && (
                  <>
                    <SkeletonTopicItem />
                    <SkeletonTopicItem />
                  </>
                )}
                {!getAllTopicsIsLoading && !commentsIsLoading && filter !== "my-answers" &&
                  filteredContent?.map((topic, idx) => (
                    <TopicItem key={idx} topic={topic} />
                  ))}
                {!getAllTopicsIsLoading && !commentsIsLoading && filter === "my-answers" &&
                  filteredContent?.map((comment, idx) => (
                    <div key={idx} className="tab-ui mb-4">
                      <div className="comment-brief">
                        <div className="comment-meta d-flex align-items-center">
                          <h5 className="user-name">
                            {comment.author.firstName} {comment.author.lastName}
                            &nbsp;
                          </h5>
                          commented on&nbsp;
                          <Link
                            to={`/topics/${comment.parentTopic.TopicID}/${comment.parentTopic.slug}`}
                          >
                            <span className="topic-title">
                              {comment.parentTopic.title}
                            </span>
                          </Link>
                        </div>
                        <span className="comment-date d-flex align-items-center">
                          <div className="icon-container d-flex align-items-center">
                            <BsClockFill />
                          </div>
                          {moment
                            .utc(comment.createdAt)
                            .local()
                            .format("dddd, MMMM Do YYYY, HH:mm")}
                        </span>
                        <div className="comment-content">{comment.content}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </Col>
            <RightSidebar />
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
