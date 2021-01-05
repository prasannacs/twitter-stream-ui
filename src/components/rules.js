import React, { Component } from "react";
import "./rules.css";

const axios = require("axios").default;
const ruleURL = "http://localhost:4000/stream/rules";

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [],
      dataLoaded: false,
      ruleValue: "",
    };
    this.handleAddRule = this.handleAddRule.bind(this);
    this.handleRuleChange = this.handleRuleChange.bind(this);
    this.handleRemoveRule = this.handleRemoveRule.bind(this);
  }

  handleRemoveRule(ruleId) {
    console.log('Remove rule ',ruleId);
    let ruleBody = { delete: { ids : [] } };
    ruleBody.delete.ids.push(ruleId);
    console.log("Rule Value ", JSON.stringify(ruleBody));

    this.delTwitterRule(ruleId,ruleBody);
  }

  handleStreaming()  {
    let config = {
      method: "get",
      url: "http://localhost:4000/stream",
    };

    axios(config)
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
      alert('Now Streaming tweets ..');
  }

  handleAddRule(event) {
    let ruleBody = { add: [] };
    let tag;
    if( this.state.rules.length > 0 )
      {tag = this.state.rules[0].tag;}
      else{ tag = this.state.ruleValue;}

    ruleBody.add.push({
      value: this.state.ruleValue,
      //tag: this.state.ruleValue,
      tag: tag
    });
    console.log("Rule Value ", JSON.stringify(ruleBody));

    this.addTwitterRule(ruleBody);
    event.preventDefault();
  }

  addTwitterRule = (ruleBody) => {
    let options = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(ruleURL, ruleBody, options)
      .then((res) => {
        console.log("Rules res ", res.data[0].id);
        let rulesArr = this.state.rules;
        rulesArr.push(res.data[0]);
        this.setState({ rules: rulesArr });
        console.log("Rules array ", this.state.rules);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  delTwitterRule = (ruleId,ruleBody) => {
    let options = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(ruleURL, ruleBody, options)
      .then((res) => {
        console.log("Rules res ", res.data);
        let rulesArr = this.state.rules;
        let removedArr = rulesArr.filter(function(value,index,arr)  {
          return value.id !== ruleId;
        })
        this.setState({ rules: removedArr });
        console.log("Rules array ", this.state.rules);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRuleChange(event) {
    this.setState({ ruleValue: event.target.value });
  }

  componentDidMount() {
    let config = {
      method: "get",
      url: "http://localhost:4000/stream/rules",
    };

    axios(config)
      .then((res) => res.data)
      .then((data) => {
        this.setState({
          rules: data,
          dataLoaded: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { dataLoaded } = this.state;
    return (
      <div>
        <div id="myDIV" class="header">
          <h2>Twitter Streaming Rules</h2>
          <input
            type="text"
            value={this.state.ruleValue}
            onChange={this.handleRuleChange}
            placeholder="add your new rule here .."
          />
          <span onClick={this.handleAddRule} class="addBtn">
            Add
          </span>
        </div>

        <ul id="myUL">
          {dataLoaded &&
            this.state.rules.map((rule) => (
              <div>
                <li key={rule.id}>
                    <h4>{rule.value}</h4>
                    <span onClick={() => this.handleRemoveRule(rule.id)}>Remove <i class="fa fa-remove"></i></span>
                </li>
              </div>
            ))}
        </ul>
        <div>
        <span onClick={this.handleStreaming} class="addBtn">
            Start Streaming
          </span>
        </div>
      </div>
    );
  }
}

export default Rules;
