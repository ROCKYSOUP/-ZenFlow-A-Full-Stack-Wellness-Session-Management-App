import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../auth";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  ListGroup,
} from "react-bootstrap";

function Home() {
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTag] = useState([]);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [linkIndex, setLinkIndex] = useState();
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const [newSession, setNewSession] = useState(false);

  const token = getAuth().token;
  useEffect(() => {
    if (!token) navigate("/");
    fetchSession();
  }, []);


  useEffect(() => {
    if(!title || !url)return;
    const timer=setTimeout(()=>{
      addSession("Draft")
    },5000)
    return ()=>clearTimeout(timer)
  }, [title,tags,url]);


  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTag([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTag(tags.filter((tag) => tag !== tagToRemove));
  };

  const addSession = async (statusValue) => {
    try {
      await axios.post(
        "https://zenflow-backen.onrender.com/api/session/add-new-session",
        { title, tags, json_file_url: url, status: statusValue },
        { headers: { Authorization: token } }
      );
      setTitle("");
      setStatus("");
      setTag([]);
      setUrl("");
      setNewSession(false);
      fetchSession();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const fetchSession = async () => {
    try {
      const session = await axios.get(
        "https://zenflow-backen.onrender.com/api/publish/all-session",
        { headers: { Authorization: token } }
      );
      setSessions(session.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Available Sessions</h2>

      <Row className="mb-4">
        {sessions.length === 0 ? (
          <p className="text-muted text-center">No sessions available.</p>
        ) : (
          sessions.map((session, index) => (
            <Col key={index} md={6} lg={4} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{session.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Tags:
                  </Card.Subtitle>
                  {session.tags.map((tag, i) => (
                    <Badge key={i} bg="secondary" className="me-1">
                      {tag}
                    </Badge>
                  ))}
                  {linkIndex === index && (
                    <div className="mt-2">
                      <a
                        href={session.json_file_url || session.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {session.json_file_url || session.url}
                      </a>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setLinkIndex(linkIndex === index ? null : index)
                    }
                  >
                    {linkIndex === index ? "Hide Link" : "View Link"}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {!newSession ? (
        <div className="text-center mb-4">
          <Button onClick={() => setNewSession(true)}>Add a new Session</Button>
        </div>
      ) : (
        <Card className="p-4 shadow-sm mb-4">
          <h4 className="mb-3">Create New Session</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={addTag}>
                Add Tag
              </Button>
            </InputGroup>

            <ListGroup horizontal className="mb-3">
              {tags.map((tag, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  {tag}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeTag(tag)}
                  >
                    ✖
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Form.Group className="mb-3">
              <Form.Label>Session URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Paste your link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="success"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to publish this session?"
                    )
                  ) {
                    addSession("Published");
                  }
                }}
              >
                Publish
              </Button>
              <Button variant="secondary" onClick={() => addSession("Draft")}>
                Save as Draft
              </Button>
            </div>
          </Form>
        </Card>
      )}

      <div className="d-flex gap-2 justify-content-center">
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        <Button onClick={() => navigate("/my-account")}>My Account</Button>
      </div>
    </Container>
  );
}

export default Home;
