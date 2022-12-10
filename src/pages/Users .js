import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

// fetch("https://reqres.in/api/users/")
// 205

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      users: null,
      error: null,
      total_pages: 0,
      page: 1,
    };
  }

  fetchUsers = (id) => {
    fetch("https://reqres.in/api/users?page=" + id)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          isLoaded: true,
          users: response.data,
          total_pages: response.total_pages,
        })
      )
      .then((error) => {
        this.setState({
          isLoaded: true,
          error: error,
        });
      });
  };

  componentDidMount() {
    this.fetchUsers(this.state.page);
  }

  updatePage = (id) => {
    this.setState({ page: id }, this.fetchUsers(id));
  };

  renderPagination = () => {
    let pagination = [];

    for (let i = 1; i <= this.state.total_pages; i++) {
      pagination.push(
        <li
          className={i === this.state.page ? "active page-item" : "page-item"}
          onClick={() => this.updatePage(i)}
          value={i}
        >
          <a className="page-link">{i}</a>
        </li>
      );
    }

    return pagination;
  };

  renderList = () => {
    return this.state.users.map((user) => (
      <Col md={4} key={user.id}>
        <div className="card mt-2">
          <img
            className="card-img-top"
            src={user.avatar}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{user.first_name}</h5>
            <p className="card-text">{user.email}</p>
          </div>
        </div>
      </Col>
    ));
  };

  render() {
    // const users = this.state.users;
    if (this.state.error) {
      return <div>Błąd: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Wszystuje dane...</div>;
    } else {
      return (
        <Container>
          <Row>
            {this.renderList()}
            <nav aria-label="Page navigation example">
              <ul className="pagination">{this.renderPagination()}</ul>
            </nav>
          </Row>
        </Container>
      );
    }
  }
}

export default Users;
