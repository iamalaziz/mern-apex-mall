import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline="true" className="d-flex">
      <Form.Control
        type="text"
        name=""
        className="rounded shadow-none"
        placeholder="Search Products..."
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
