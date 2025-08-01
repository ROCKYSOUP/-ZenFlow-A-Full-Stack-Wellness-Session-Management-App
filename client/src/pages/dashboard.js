import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../auth";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

function DashBoard() {
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTag] = useState([]);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [linkIndex, setLinkIndex] = useState();
  const [sessions, setSessions] = useState([]);
  const [Publishedsessions, setPubSessions] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [editId, seteditId] = useState();
  const navigate = useNavigate();

  const token = getAuth().token;
  if (!token) navigate("/");

  useEffect(() => {
    fetchMySession();
    fetchMyDraftSession();
  }, []);

  useEffect(() => {
    if(!editMode)return
    if(!title || !url)return;
    const timer=setTimeout(()=>{
      editSession("Draft")
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

  const handleEdit = (session) => {
    seteditMode(true);
    seteditId(session._id);
    setTitle(session.title);
    setTag(session.tags);
    setUrl(session.json_file_url);
  };

  const editSession = async (statusValue) => {
    try {
      await axios.put(
        `https://zenflow-backen.onrender.com/api/session/update-session/${editId}`,
        { title, tags, json_file_url: url, status: statusValue },
        { headers: { Authorization: token } }
      );
      resetForm();
      await fetchMyDraftSession();
      await fetchMySession();
    } catch (err) {
      console.error("Update failed:", err);
      fetchMyDraftSession();
      fetchMySession();
    }
  };

  const resetForm = () => {
    setTitle("");
    setStatus("");
    setTag([]);
    setUrl("");
    seteditMode(false);
    setLinkIndex(null);
  };

  const handleDelete = async (session) => {
    try {
      await axios.delete(
        `https://zenflow-backen.onrender.com/api/session/delete-session/${session._id}`,
        { headers: { Authorization: token } }
      );
      await fetchMyDraftSession();
      await fetchMySession();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const fetchMyDraftSession = async () => {
    try {
      const session = await axios.get(
        "hhttps://zenflow-backen.onrender.com/api/draft/my-draft-session",
        { headers: { Authorization: token } }
      );
      setSessions(session.data);
    } catch (err) {
      console.error("Fetching draft sessions failed:", err);
    }
  };

  const fetchMySession = async () => {
    try {
      const session = await axios.get(
        "https://zenflow-backen.onrender.com/api/publish/my-published-session",
        { headers: { Authorization: token } }
      );
      setPubSessions(session.data);
    } catch (err) {
      console.error("Fetching published sessions failed:", err);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Dashboard</h2>

      <h4>My Published Sessions</h4>
      {Publishedsessions.length === 0 ? (
        <p className="text-muted">No published sessions found.</p>
      ) : (
        <Row className="mb-4">
          {Publishedsessions.map((session, index) => (
            <Col key={index} md={6} lg={4} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{session.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Tags:</Card.Subtitle>
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
                <Card.Footer className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setLinkIndex(linkIndex === index ? null : index)
                    }
                  >
                    {linkIndex === index ? "Hide Link" : "View Link"}
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(session)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <h4>My Draft Sessions</h4>
      {sessions.length === 0 ? (
        <p className="text-muted">No draft sessions available.</p>
      ) : (
        <Row>
          {sessions.map((session, index) => (
            <Col key={index} md={6} lg={4} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{session.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Tags:</Card.Subtitle>
                  {session.tags.map((tag, i) => (
                    <Badge key={i} bg="info" className="me-1">
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
                <Card.Footer className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setLinkIndex(linkIndex === index ? null : index)
                    }
                  >
                    {linkIndex === index ? "Hide Link" : "View Link"}
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleEdit(session)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(session)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {editMode && (
        <Card className="p-4 mt-4 shadow-sm">
          <h4 className="mb-3">Edit Session</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
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
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button onClick={() => editSession("Published")} variant="success">
                Publish
              </Button>
              <Button onClick={() => editSession("Draft")} variant="secondary">
                Save as Draft
              </Button>
            </div>
          </Form>
        </Card>
      )}

      <div className="text-center mt-4">
        <Button onClick={() => navigate("/home")}>Go back to Home</Button>
      </div>
    </Container>
  );
}

export default DashBoard;
