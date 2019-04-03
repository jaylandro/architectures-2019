import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import { initAuth } from '../app/services/auth'
import { white } from 'ansi-colors'
import bgVideo from '../images/optim.mp4'

initAuth()

class IndexPage extends React.Component {
  state = { loading: false, msg: null }
  handleClick = e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '3px',
            padding: '1.3em',
          }}
        >
          <div>
            <p>
              Welcome to your new Gatsby + Netlify Functions + Netlify Identity
              site
            </p>
            <hr />
            <p>
              You can still access Netlify functions even on static "marketing
              pages":{' '}
            </p>
            <button onClick={this.handleClick}>
              {loading ? 'Loading...' : 'Call Lambda Function'}
            </button>
            <br />
            <pre>
              {msg
                ? 'Here is the response: ' + msg
                : 'click the button and watch this!'}
            </pre>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
