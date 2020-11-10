import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import DynamicContacts from "./components/DynamicContacts";
import contacts from './contacts.json';

// I copy 5 first contact from contact.json

// while(inList){
//   random = contacts[Math.floor(Math.random() * contacts.length)];
//   inList = false;
//   this.state.contactsList.forEach(e => {
//     if(e.name === random.name) {
//       inList = true;
//     }
//   });
  
// }

function compareByName (a, b) {
  const contactNameA = a.name.toUpperCase();
  const contactNameB = b.name.toUpperCase();

  let comparison = 0;
  if (contactNameA > contactNameB) {
    comparison = 1;
  } else if (contactNameA < contactNameB) {
    comparison = -1;
  }
  return comparison;
}

function compareByPopularity (a, b) {
  const contactPopularityA = a.popularity;
  const contactPopularityB = b.popularity;

  let comparison = 0;
  if (contactPopularityA > contactPopularityB) {
    comparison = 1;
  } else if (contactPopularityA < contactPopularityB) {
    comparison = -1;
  }
  return comparison;
}

class App extends Component {
  state = {
    contacts: contacts.slice(0, 5)
  };
  
  addContact = () => {
    const posActor = Math.floor(Math.random() * contacts.length);
    const newActor = contacts[posActor];
    let inList = false;
    this.state.contacts.forEach(eachOne => {
      if (eachOne.name === newActor.name) {
        inList = true;
      }
    });
    if (!inList) {
      this.setState({
        contacts: [newActor, ...this.state.contacts]
      });
    };
  };

  sortByName = () => {
    const newArrSortedByName = this.state.contacts.sort();
    this.setState({contacts: newArrSortedByName.sort(compareByName)});
  };

  sortByPopularity = () => {
    const newArrSortedByPopularity = this.state.contacts.sort();
    this.setState({contacts: newArrSortedByPopularity.sort(compareByPopularity)});
  }

  deleteContact = (contactId) => {
    const filtered = this.state.contacts.filter(contact => contact.id !== contactId)
    this.setState({contacts: filtered});
  };
  
  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={() => this.addContact()}>Add Random Contact
        </button>
        <button onClick={() => this.sortByName()}>Sort by name
        </button>
        <button onClick={() => this.sortByPopularity()}>Sort by popularity
        </button>
        <div className="contact-titles">
          <p>Picture</p>
          <p>Name</p>
          <p>Popularity</p>    
          <p>Action</p>      
        </div>
        {this.state.contacts.map(oneContact => {
          return (
            <div key={oneContact.id} className="contact-content">
              <img className="contact-img" src={oneContact.pictureUrl} alt="picture image"/>
              <p>{oneContact.name}</p>
              <p>{oneContact.popularity}</p>
              <button onClick={() => this.deleteContact(oneContact.id)}>Delete
              </button>
            </div>
          )
          })
        }
      </div>
    )
  }
};

export default App;
