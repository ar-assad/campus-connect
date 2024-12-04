import { Row, Col, Form, Container } from "react-bootstrap";
import TopicItem from "../components/Topic/TopicItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllTopics, setSortOption } from "../redux/slices/topicSlice";
import { resetUserProfile } from "../redux/slices/profileSlice";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import SkeletonTopicItem from "../components/Skeletons/SkeletonTopicItem";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const space = searchParams.get("space");
  const filter = searchParams.get("filter");
  const { topics, getAllTopicsIsLoading } = useSelector((state) => state.topic);
  const { sortOption, searchQuery } = useSelector((state) => state.topic);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = space 
      ? `${space} Topics | Campus Connect`
      : filter === "my-topics"
      ? "My Topics | Campus Connect"
      : `Home | Campus Connect`;
  }, [space, filter]);

  useEffect(() => {
    dispatch(resetUserProfile());
    dispatch(getAllTopics({ sortOption, searchQuery, space }));
  }, [dispatch, sortOption, searchQuery, space]);

  const filteredTopics = useMemo(() => {
    if (filter === "my-topics") {
      return topics.filter(topic => topic.author.username === user?.username);
    }
    return topics;
  }, [topics, filter, user]);

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
                    Topics in {space}
                  </h4>
                )}
                {filter === "my-topics" && (
                  <h4 className="space-title mb-4">
                    My Topics
                  </h4>
                )}
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
              </div>
              <div className="topics">
                {getAllTopicsIsLoading && (
                  <>
                    <SkeletonTopicItem />
                    <SkeletonTopicItem />
                  </>
                )}
                {!getAllTopicsIsLoading &&
                  filteredTopics?.map((topic, idx) => (
                    <TopicItem key={idx} topic={topic} />
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
