import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, logout } from "../auth";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

function MyAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = getAuth().token;

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/get-user", {
        headers: { Authorization: token },
      });
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/auth/delete-account", {
        headers: { Authorization: token },
      });
      alert("User deleted");
      logout();
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const confirmDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      handleDelete();
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">My Account</Card.Title>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Card.Text>
                <strong>Name:</strong> {name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {email}
              </Card.Text>

              <div className="d-flex flex-column gap-2 mt-4">
                <Button
                  variant="primary"
                  onClick={() => navigate("/home")}
                  className="w-100"
                >
                  Go to Home
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-100"
                >
                  Log Out
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmDelete}
                  className="w-100"
                >
                  Delete My Account
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MyAccount;
