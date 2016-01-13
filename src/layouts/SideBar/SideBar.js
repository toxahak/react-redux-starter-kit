import React from 'react'
import styles from './SideBar.scss'
import { Link } from 'react-router'

export default class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      windowHeight: window.innerHeight
    }
  }

  handleResize () {
    this.setState({windowHeight: window.innerHeight})
  }

  componentDidMount () {
    window.addEventListener('resize', () => this.handleResize())
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => this.handleResize())
  }

  render () {
    return (
      <div className={styles['sidebar']} style={{height: this.state.windowHeight}}>
        <div className='ui vertical inverted sticky menu fixed top'>
          <div className='item ui text-center'>
            <Link to='/' className={styles['logo'] + ' ui logo image'}>
              <img src='/logo.png' />
            </Link>
          </div>
          <a href='/' className='item'>
            Conversations
          </a>
          <a href='/' className='item'>
            Archive
          </a>
          <a href='/' className='item'>
            Settings
          </a>
          <a href='/' className='item'>
            Invite Testers
          </a>
        </div>
      </div>
    )
  }
}
