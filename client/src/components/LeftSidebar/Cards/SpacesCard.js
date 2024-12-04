import { useEffect, useMemo } from "react";
import { Nav, Image } from "react-bootstrap";
import { MdExplore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSpaces } from "../../../redux/slices/topicSlice";
import SkeletonCard from "../../Skeletons/SkeletonCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const SpacesCard = () => {
  const { spaces, getSpacesLoading } = useSelector((state) => state.topic);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSpace = searchParams.get("space");

  useEffect(() => {
    dispatch(getSpaces());
  }, [dispatch]);

  const handleSpaceClick = (spaceName) => {
    if (currentSpace === spaceName) {
      navigate("/");
    } else {
      navigate(`/?space=${spaceName}`);
    }
  };

  return useMemo(() => {
    return (
      <Nav className="flex-column side-spaces">
        <Nav.Item className="d-flex align-items-center">
          <MdExplore />
          spaces
        </Nav.Item>
        {getSpacesLoading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        {!getSpacesLoading &&
          spaces?.length > 0 &&
          spaces?.map((space, idx) => (
            <Nav.Link
              key={idx}
              className={`d-flex align-items-center ${
                currentSpace === space?.name ? "active" : ""
              }`}
              onClick={() => handleSpaceClick(space?.name)}
            >
              <Image className="space-icon" src={space?.avatar} />
              {space?.name}
            </Nav.Link>
          ))}
      </Nav>
    );
  }, [spaces, getSpacesLoading, currentSpace]);
};

export default SpacesCard;
