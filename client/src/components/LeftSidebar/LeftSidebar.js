import { Col, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdReplyAll } from "react-icons/md";
import SpacesCard from "./Cards/SpacesCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get("filter");
  const { user } = useSelector((state) => state.auth);

  const handleAllTopicsClick = () => {
    navigate("/");
  };

  const handleMyTopicsClick = () => {
    if (currentFilter === "my-topics") {
      navigate("/");
    } else {
      navigate("/?filter=my-topics");
    }
  };

  return (
    <Col lg={3} className="left-sidebar">
      <Nav className="flex-column side-topics">
        <Nav.Link 
          className={`d-flex align-items-center ${!currentFilter ? "active" : ""}`}
          onClick={handleAllTopicsClick}
        >
          <BsFillQuestionCircleFill />
          all topics
        </Nav.Link>
        <Nav.Link 
          className={`d-flex align-items-center ${currentFilter === "my-topics" ? "active" : ""}`}
          onClick={handleMyTopicsClick}
        >
          <MdQuestionAnswer />
          my topics
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center">
          <MdReplyAll />
          my answers
        </Nav.Link>
      </Nav>
      <SpacesCard />
    </Col>
  );
};

export default LeftSidebar;
