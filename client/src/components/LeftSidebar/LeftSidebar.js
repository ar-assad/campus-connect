import { Col, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdReplyAll } from "react-icons/md";
import SpacesCard from "./Cards/SpacesCard";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const navigate = useNavigate();

  const handleAllTopicsClick = () => {
    navigate("/");
  };

  return (
    <Col lg={3} className="left-sidebar">
      <Nav className="flex-column side-topics">
        <Nav.Link 
          className="d-flex align-items-center"
          onClick={handleAllTopicsClick}
        >
          <BsFillQuestionCircleFill />
          all topics
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center">
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
