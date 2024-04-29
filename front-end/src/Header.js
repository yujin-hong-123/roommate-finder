import './Header.css'
import { Link } from 'react-router-dom'
import logo from './Logo.png'
import matchesicon from './MatchesIcon.png'
import chatsicon from './ChatsIcon.png'
import profileicon from './ProfileIcon.png'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => {
  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <ul className="nav-links">
          <li className ='nav-item'>
            <img className='icons_logo'src={logo}/>
          </li>
          <li className="nav-item">
            <Link to="/matches"><img className='icons'src={matchesicon}/></Link>
          </li>
          <li className="nav-item">
            <Link to="/chatlist"><img className='icons'src={chatsicon}/></Link>
          </li>
          <li className="nav-item">
            <Link to="/profile"><img className='icons'src={profileicon}/></Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

// make this component available to be imported into any other file
export default Header