import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikesDislikes from "./LikesDislikes";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCommentAction,
  editCommentAction,
} from "../redux/action/commentActions";
import defaultProfilePic from "../img/defaultProfilePicture.jpg";
import { toastrWarning } from "../functions/toastrs";
import { likeDislikeAction } from "../redux/action/likeDislikeActions";
import svgs from "../img/icons/svgs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toastrError, toastrSuccess } from "../functions/toastrs";
import apiurl from "../apiurl";

const Comment = ({ comment }) => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [commentEdit, setCommentEdit] = useState(comment.comment);

  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(comment);
  const updateLikeDislike = async (likeOrDislike) => {
    if (user.id === comment.user.id) {
      toastrWarning(`You cannot ${likeOrDislike} your own Comment`);
      return;
    }

    dispatch(
      likeDislikeAction(token, likeOrDislike, "comment", null, comment.id)
    );
  };
  // console.log("test", commentEdit);

  const deleteComment = () => {
    if (comment.user.id === user.id) {
      setShowDeleteConfirmModal(false);

      dispatch(deleteCommentAction(token, comment.id, comment));
    } else toastrWarning(`You cannot delete other user's comment`);
    return;
  };
  const sendEditCommentRequest = async () => {
    if (comment.user.id === user.id) {
      setShowEditDetailsModal(false);
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      console.log(commentEdit);
      try {
        const { data } = await apiurl.put(
          `/api/videos/comments/${comment.id}/edit`,
          { newComment: commentEdit },
          config
        );
        console.log(data);
        if (data.success) {
          toastrSuccess(data.message);

          dispatch(editCommentAction(data.comment));
        } else {
          toastrError("Error", data.message);
        }
      } catch (err) {
        // so there's something happening in the able code
        // possibly the dispatch
        // the backend is working, so you probably will need to fix
        // the dispatch ok
        console.log("err = ", err);
      }
      setShowEditDetailsModal(false);
    } else toastrWarning(`You cannot edit other user's comment`);
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
              to={`/${comment.user.id}/channel`}
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
          <span className="mr-3" onClick={() => setShowEditDetailsModal(true)}>
            {svgs.editIcon("black")}
          </span>
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
        <Modal
          show={showEditDetailsModal}
          onHide={() => setShowEditDetailsModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Comment"
                value={commentEdit}
                onChange={(e) => setCommentEdit(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={sendEditCommentRequest}>
              Submit Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowEditDetailsModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Comment;
