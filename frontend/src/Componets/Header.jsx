import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg text-white bg-primary">
    <div className="container-fluid">
      <a className="navbar-brand text-white" href="#">Mern Stack Learning</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
          <li className="nav-item">
            <Link className="nav-link active text-white" to={"/"} aria-current="page" href="#">Home</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link active text-white" aria-current="page" href="#">Product</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active text-white" aria-current="page" href="#">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active text-white" aria-current="page" href="#">About</a>
          </li>
          
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Header