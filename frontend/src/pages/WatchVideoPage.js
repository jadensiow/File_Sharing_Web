import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideoById } from "../redux/action/videoActions";
import { postCommentAction } from "../redux/action/commentActions";

import Comment from "../components/Comment";
import Video from "../components/Video";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "../css/watchvideopage.css";
import { motion } from "framer-motion";
import { watchVideoRouteTransition } from "../functions/routeAnimation";

const WatchVideoPage = ({ match }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const { loading, video, comments } = useSelector((state) => state.watchVideo);
  //console.log(video);

  // video.viewers.includes(user.id) ? null : dispatch(addViews(token, video));
  useEffect(() => {
    document.title = "Watch";
  }, []);
  useEffect(() => {
    let userId = user ? user.id : null;

    dispatch(fetchVideoById(match.params.videoId, userId));
  }, []);

  const [commentText, setCommentText] = useState("");

  const postComment = () => {
    dispatch(postCommentAction(token, video.id, commentText));
  };

  return (
    <Container>
      <motion.div
        variants={watchVideoRouteTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="outer-div"
      >
        {!loading && video && comments && (
          <div>
            <Row>
              <Video video={video} />
            </Row>

            <hr style={{ borderTop: "3px solid darkgray" }} />

            <Row className="my-5">
              <h3>Comments</h3>
            </Row>
            <hr style={{ borderTop: "1px solid darkgray" }} />
            <h5>Add a Comment</h5>
            <Row>
              <Form.Control
                as="textarea"
                rows={1}
                id="comment-area"
                disabled={!isAuthenticated}
                placeholder={
                  isAuthenticated
                    ? "Type a comment"
                    : "You need to be logged in to post a comment"
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Row>

            <Row>
              <Col xs={10}></Col>

              <Col xs={2}>
                <Button
                  className="mt-2"
                  style={{ width: "100%" }}
                  disabled={!isAuthenticated}
                  onClick={postComment}
                >
                  Post
                </Button>
              </Col>
            </Row>

            <hr style={{ borderTop: "1px solid darkgray" }} />

            <div className="list-group list-group-flush">
              {comments?.map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </Container>
  );
};

export default WatchVideoPage;
