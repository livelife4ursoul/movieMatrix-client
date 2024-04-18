import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const SearchBar = ({ handleSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
 
  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Form className='d-flex' onSubmit={(e) => e.preventDefault()} >
      <Form.Control 
        type="search"
        placeholder="Search"
        className="me-2"
        value={searchKeyword}
        onChange={handleChange}
        aria-label="Search" 
      />               
      <Button type='submit' variant="outline-success">Search</Button>
    </Form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
