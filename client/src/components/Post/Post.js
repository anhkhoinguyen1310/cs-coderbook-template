import React, { useState } from "react";
import {
  Col,
  Form,
  Card,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch } from "react-redux";
import avatar from "../../assets/avatar.png";
import { commentActions, postActions } from "../../redux/actions";

import "./style.css";

const Avatar = (props) => {
  return <img alt="profile" className="rounded-circle" src={avatar} />;
};

/* STEP 4 */
const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(commentActions.create(body, postId));
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            size="sm"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({ body, owner }) => {
  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      <Avatar url="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{owner?.name}</div>
          <p>{body}</p>
        </div>
      </div>
    </ListGroupItem>
  );
};

const PostComments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush">
        {props.comments?.map((c) => (
          <Comment key={c.id} {...c} />
        ))}
      </ListGroup>
    </Card.Body>
  );
};

const POST_ACTIONS = [
  { title: "Like", icon: "thumbs-up" },
  { title: "Comment", icon: "comment" }, 
  { title: "Share", icon: "share" },
];

const PostActionButton = ({ title, icon, postId, post }) => {
  const dispatch = useDispatch()
  const onClick = () => {
    if(title === 'Like')
    console.log('Click Like!!!')
    dispatch(postActions.createReaction(postId))
  }
  return (
    <Button onClick={onClick} className="bg-light bg-white text-dark border-0">
      {" "}
      <FontAwesomeIcon
        size="lg"
        icon={icon}
        color="black"
        className="mr-2 action-icon"
      />
      {title}
    </Button>
  );
};

const PostActions = ({post}) => {
  //make the expression icons
  return (
    <ButtonGroup aria-label="Basic example">
      {POST_ACTIONS.map((a) => {
        return <PostActionButton key={a.title} {...a} postId={post._id} post ={post}/>;
      })}
    </ButtonGroup>
  );
};

const PostReactions = ({post}) => {
  return (
    //{post.comments.length} 20 comments
    <div className="d-flex justify-content-between my-2 mx-3">
      <p className="mb-0">{post.reactions.length}</p>
      <p className="mb-0">
      {(() => {
        if (post.comments.length > 1) {
          return (
            <div>{post.comments.length} comments</div>
          )
        } else {
          return (
            <div> {post.comments.length} comment</div>
          )
        }
      })()}
      </p>
    </div>
  );
};

function PostHeader({ time }) {
  //change the name and avatar
  return (
    <div className="d-flex p-2">
      <Avatar url="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685" />
      <div className="ml-3">
        {" "}
        <h3 className="font-weight-bold">Charles Lee</h3>
        <p className="time-font">{time}</p>
      </div>
    </div>
  );
}

export default function Post({ post }) {
  return (
    <Card className="p-3 mb-3 shadow rounded-md">
      <PostHeader/>
      <p>{post.body}</p>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1529231812519-f0dcfdf0445f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsZW50ZWR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      />
      <PostReactions  post={post}  />
      <hr className="my-1" />
      <PostActions post={post}/>
      <hr className="mt-1" />
      <PostComments comments={post.comments} />
      <CommentForm postId={post._id} />
    </Card>
  );
}