import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Import Link if you're using React Router

const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        Educators <i className="material-icons">arrow_drop_down</i>
      </div>
      {dropdownOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/educator-portal">Educator Portal</Link>
          </li>
          <li>
            <Link to="/educator-summit">Educator Summit</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Dropdown
