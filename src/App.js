import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

class App extends Component {
  state = {travelList: []}

  componentDidMount() {
    this.getTravelGuideApi()
  }

  getTravelGuideApi = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    const JsonData = await response.json()
    const {packages} = JsonData
    this.setState({travelList: packages})
  }

  loader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  travelContainer = travelList => (
    <ul className="unordered-list">
      {travelList.map(each => (
        <li key={each.id} className="list">
          <img src={each.image_url} alt={each.name} className="img" />
          <h1 className="list-head">{each.name}</h1>
          <p className="para">{each.description}</p>
        </li>
      ))}
    </ul>
  )

  render() {
    const {travelList} = this.state
    return (
      <div className="Travel-container">
        <h1 className="heading">Travel Guide</h1>
        {travelList.length === 0
          ? this.loader()
          : this.travelContainer(travelList)}
      </div>
    )
  }
}

export default App
