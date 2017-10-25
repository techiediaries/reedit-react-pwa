import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader,CardTitle,CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }
  fetchFirst(url) {
    var that = this;
    if (url) {
      fetch('https://www.reddit.com/r/' + url + '.json').then(function (response) {
        return response.json();
      }).then(function (result) {

        //console.log(result.data.children);
        /* for (var i = 0; i < result.data.children.length; i++) {
           that.state.posts.push(result.data.children[i]);
         }*/
        that.setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });

        console.log(that.state.posts);
      });
    }
  }  
  fetchNext(url, lastPostName) {
    var that = this;
    if (url) {
      fetch('https://www.reddit.com/r/' + url + '.json' + '?count=' + 25 + '&after=' + lastPostName).then(function (response) {
        return response.json();
      }).then(function (result) {

        //console.log(result.data.children);
        /* for (var i = 0; i < result.data.children.length; i++) {
           that.state.posts.push(result.data.children[i]);
         }*/
        that.setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });
        console.log(that.state.posts);
      });
    }
  }
  componentWillMount() {
   
     this.fetchFirst("reactjs");
   
}
  render() {
    return (

      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span >Reedit PWA</span>}

            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton onClick={() => this.fetchNext('reactjs', this.state.lastPostName)} label="next" />
            }
          />

          {this.state.posts.map(function (el, index) {
            return <Card key={index}>
              <CardHeader
                title={el.data.title}

                subtitle={el.data.author}
                actAsExpander={el.data.is_self === true}
                showExpandableButton={false}
              />

              <CardText expandable={el.data.is_self === true}>
                {el.data.selftext}
              </CardText>
              <CardActions>
                <FlatButton label="View" onClick={() => {
                  window.open(el.data.url);
                }} />

              </CardActions>
            </Card>
          })}


          <FlatButton onClick={() => this.fetchNext('reactjs', this.state.lastPostName)} label="next" />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
