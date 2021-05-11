import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikesDislikes from "./LikesDislikes";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentAction } from "../redux/action/commentActions";
import defaultProfilePic from "../img/defaultProfilePicture.jpg";
import { toastrWarning } from "../functions/toastrs";
import { likeDislikeAction } from "../redux/action/likeDislikeActions";
import svgs from "../img/icons/svgs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Comment = ({ comment }) => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(comment);
  const updateLikeDislike = async (likeOrDislike) => {
    if (user.id === comment.user.id) {
      toastrWarning(`You cannot ${likeOrDislike} your own Comment`);
      return;
    }

    dispatch(
      likeDislikeAction(token, likeOrDislike, "comment", null, comment.id)
    );
  };
  console.log(comment);
  const deleteComment = () => {
    console.log(token);
    if (comment.user.id === user.id) {
      setShowDeleteConfirmModal(false);

      dispatch(deleteCommentAction(token, comment.id, comment));
    } else toastrWarning(`You cannot delete other user's comment`);
    return;
  };
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col col-2">
          <div className="row">
            <img
              className="rounded"
              src={
                comment?.user?.profilePictureUrl?.length > 0
                  ? comment.user.profilePictureUrl
                  : defaultProfilePic
              }
              width="100"
              height="100"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col col-10">
          <div className="row">
            <Link
              to={`/${comment.user.id}/profile`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h6>{comment.user.username}</h6>
            </Link>

            <h6 className="text-muted ml-4">
              {comment.commented_on.split(" ")[0]}
            </h6>
          </div>
          <div
            className="d-flex justify-content-end"
            onClick={() => setShowDeleteConfirmModal(true)}
            onMouseOver={(e) => {
              e.target.style.cursor = "pointer";
            }}
          >
            {svgs.deleteIcon()}
          </div>
          <div className="row">{comment.comment}</div>

          <div className="row mt-2 d-flex justify-content-end">
            <LikesDislikes
              likes={comment.likes}
              dislikes={comment.dislikes}
              size={16}
              postLikeDislike={updateLikeDislike}
              userLikes={comment.userLikesComment}
              userDislikes={comment.userDislikesComment}
            />
          </div>

          <Modal
            show={showDeleteConfirmModal}
            onHide={() => setShowDeleteConfirmModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Delete Video?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete the comment?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={deleteComment}>
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Comment;
